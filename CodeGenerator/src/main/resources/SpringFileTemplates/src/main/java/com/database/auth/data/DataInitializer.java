package com.shop.api.auth.data;

import com.shop.api.auth.models.User;
import com.shop.api.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String defaultEmail = "admin@admin.com";
        String defaultUsername = "admin";
        String defaultPassword = "admin";

        if (userRepository.findByUsername(defaultUsername).isEmpty()) {
            User user = new User();
            user.setUsername(defaultUsername);
            user.setPassword(passwordEncoder.encode(defaultPassword));
            user.setEmail(defaultEmail);
            user.setSuperUser(true);
            user.setActive(false);

            userRepository.save(user);
            System.out.println("Default user created: " + defaultUsername);
        } else {
            System.out.println("User already exists.");
        }
    }
}
