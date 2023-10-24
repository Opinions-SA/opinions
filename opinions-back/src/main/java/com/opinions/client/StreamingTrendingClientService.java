package com.opinions.client;

import com.opinions.dto.StreamingTempDto;
import com.opinions.dto.tmdbResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "tmdb-trending-api", url = "${tmdb.url.trending}")
public interface StreamingTrendingClientService {

    @RequestMapping(value = "/all/week",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    tmdbResult getAll(@RequestHeader("Authorization") String token);
}
