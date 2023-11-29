package com.opinions.client;

import com.opinions.dto.SeriesDto;
import com.opinions.dto.TmdbCastResult;
import com.opinions.dto.TmdbTrailerResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "tmdb-serie-api", url = "${tmdb.url.series}")
public interface StreamingTvSerieClientService {

    @RequestMapping(value = "/{serie}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    SeriesDto getTvSerie(@RequestHeader("Authorization") String token, @PathVariable("serie") Integer serie);

    @RequestMapping(value = "/{serie}/videos",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbTrailerResult getTvSerieTrailer(@RequestHeader("Authorization") String token, @PathVariable("serie") Integer serie);

    @RequestMapping(value = "/{serie}/credits",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbCastResult getTvSerieCast(@RequestHeader("Authorization") String token, @PathVariable("serie") Integer serie);
    
}
