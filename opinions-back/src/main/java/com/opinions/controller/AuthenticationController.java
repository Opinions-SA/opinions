package com.opinions.controller;

import com.opinions.dto.AuthenticationDto;
import com.opinions.dto.AuthResponseDto;
import com.opinions.dto.TokenDto;
import com.opinions.dto.UserDto;
import com.opinions.dto.UserResponseDto;
import com.opinions.dto.UserRole;
import com.opinions.dto.PasswordChangeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.opinions.entities.User;
import com.opinions.infra.security.TokenService;
import com.opinions.repository.UserRepository;

import jakarta.validation.Valid;

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
