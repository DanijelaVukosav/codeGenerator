package com.schema.api.auth.controllers;

import com.schema.api.auth.models.Permission;
import com.schema.api.auth.models.PermissionEnum;
import com.schema.api.auth.models.User;
import com.schema.api.auth.payload.request.ActivateUserRequest;
import com.schema.api.auth.payload.request.EditUserRequest;
import com.schema.api.auth.payload.request.SignupRequest;
import com.schema.api.auth.payload.response.MessageResponse;
import com.schema.api.auth.service.PermissionService;
import com.schema.api.auth.service.UserService;
import com.schema.api.security.services.UserDetailsImpl;
import com.schema.api.utils.FilterAndSortUtils;
import com.schema.api.utils.FilterData;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/systemUser")
public class UserController {
    PasswordEncoder encoder;

    private final UserService userService;
    private final PermissionService permissionService;

    @Autowired
    public UserController(PasswordEncoder encoder, UserService userService, PermissionService permissionService) {
        this.encoder = encoder;
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetailsImpl> getUserDetails() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(userDetails);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userDetails.getSuperUser()) {
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).build();
        }
        List<User> users = userService.getAll();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping("/filter")
    public Page<User> getAllUsersByFilter(@RequestBody(required = false) FilterData filterData) {
        Pageable pageable = PageRequest.of(filterData.getPage(), filterData.getSize(), Sort.by(FilterAndSortUtils.ParseSortColumns(filterData.getSort())));

        return userService.getUsersByFilters(filterData.getFilter(), pageable);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean isUserDeleted = userService.deleteById(id);
        if (isUserDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id, @Valid @RequestBody EditUserRequest editRequest) {
        if (!userService.existsById(id)) {
            return ResponseEntity.badRequest().body(new MessageResponse("There is no user with id" + id + "!"));
        }

        User previousUser = userService.findById(id);

        Set<String> strPermissions = new HashSet<String>(List.of(editRequest.getPermissions()));
        Set<Permission> userPermissions = new HashSet<>();

        try {

            if (!strPermissions.isEmpty()) {
                strPermissions.forEach(permission -> {

                    Permission userPermission = permissionService.findPermissionByName(permission).orElseGet(() -> {
                        Permission newPermission = new Permission();
                        newPermission.setName(PermissionEnum.valueOf(permission));

                        return permissionService.create(newPermission);
                    });
                    userPermissions.add(userPermission);
                });
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Send valid permissions!");
        }

        previousUser.setPermissions(userPermissions);
        previousUser.setSuperUser(editRequest.isSuperUser());
        userService.create(previousUser);

        return ResponseEntity.ok(previousUser);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
        }

        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()), signUpRequest.isSuperUser());

        Set<String> strPermissions = new HashSet<String>(List.of(signUpRequest.getPermissions()));
        Set<Permission> userPermissions = new HashSet<>();

        if (!strPermissions.isEmpty()) {
            strPermissions.forEach(permission -> {
                try {

                    Permission userPermission = permissionService.findPermissionByName(permission).orElseGet(() -> {
                        Permission newPermission = new Permission();
                        newPermission.setName(PermissionEnum.valueOf(permission));

                        return permissionService.create(newPermission);
                    });
                    userPermissions.add(userPermission);
                } catch (IllegalArgumentException e) {
                    new RuntimeException("Error: Permission is not found.");
                }
            });
        }

        user.setPermissions(userPermissions);
        userService.create(user);

        return ResponseEntity.ok(user);

    }

    @PostMapping("/activate")
    public ResponseEntity<?> activateUserAccount(@Valid @RequestBody ActivateUserRequest activateUserRequest) {
        if (!userService.existsById(activateUserRequest.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("There is no user with id" + activateUserRequest.getId() + "!"));
        }

        User previousUser = userService.findById(activateUserRequest.getId());
        previousUser.setPassword(encoder.encode(activateUserRequest.getNewPassword()));
        previousUser.setActive(true);
        User updatedUser = userService.create(previousUser);

        return ResponseEntity.ok(updatedUser);

    }


    @GetMapping("/allPermissions")
    public ResponseEntity<?> getEnabledPermissions() {
        return ResponseEntity.ok().body(permissionService.getEnabledPermissions());
    }


}
