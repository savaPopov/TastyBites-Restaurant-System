package com.purlenki.server.service;

import com.purlenki.server.dto.AuthResponse;
import com.purlenki.server.dto.LoginRequest;
import com.purlenki.server.dto.RegisterRequest;
import com.purlenki.server.model.User;
import com.purlenki.server.repository.UserRepository;
import com.purlenki.server.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public AuthResponse register(RegisterRequest request) {

        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email cannot be empty");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }


        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }


        User.Role role = userRepository.existsByRole(User.Role.ADMIN) 
            ? User.Role.USER 
            : User.Role.ADMIN;


        User user = new User(
            request.getUsername(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            role
        );


        User savedUser = userRepository.save(user);

        String token = jwtUtils.generateJwtToken(user.getEmail(), user.getRole().name());
        // String token = jwtUtils.generateJwtToken(savedUser.getUsername(), savedUser.getRole().name());


        return new AuthResponse(
            token,
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getRole().name()
        );
    }

 
    public AuthResponse login(LoginRequest request) {
      
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOptional.get();

  
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }


        String token = jwtUtils.generateJwtToken(user.getEmail(), user.getRole().name());


        return new AuthResponse(
            token,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole().name()
        );
    }


    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}