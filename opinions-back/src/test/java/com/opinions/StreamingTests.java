package com.opinions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.opinions.repository.StreamingRepository;
import com.opinions.service.StreamingService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class StreamingTests {
    @InjectMocks
    private StreamingService streamingService;
    
    @Mock
    private StreamingRepository streamingRepository;

    @Test
    public void testGetTrendingAll() {

    }

    @Test
    public void testGetMovie() {
        
    }

    @Test
    public void testGetTvSerie() {
        
    }

    @Test
    public void testSearchMovies() {
        
    }

    @Test
    public void testStreamingFormat() {
        
    }

    @Test
    public void testStreamingListFormat() {
        
    }

    @Test
    public void testStreamingSeriesToMovies() {
        
    }
}
