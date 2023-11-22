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
public class UserService extends BasicService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthorizationService authorizationService;

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
        return modelMapper.map(this.repository.findByUsername(tokenService.validateToken(authorizationService.getTokenByRequestHeader(request))), UserDto.class);
    }

    public UserDto getById(Long id) {
        return modelMapper.map(repository.findById(id), UserDto.class);
    }

    public List<UserResponseDto> getByFilter(String filter) {
        //return repository.findByFilter(filter).stream().map(UserResponseDto::new).toList();
        return null;
    }

    public UserResponseDto update (UserDto body, HttpServletRequest request) {
        if (body.getId() == null) {throw new RuntimeException("ID cannot be empty!");}

        if(!tokenService.validadeAdmin(request)) {
            if(!body.getId().equals(getByToken(request).getId())) {
                throw new RuntimeException("No ADMIN access!");
            }
        }

        User user = putDiffToUpdate(body);
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

    private User putDiffToUpdate(UserDto data) {
        User user = this.repository.findById(data.getId()).orElseThrow(() -> new RuntimeException("User doesn't exist!"));

        data.setPassword(null); data.setActive(null); data.setRole(null);
        ObjectUtils.emptyToNull(data);
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(data, user);
        return user;

    }
}
