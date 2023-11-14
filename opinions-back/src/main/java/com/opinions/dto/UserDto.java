package com.opinions.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    @NotNull
    private String username;
    private String phone;
    @NotNull
    private String email;
    private String gender;
    @NotNull
    private String cpf;
    private String birthday;
    private String password;
    private String picture;
    private UserRole role;
}