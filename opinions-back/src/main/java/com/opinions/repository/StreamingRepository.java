package com.opinions.repository;

import com.opinions.client.StreamingMovieClientService;
import com.opinions.client.StreamingSearchClientService;
import com.opinions.client.StreamingTrendingClientService;
import com.opinions.dto.StreamingTempDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.opinions.dto.StreamingDto;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class StreamingRepository {

    @Value("${tmdb.token}")
    private String API_TOKEN;

    @Autowired
    protected StreamingTrendingClientService trendingClientService;

    @Autowired
    protected StreamingMovieClientService movieClientService;

    @Autowired
    protected StreamingSearchClientService searchClientService;

    public List<StreamingTempDto> getTrendingAll() {
        return (trendingClientService.getAll(API_TOKEN)).getResults();
    }

    public StreamingTempDto getMovie(Integer movie) {
        return (movieClientService.getMovie(API_TOKEN, movie));
    }

    public List<StreamingTempDto> searchMovies(String movie) {
        return (searchClientService.searchMovies(API_TOKEN, movie)).getResults();
    }
    
}
