package com.opinions.controller;

import com.opinions.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.opinions.entities.User;
import com.opinions.infra.security.TokenService;
import com.opinions.repository.UserRepository;

import jakarta.validation.Valid;

import java.util.Arrays;
import java.util.Optional;

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
    public ResponseEntity<AuthResponseDto> login(@RequestBody @Valid AuthenticationDto data) {
        if (this.repository.findByUsername(data.getUsername()) == null) {return ResponseEntity.badRequest().body(new AuthResponseDto(null, null,"User does not exist!"));}
        if (!this.repository.findByUsername(data.getUsername()).isEnabled()) {return ResponseEntity.badRequest().body(new AuthResponseDto(null, null,"User excluded!"));}
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new AuthResponseDto(new UserResponseDto((User) this.repository.findByUsername(data.getUsername())), token, "Successfully logged in!"));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody @Valid UserDto data) {
        if(this.repository.existsByUsername(data.getUsername()) || this.repository.existsByEmail(data.getEmail()) || (data.getCpf() != null && this.repository.existsByCpf(data.getCpf())) 
        || (data.getPhone() != null && this.repository.existsByPhone(data.getPhone()))) return ResponseEntity.badRequest().body(new AuthResponseDto(null, null, "User already exists!"));

        data.setRole(UserRole.USER);
        data.setPassword(new BCryptPasswordEncoder().encode(data.getPassword()));
        User user = new User(data);

        this.repository.save(user);
        
        return ResponseEntity.ok(new AuthResponseDto(new UserResponseDto(user), null, "Registered successfully!"));
    }

    @PostMapping("/validate")
    public ResponseEntity<AuthResponseDto> validateToken(@RequestBody TokenDto token) {
        try {
            return ResponseEntity.ok(new AuthResponseDto(new UserResponseDto((User) this.repository.findByUsername(tokenService.validateToken(token.getToken()))), token.getToken(), "Valid token!"));
        } catch (RuntimeException exception){
            return ResponseEntity.badRequest().body(new AuthResponseDto(null, null, "Invalid token!"));
        }
    }

    @PostMapping("/field/{field}")
    public ResponseEntity<FieldResponseDto> validateField(@PathVariable String field, @RequestBody FieldDto data) {
        try {
            if (data.getValue() == null || data.getValue().isEmpty()) throw new IllegalArgumentException("Invalid value!");
            if (!Arrays.asList("email", "username", "phone", "cpf").contains(field)) throw new IllegalArgumentException("Invalid field!");
            Boolean response = false;

            switch (field) {
                case "email":
                    response = !this.repository.existsByEmail(data.getValue());
                    break;
                case "username":
                    response = !this.repository.existsByUsername(data.getValue());
                    break;
                case "phone":
                    response = !this.repository.existsByPhone(data.getValue());
                    break;
                case "cpf":
                    response = !this.repository.existsByCpf(data.getValue());
                    break;
            }

            return ResponseEntity.ok(new FieldResponseDto(response, "Validated field!"));

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(new FieldResponseDto(false, exception.getMessage()));
        }
    }

    @PostMapping("/password")
    public ResponseEntity<AuthResponseDto> passwordChange(@RequestBody @Valid PasswordChangeDto data) {
        Optional<User> userOptional = this.repository.findById(data.getId());
        if (userOptional.isEmpty() || !userOptional.get().isEnabled()) {
            return ResponseEntity.badRequest().body(new AuthResponseDto(null, null,"User does not exist or disable!"));
        }
        User user = userOptional.get();
        if (!new BCryptPasswordEncoder().matches(data.getOld_password(), user.getPassword())) {
            return ResponseEntity.badRequest().body(new AuthResponseDto(null, null,"Incorrect password!"));
        }
        user.setPassword(new BCryptPasswordEncoder().encode(data.getOld_password()));
        repository.save(user);
        return ResponseEntity.ok(new AuthResponseDto(new UserResponseDto(user), null, "Successfully changed!"));
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody @Valid String token) {
        return ResponseEntity.ok().build();
    }
}
