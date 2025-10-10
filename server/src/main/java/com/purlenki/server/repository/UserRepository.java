package com.purlenki.server.repository;

import com.purlenki.server.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {

    List<User> findAll();

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByRole(User.Role role);

    User save(User user);

    User update(User user);

    boolean deleteById(Long id);

    long count();
}