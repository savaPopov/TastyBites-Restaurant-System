package com.purlenki.server.service;

import com.purlenki.server.model.User;
import com.purlenki.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<User> searchUsers(String keyword, Pageable pageable) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return Page.empty(pageable);
        }
        
        String trimmedKeyword = keyword.trim();
        

        if (trimmedKeyword.length() < 2) {
            return Page.empty(pageable);
        }
        
        return userRepository.searchUsers(trimmedKeyword, pageable);
    }

    public void deleteUser(Long id) {
        if (!userRepository.deleteById(id)) {
            throw new RuntimeException("User with ID " + id + " not found");
        }
    }

    public User updateUserRole(Long id, User.Role newRole) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
        
        user.setRole(newRole);
        return userRepository.update(user);
    }
}