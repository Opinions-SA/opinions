package com.opinions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.modelmapper.ModelMapper;

import com.opinions.dto.MovieDto;
import com.opinions.dto.SeriesDto;
import com.opinions.dto.StreamingDto;
import com.opinions.dto.StreamingTempDto;
import com.opinions.repository.StreamingRepository;
import com.opinions.service.StreamingService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class StreamingTests {
    @InjectMocks
    private StreamingService streamingService;
    
    @Mock
    private StreamingRepository streamingRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Test // O TÍTULO DA SÉRIE VEM SEMPRE NULA
    public void testGetTrendingAll() {
        
    }

    @Test // Deu boa
    public void testGetMovie() {
        // Simular dados de streaming temporários
        StreamingTempDto streamingTemp = new StreamingTempDto();
        streamingTemp.setId(1L);
        streamingTemp.setTitle("Movie 1");
        streamingTemp.setMedia_type("movie");

        // Configurar o comportamento simulado do repositório
        when(streamingRepository.getMovie(1)).thenReturn(modelMapper.map(streamingTemp, MovieDto.class));

        // Chamar o método real que está sendo testado
        MovieDto movie = streamingService.getMovie(1);

        // Verificar se o resultado corresponde ao esperado
        assertEquals("Movie 1", movie.getTitle());
    }

    @Test // Deu Boa
    public void testGetTvSerie() {
        StreamingTempDto streamingTemp = new StreamingTempDto();
        streamingTemp.setId(1L);
        streamingTemp.setTitle("Series 1");
        streamingTemp.setMedia_type("tv");

        when(streamingRepository.getTvSerie(1)).thenReturn(modelMapper.map(streamingTemp, SeriesDto.class));
        SeriesDto tvSerie = streamingService.getTvSerie(1);
        assertEquals("Series 1", tvSerie.getName());
    }

    @Test // Deu Boa
    public void testSearchMovies() {
        // Simular dados de streaming temporários
        StreamingTempDto streamingTemp1 = new StreamingTempDto();
        streamingTemp1.setId(1L);
        streamingTemp1.setTitle("Movie 1");
        streamingTemp1.setMedia_type("movie");

        StreamingTempDto streamingTemp2 = new StreamingTempDto();
        streamingTemp2.setId(2L);
        streamingTemp2.setTitle("Movie 2");
        streamingTemp2.setMedia_type("movie");

        // Converter StreamingTempDto para MovieDto
        MovieDto movieDto1 = modelMapper.map(streamingTemp1, MovieDto.class);
        MovieDto movieDto2 = modelMapper.map(streamingTemp2, MovieDto.class);

        // Configurar o comportamento simulado do repositório
        when(streamingRepository.searchMovies("Movie")).thenReturn(Arrays.asList(movieDto1, movieDto2));
        List<MovieDto> searchResults = streamingService.searchMovies("Movie");

        // Verificar resultados
        assertEquals(2, searchResults.size());
        assertEquals("Movie 1", searchResults.get(0).getTitle());
        assertEquals("Movie 2", searchResults.get(1).getTitle());
    }

    @Test
    public void testStreamingFormat() {
        
    }

    @Test
    public void testStreamingListFormat() {
        
    }

    @Test // Deu boa
    public void testStreamingSeriesToMovies() {
        // Simular dados de streaming temporários
        StreamingTempDto streamingTemp = new StreamingTempDto();
        streamingTemp.setId(1L);
        streamingTemp.setName("Series 1");
        streamingTemp.setMedia_type("tv");

        // Chamar o método real que está sendo testado
        StreamingTempDto result = streamingService.streamingSeriesToMovie(streamingTemp);

        // Verificar se o resultado corresponde ao esperado
        assertNotNull(result);
        assertEquals("Series 1", result.getName());
        assertEquals("Series 1", result.getTitle());
        assertEquals("tv", result.getMedia_type());
    }
}
