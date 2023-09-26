package com.opinions.dto;

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
    private String username;
    private String phone;
    private String email;
    private String gender;
    private String cpf;
    private String birthday;
    private String password;
    private String picture;
}