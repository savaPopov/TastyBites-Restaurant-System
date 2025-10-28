package com.purlenki.server.repository;

import com.purlenki.server.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository {

    List<User> findAll();

    Page<User> findAll(Pageable pageable, String excludeEmail);

    Page<User> searchUsers(String keyword, Pageable pageable, String excludeEmail);

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByRole(User.Role role);

    User save(User user);

    User update(User user);

    boolean deleteById(Long id);

}