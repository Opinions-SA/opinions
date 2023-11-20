package com.opinions.dto;

import com.opinions.entities.User;

public record UserResponseDto (Long id, String username, String email, String phone) {

    public UserResponseDto(User user) {
        this(user.getId(), user.getUsername(), user.getEmail(), user.getPhone());
    }

}
