package com.opinions.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import com.opinions.dto.UserRole;
import com.opinions.repository.UserRepository;
import com.opinions.service.AuthorizationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.opinions.entities.User;

@Service
public class TokenService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthorizationService authorizationService;

    @Value("${api.security.token.secret}")
    private String secret;
    
    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
            .withIssuer("auth-api")
            .withSubject(user.getUsername())
            .withExpiresAt(genExpirationDate())
            .sign(algorithm);
        } catch(JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    public String validateToken(String token) {
        try {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm)
            .withIssuer("auth-api")
            .build()
            .verify(token)
            .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    public Boolean validadeAdmin (HttpServletRequest request) {
        return this.repository.findByUsername(validateToken(authorizationService.getTokenByRequestHeader(request))).getAuthorities().contains(UserRole.ADMIN);
    }

    private Instant genExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
