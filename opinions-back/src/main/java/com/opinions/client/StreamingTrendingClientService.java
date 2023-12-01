package com.opinions.client;

import com.opinions.dto.TmdbResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "tmdb-trending-api", url = "${tmdb.url.trending}")
public interface StreamingTrendingClientService {

    @RequestMapping(value = "/all/week",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbResult getAll(@RequestHeader("Authorization") String token);

    @RequestMapping(value = "/tv/week",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbResult getTvSeries(@RequestHeader("Authorization") String token);

    @RequestMapping(value = "/movie/week",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbResult getMovies(@RequestHeader("Authorization") String token);
}
