package com.appintern.demo.service;

import com.appintern.demo.domain.User;
import com.appintern.demo.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    public User register(String username, String rawPassword) {
        if (userRepo.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already taken");
        }
        User u = User.builder()
                .username(username)
                .password(encoder.encode(rawPassword))
                .role("ROLE_USER")
                .build();
        return userRepo.save(u);
    }
}
