package com.#{ALL_SCHEMA_NAME}#.api.auth.controllers;

import com.#{ALL_SCHEMA_NAME}#.api.auth.exception.TokenRefreshException;
import com.#{ALL_SCHEMA_NAME}#.api.auth.models.RefreshToken;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.request.LoginRequest;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.response.JwtResponse;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.response.MessageResponse;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.response.TokenRefreshResponse;
import com.#{ALL_SCHEMA_NAME}#.api.security.jwt.JwtUtils;
import com.#{ALL_SCHEMA_NAME}#.api.security.services.RefreshTokenService;
import com.#{ALL_SCHEMA_NAME}#.api.security.services.UserDetailsImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    public AuthController(
            AuthenticationManager authenticationManager,
            PasswordEncoder encoder,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService
    ) {
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            String jwt = jwtUtils.generateJwtToken(userDetails);

            List<String> authorities = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

            Cookie cookie = new Cookie("refreshToken", refreshToken.getToken());
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/api/auth");
            cookie.setMaxAge(24 * 60 * 60);
            response.addCookie(cookie);

            return ResponseEntity.ok(new JwtResponse(jwt, null, userDetails.getId(), userDetails.getUsername(),
                    userDetails.getEmail(), userDetails.getSuperUser(), authorities, userDetails.isActivate()));
        } catch (Exception ex) {
            return new ResponseEntity<>(new MessageResponse("Incorrect username or password!"), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@CookieValue(name = "refreshToken", required = false) String refreshTokenValue) {
        if (refreshTokenValue == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token missing");
        }

        return refreshTokenService.findByToken(refreshTokenValue)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String newJwt = jwtUtils.generateTokenFromUsername(user.getUsername());
                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getId());

                    Cookie cookie = new Cookie("refreshToken", newRefreshToken.getToken());
                    cookie.setHttpOnly(true);
                    cookie.setSecure(true);
                    cookie.setPath("/api/auth");
                    cookie.setMaxAge(24 * 60 * 60);
                    return ResponseEntity.ok()
                            .header("Set-Cookie", cookie.toString())
                            .body(new TokenRefreshResponse(newJwt, null));
                })
                .orElseThrow(() -> new TokenRefreshException(refreshTokenValue, "Refresh token is not in database!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/auth");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }
}
