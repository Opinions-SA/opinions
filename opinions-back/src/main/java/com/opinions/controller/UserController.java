package com.opinions.controller;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserResponseDto;
import com.opinions.entities.User;
import com.opinions.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository repository;

    //@Autowired
    //private UserService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public UserResponseDto create(@RequestBody UserDto data){
        User user = new User(data);
        repository.save(user);
        UserResponseDto response = new UserResponseDto(user);
        return response;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<UserResponseDto> getAll(){
        List<UserResponseDto> usersList = repository.findAll().stream().map(UserResponseDto::new).toList();
        return usersList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/filter")
    public List<UserResponseDto> getByFilter(@RequestParam Optional<String> filter){
        List<UserResponseDto> usersList = null;
        //usersList = service.findByFilter(filter).stream().map(UserResponseDto::new).toList();
        return usersList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/delete")
    public UserResponseDto delete(@RequestBody User data) {
        if(repository.existsById(data.getId())) {
            repository.deleteById(data.getId());
        } else {
            throw new RuntimeException("User doesn't exist!");
        }
        UserResponseDto response = new UserResponseDto(data);
        return response;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update")
    public UserResponseDto update(@RequestBody User data) {
        if(repository.existsById(data.getId())) {
            repository.save(data);
        } else {
            throw new RuntimeException("User doesn't exist!");
        }
        UserResponseDto response = new UserResponseDto(data);
        return response;
    }

    /*
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public UserResponseDto getEditUser(@RequestBody User data) {
        return service.verifyPassword(data);
    }
    */
}