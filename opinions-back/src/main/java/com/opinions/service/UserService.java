package com.opinions.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserResponseDto;
import com.opinions.entities.User;
import com.opinions.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponseDto create (UserDto body) {
        User user = new User(body);
        repository.save(user);
        UserResponseDto response = new UserResponseDto(user);
        return response;
    }

    public List<UserResponseDto> getAll() {
        return repository.findAll().stream().map(UserResponseDto::new).toList();
    }

    public List<UserResponseDto> getByFilter(String filter) {
        //return repository.findByFilter(filter).stream().map(UserResponseDto::new).toList();
        return null;
    }

    public UserResponseDto update (UserDto body) {
        User user = new User(body);
        if(!repository.existsById(user.getId())) {
            throw new RuntimeException("User doesn't exist!");
        } else {
            repository.save(user);
        }
        return new UserResponseDto(user);
    }

    public UserResponseDto delete (UserDto body) {
        User user = new User(body);
        user = repository.findById(user.getId())
            .orElseThrow(() -> new RuntimeException("User doesn't exist!"));
        repository.deleteById(user.getId());
        UserResponseDto response = new UserResponseDto(user);
        return response;
    }
}
