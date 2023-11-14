package com.opinions.dto;

public record AuthResponseDto(UserResponseDto user, String token, String message) {
    
}
