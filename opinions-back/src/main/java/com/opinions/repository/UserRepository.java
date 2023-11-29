package com.opinions.repository;

import com.opinions.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByGender(String gender);

    User findByEmail(String email);

    User findByUsername (String username);

    User findByPhone (String phone);

    User deleteByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByCpf(String cpf);

    Boolean existsByPhone(String phone);

}
