package com.#{ALL_SCHEMA_NAME}#.api.auth.service;

import com.#{ALL_SCHEMA_NAME}#.api.auth.models.User;
import com.#{ALL_SCHEMA_NAME}#.api.auth.models.UserSpecification;
import com.#{ALL_SCHEMA_NAME}#.api.auth.repository.UserRepository;
import com.#{ALL_SCHEMA_NAME}#.api.security.services.UserDetailsImpl;
import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }

    public User findByUsername(String username) {
        Optional<User> User = userRepository.findByUsername(username);
        return User.orElse(null);
    }

    public User findById(Long id) {
        Optional<User> User = userRepository.findById(id);
        return User.orElse(null);
    }

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Boolean existsById(Long id) {
        return userRepository.existsById(id);
    }


    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public User update(String username, User updatedUser) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            return userRepository.save(updatedUser);
        }
        return null;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public boolean deleteByUsername(String username) {
        Optional<User> User = userRepository.findByUsername(username);
        if (User.isPresent()) {
            userRepository.deleteByUsername(username);
            return true;
        }
        return false;
    }

    public boolean deleteById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Page<User> getUsersByFilters(
            ArrayList<FilterCriteria> criteria, Pageable pageable) {

        UserSpecification specification = UserSpecification.of(criteria);


        return userRepository.findAll(specification, pageable);
    }

}
