package com.opinions.controller;

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
        return service.getTrendingAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/movie/{movie}")
    public StreamingDto getMovie(@PathVariable("movie") final Integer movie) {
        return service.getMovie(movie);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/search/movie/{movie}")
    public List<StreamingDto> searchMovies(@PathVariable("movie") final String movie) {
        return service.searchMovies(movie);
    }

}
