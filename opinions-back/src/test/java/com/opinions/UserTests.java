package com.opinions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.opinions.dto.UserDto;
import com.opinions.entities.User;
import com.opinions.repository.UserRepository;
import com.opinions.service.UserService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserTests {
    @InjectMocks
    private UserService userService;
    
    @Mock
    private UserRepository userRepository;

    @Test
    public void testGetUser() {
        // Esperar o que vai ser da função getByFilter
    }

    @Test
    public void testLoginUser() {
        User registeredUser = new User();
        registeredUser.setEmail("john@email.com");
        registeredUser.setPassword("password123");

        Mockito.when(userRepository.findByEmail("john@email.com")).thenReturn(registeredUser);
        String email = "john@email.com";
        User foundUser = userRepository.findByEmail(email);

        assertNotNull(foundUser);
        assertEquals(registeredUser.getPassword(), foundUser.getPassword());
    }

    @Test
    public void testCreateUser() {
        UserDto userDto = new UserDto();

        User user = new User(userDto);
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        userService.create(userDto);

        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
    }

    @Test
    public void testUpdateUser() {
        UserDto userDto = new UserDto();

        User user = new User(userDto);
        Mockito.when(userRepository.existsById(user.getId())).thenReturn(true);
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        userService.update(userDto);

        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
    }

    @Test
    public void testDeleteUser() {
        UserDto userDto = new UserDto();

        User user = new User(userDto);
        Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        userService.delete(userDto);

        Mockito.verify(userRepository, Mockito.times(1)).deleteById(user.getId());
    }
}