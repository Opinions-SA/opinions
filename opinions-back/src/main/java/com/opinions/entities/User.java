package com.opinions.entities;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.opinions.dto.UserDto;
import com.opinions.dto.UserRole;

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
    @NotNull @Column(unique = true)
    private String username;
    private String image;
    private String phone;
    @NotNull @Column(unique = true)
    private String email;
    private String gender;
    @Column(unique = true)
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
