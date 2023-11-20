package com.opinions.repository;

import com.opinions.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByGender(String gender);

    User findByEmail(String email);
 
    UserDetails findByUsername (String username);

    User findByPhone (String phone);

    User deleteByUsername(String username);

}
