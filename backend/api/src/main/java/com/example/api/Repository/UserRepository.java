package com.example.api.Repository;

import com.example.api.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsertype(String username);

//    boolean existsByEmail(String email);

    Optional<User> findByEmailAndUsertype(String email, String usertype);

   Optional<User>  findByEmail(String email);
}
