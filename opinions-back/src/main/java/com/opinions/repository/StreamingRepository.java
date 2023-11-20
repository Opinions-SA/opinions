package com.opinions.repository;

import com.opinions.client.StreamingMovieClientService;
import com.opinions.client.StreamingSearchClientService;
import com.opinions.client.StreamingTrendingClientService;
import com.opinions.client.StreamingTvSerieClientService;
import com.opinions.dto.MovieDto;
import com.opinions.dto.StreamingTempDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.opinions.dto.SeriesDto;
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
    protected StreamingTvSerieClientService tvSerieClientService;

    @Autowired
    protected StreamingSearchClientService searchClientService;

    public List<StreamingTempDto> getTrendingAll() {
        return (trendingClientService.getAll(API_TOKEN)).getResults();
    }

    public MovieDto getMovie(Integer movie) {
        return (movieClientService.getMovie(API_TOKEN, movie));
    }

    public SeriesDto getTvSerie(Integer serie) {
        return (tvSerieClientService.getTvSerie(API_TOKEN, serie));
    }

    public List<MovieDto> searchMovies(String movie) {
        return (searchClientService.searchMovies(API_TOKEN, movie)).getResults();
    }
    
}
