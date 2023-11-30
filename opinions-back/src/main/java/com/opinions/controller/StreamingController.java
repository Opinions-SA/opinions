package com.opinions.controller;

import com.opinions.dto.MovieDto;
import com.opinions.dto.SeriesDto;
import com.opinions.dto.StreamingDto;
import com.opinions.service.StreamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("streaming")
public class StreamingController {

    @Autowired
    private StreamingService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/trending/all")
    public List<StreamingDto> getTrendingAll() {
        return service.getTrendingAll("");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/trending/tv")
    public List<StreamingDto> getTrendingMovies() {
        return service.getTrendingAll("tv");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/trending/movie")
    public List<StreamingDto> getTrendingTvSeries() {
        return service.getTrendingAll("movie");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/movie/{movie}")
    public MovieDto getMovie(@PathVariable("movie") final Integer movie) {
        return service.getMovie(movie);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/tv/{serie}")
    public SeriesDto getTvSerie(@PathVariable("serie") final Integer serie) {
        return service.getTvSerie(serie);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/search/movie/{movie}")
    public List<MovieDto> searchMovies(@PathVariable("movie") final String movie) {
        return service.searchMovies(movie);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/search/multi/{query}")
    public List<StreamingDto> searchMulti(@PathVariable("query") final String query) {
        return service.searchMulti(query);
    }

}
