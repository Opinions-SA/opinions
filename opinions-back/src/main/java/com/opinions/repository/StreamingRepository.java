package com.opinions.repository;

import com.opinions.client.StreamingMovieClientService;
import com.opinions.client.StreamingSearchClientService;
import com.opinions.client.StreamingTrendingClientService;
import com.opinions.client.StreamingTvSerieClientService;
import com.opinions.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

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

    public List<StreamingTempDto> getTrendingMovies() {
        return (trendingClientService.getMovies(API_TOKEN)).getResults();
    }

    public List<StreamingTempDto> getTrendingTvSeries() {
        return (trendingClientService.getTvSeries(API_TOKEN)).getResults();
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

    public List<StreamingTempDto> searchMulti(String query) {
        return (searchClientService.searchMulti(API_TOKEN, query)).getResults();
    }

    public TmdbTrailerResult getTrailer(Integer id, Boolean movie) {
        if (movie) {
            return movieClientService.getMovieTrailer(API_TOKEN, id);
        } else {
            return tvSerieClientService.getTvSerieTrailer(API_TOKEN, id);
        }
    }

    public TmdbCastResult getCast(Integer id, Boolean movie) {
        if (movie) {
            return movieClientService.getMovieCast(API_TOKEN, id);
        } else {
            return tvSerieClientService.getTvSerieCast(API_TOKEN, id);
        }
    }
    
}
