package com.opinions.controller;

import com.opinions.dto.DiscoverDto;
import com.opinions.dto.StreamingDto;
import com.opinions.service.DiscoverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("discover")
public class DiscoverController {

    @Autowired
    private DiscoverService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/movie")
    public List<StreamingDto> getMovie(@RequestBody() final DiscoverDto filters) {
        return service.getMovies(filters);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/tv")
    public List<StreamingDto> getTvSerie(@RequestBody() final DiscoverDto filters) {
        return service.getTvSeries(filters);
    }

}
