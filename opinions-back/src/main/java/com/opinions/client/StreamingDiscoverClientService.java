package com.opinions.client;

import com.opinions.dto.TmdbResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "tmdb-discover-api", url = "${tmdb.url.discover}")
public interface StreamingDiscoverClientService {

    @RequestMapping(value = "/movie",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbResult getMovies(@RequestHeader("Authorization") String token,
                         @RequestParam(value = "page" , defaultValue = "1") String page,
                         @RequestParam(value = "sort_by" , defaultValue = "popularity.desc") String sortBy,
                         @RequestParam(value = "with_watch_providers" , defaultValue = "") String withWatchProviders,
                         @RequestParam(value = "with_release_type" , defaultValue = "") String withReleaseType,
                         @RequestParam(value = "with_genres" , defaultValue = "") String withGenres,
                         @RequestParam(value = "certification" , defaultValue = "") String certification,
                         @RequestParam(value = "with_runtime.gte" , defaultValue = "0") String withRuntime_gte,
                         @RequestParam(value = "with_runtime.lte" , defaultValue = "400") String withRuntime_lte,
                         @RequestParam(value = "release_date.gte" , defaultValue = "") String releaseDate_gte,
                         @RequestParam(value = "release_date.lte" , defaultValue = "") String releaseDate_lte,
                         @RequestParam(value = "vote_average.gte" , defaultValue = "0") String voteAverage_gte,
                         @RequestParam(value = "vote_average.lte" , defaultValue = "10") String voteAverage_lte,
                         @RequestParam(value = "vote_count.gte" , defaultValue = "0") String voteCount_gte,
                         @RequestParam(value = "with_keywords" , defaultValue = "") String withKeywords,
                         @RequestParam(value = "air_date.gte" , defaultValue = "") String airDate_gte,
                         @RequestParam(value = "air_date.lte" , defaultValue = "") String airDate_lte,
                         @RequestParam(value = "first_air_date.gte" , defaultValue = "") String firstAirDate_gte,
                         @RequestParam(value = "first_air_date.lte" , defaultValue = "") String firstAirDate_lte,
                         @RequestParam(value = "first_air_date_year" , defaultValue = "") String firstAirDateYear,
                         @RequestParam(value = "with_networks" , defaultValue = "") String witNetworks,
                         @RequestParam(value = "show_me" , defaultValue = "0") String showMe);

    @RequestMapping(value = "/tv",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    TmdbResult getTvSeries(@RequestHeader("Authorization") String token,
                           @RequestParam(value = "page" , defaultValue = "1") String page,
                           @RequestParam(value = "sort_by" , defaultValue = "popularity.desc") String sortBy,
                           @RequestParam(value = "with_watch_providers" , defaultValue = "") String withWatchProviders,
                           @RequestParam(value = "with_release_type" , defaultValue = "") String withReleaseType,
                           @RequestParam(value = "with_genres" , defaultValue = "") String withGenres,
                           @RequestParam(value = "certification" , defaultValue = "") String certification,
                           @RequestParam(value = "with_runtime.gte" , defaultValue = "0") String withRuntime_gte,
                           @RequestParam(value = "with_runtime.lte" , defaultValue = "400") String withRuntime_lte,
                           @RequestParam(value = "release_date.gte" , defaultValue = "") String releaseDate_gte,
                           @RequestParam(value = "release_date.lte" , defaultValue = "") String releaseDate_lte,
                           @RequestParam(value = "vote_average.gte" , defaultValue = "0") String voteAverage_gte,
                           @RequestParam(value = "vote_average.lte" , defaultValue = "10") String voteAverage_lte,
                           @RequestParam(value = "vote_count.gte" , defaultValue = "0") String voteCount_gte,
                           @RequestParam(value = "with_keywords" , defaultValue = "") String withKeywords,
                           @RequestParam(value = "air_date.gte" , defaultValue = "") String airDate_gte,
                           @RequestParam(value = "air_date.lte" , defaultValue = "") String airDate_lte,
                           @RequestParam(value = "first_air_date.gte" , defaultValue = "") String firstAirDate_gte,
                           @RequestParam(value = "first_air_date.lte" , defaultValue = "") String firstAirDate_lte,
                           @RequestParam(value = "first_air_date_year" , defaultValue = "") String firstAirDateYear,
                           @RequestParam(value = "with_networks" , defaultValue = "") String witNetworks,
                           @RequestParam(value = "show_me" , defaultValue = "0") String showMe);
    
}
