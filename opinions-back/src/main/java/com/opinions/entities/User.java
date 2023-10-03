package com.opinions.entities;

import com.opinions.dto.UserDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String image;
    private String phone;
    private String email;
    private String gender;
    private String cpf;
    private String birthday;
    private String password;
    

    public User(UserDto data){
        this.name = data.getName();
        this.username = data.getUsername();
        this.email = data.getEmail();
        this.phone = data.getPhone();
        this.gender = data.getGender();
        this.password = data.getPassword();
        this.birthday = data.getBirthday();
        this.cpf = data.getCpf();
        this.image = data.getPicture();
    }
}
