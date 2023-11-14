package com.opinions.client;

import com.opinions.dto.MovieDto;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "tmdb-movie-api", url = "${tmdb.url.movie}")
public interface StreamingMovieClientService {

    @RequestMapping(value = "/{movie}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    MovieDto getMovie(@RequestHeader("Authorization") String token, @PathVariable("movie") Integer movie);
    
}
