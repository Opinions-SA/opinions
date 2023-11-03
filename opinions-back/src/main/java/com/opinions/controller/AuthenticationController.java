package com.opinions.controller;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserResponseDto;
import com.opinions.dto.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.opinions.dto.AuthenticationDto;
import com.opinions.dto.LoginResponseDto;
import com.opinions.entities.User;
import com.opinions.infra.security.TokenService;
import com.opinions.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDto(new UserResponseDto((User) this.repository.findByUsername(data.getUsername())), token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid UserDto data) {
        if(this.repository.findByUsername(data.getUsername()) != null) return ResponseEntity.badRequest().build();

        data.setRole(UserRole.USER);
        data.setPassword(new BCryptPasswordEncoder().encode(data.getPassword()));
        User user = new User(data);

        this.repository.save(user);
        
        return ResponseEntity.ok(new UserResponseDto(user));
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody @Valid String token) {
        return ResponseEntity.ok().build();
    }
}
