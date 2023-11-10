package com.opinions.dto;

public record LoginResponseDto(UserResponseDto user, String token) {
    
}
