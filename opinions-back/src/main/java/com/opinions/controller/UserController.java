package com.opinions.controller;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserResponseDto;
import com.opinions.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public UserResponseDto create(@RequestBody UserDto data){
        return service.create(data);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<UserResponseDto> getAll(){
        return service.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/filter")
    public List<UserResponseDto> getByFilter(@RequestParam Optional<String> filter){
        return null;
        //return service.getByFilter(filter);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update")
    public UserResponseDto update(@RequestBody UserDto data) {
        return service.update(data);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/delete")
    public UserResponseDto delete(@RequestBody UserDto data) {
        return service.delete(data);
    }

    /*
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public UserResponseDto getEditUser(@RequestBody User data) {
        return service.verifyPassword(data);
    }
    */
}