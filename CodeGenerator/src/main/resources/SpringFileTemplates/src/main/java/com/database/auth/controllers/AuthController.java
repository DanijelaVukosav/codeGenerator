package com.#{ALL_SCHEMA_NAME}#.api.auth.controllers;

import com.#{ALL_SCHEMA_NAME}#.api.auth.exception.TokenRefreshException;
import com.#{ALL_SCHEMA_NAME}#.api.auth.models.RefreshToken;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.request.LoginRequest;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.request.TokenRefreshRequest;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.response.JwtResponse;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.response.MessageResponse;
import com.#{ALL_SCHEMA_NAME}#.api.auth.payload.response.TokenRefreshResponse;
import com.#{ALL_SCHEMA_NAME}#.api.auth.repository.PermissionRepository;
import com.#{ALL_SCHEMA_NAME}#.api.auth.repository.UserRepository;
import com.#{ALL_SCHEMA_NAME}#.api.security.jwt.JwtUtils;
import com.#{ALL_SCHEMA_NAME}#.api.security.services.RefreshTokenService;
import com.#{ALL_SCHEMA_NAME}#.api.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        try {
            System.out.println(encoder.encode(loginRequest.getPassword()));
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            String jwt = jwtUtils.generateJwtToken(userDetails);

            List<String> authorities = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), userDetails.getSuperUser(), authorities, userDetails.isActivate()));
        } catch (Exception ex) {
            return new ResponseEntity<>(new MessageResponse("Incorrect username or password!"), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken).map(refreshTokenService::verifyExpiration).map(RefreshToken::getUser).map(user -> {
            String token = jwtUtils.generateTokenFromUsername(user.getUsername());
            RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getId());
            return ResponseEntity.ok(new TokenRefreshResponse(token, newRefreshToken.getToken()));
        }).orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }

}
