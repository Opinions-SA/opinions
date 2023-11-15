package com.opinions;

import com.opinions.entities.User;
import com.opinions.repository.UserRepository;
import com.opinions.service.AuthorizationService;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AuthorizationTests {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthorizationService authorizationService;

    @Test
    public void testLoadUserByUsername() {
        String username = "user123";
        User mockedUser = new User();
        mockedUser.setUsername(username);

        Mockito.when(userRepository.findByUsername(username)).thenReturn(mockedUser);
        UserDetails userDetails = authorizationService.loadUserByUsername(username);
        Mockito.verify(userRepository, Mockito.times(1)).findByUsername(username);
        assertEquals(username, userDetails.getUsername());
    }
}
