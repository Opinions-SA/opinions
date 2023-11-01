package com.opinions.entities;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserRole;

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
public class User implements UserDetails {

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
    private UserRole role;
    

    public User(UserDto data){
        this.id = data.getId();
        this.name = data.getName();
        this.username = data.getUsername();
        this.email = data.getEmail();
        this.phone = data.getPhone();
        this.gender = data.getGender();
        this.password = data.getPassword();
        this.birthday = data.getBirthday();
        this.cpf = data.getCpf();
        this.image = data.getPicture();
        this.role = data.getRole();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        return true;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return true;
    }
}
