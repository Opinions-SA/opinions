package com.opinions.client;

import com.opinions.dto.TmdbMovieResult;
import com.opinions.dto.TmdbResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "tmdb-search-api", url = "${tmdb.url.search}")
public interface StreamingSearchClientService {

    @RequestMapping(value = "/multi",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbResult searchMulti(@RequestHeader("Authorization") String token, @RequestParam("query") String query);

    @RequestMapping(value = "/movie",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbMovieResult searchMovies(@RequestHeader("Authorization") String token, @RequestParam("query") String movie);
}
