package com.opinions.service;

import java.util.List;

import com.opinions.infra.security.TokenService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserResponseDto;
import com.opinions.entities.User;
import com.opinions.repository.UserRepository;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    ModelMapper modelMapper = new ModelMapper();

    public UserResponseDto create (UserDto body) {
        User user = new User(body);
        repository.save(user);
        UserResponseDto response = new UserResponseDto(user);
        return response;
    }

    public List<UserResponseDto> getAll() {
        return repository.findAll().stream().map(UserResponseDto::new).toList();
    }

    public UserDto getByToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        return  modelMapper.map(this.repository.findByUsername(tokenService.validateToken(token)), UserDto.class);
    }

    public UserDto getById(Long id) {
        return modelMapper.map(repository.findById(id), UserDto.class);
    }

    public List<UserResponseDto> getByFilter(String filter) {
        //return repository.findByFilter(filter).stream().map(UserResponseDto::new).toList();
        return null;
    }

    public UserResponseDto update (UserDto body) {
        User user = new User(body);
        if(!repository.existsById(user.getId())) {
            throw new RuntimeException("User doesn't exist!");
        }
        repository.save(user);
        return new UserResponseDto(user);
    }

    public UserResponseDto delete (Long id) {
        User user = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("User doesn't exist!"));
        user.setActive(false);
        repository.save(user);
        return new UserResponseDto(user);
    }
}
