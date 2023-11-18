package com.opinions.repository;

import com.opinions.client.*;
import com.opinions.dto.StreamingFilterDto;
import com.opinions.dto.StreamingTempDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class DiscoverRepository {

    @Value("${tmdb.token}")
    private String API_TOKEN;

    @Autowired
    protected StreamingDiscoverClientService clientService;

    public List<StreamingTempDto> getMovies(StreamingFilterDto filters, String page) {
        return (clientService.getMovies(API_TOKEN,
                page,
                filters.getSortBy(),
                filters.getWithWatchProviders(),
                filters.getWithReleaseType(),
                filters.getWithGenres(),
                filters.getCertification(),
                filters.getWithRuntime_gte(),
                filters.getWithRuntime_lte(),
                filters.getReleaseDate_gte(),
                filters.getReleaseDate_lte(),
                filters.getVoteAverage_gte(),
                filters.getVoteAverage_lte(),
                filters.getVoteCount_gte(),
                filters.getWithKeywords(),
                filters.getAirDate_gte(),
                filters.getAirDate_lte(),
                filters.getFirstAirDate_gte(),
                filters.getFirstAirDate_lte(),
                filters.getFirstAirDateYear(),
                filters.getWitNetworks(),
                filters.getShowMe())).getResults();
    }

    public List<StreamingTempDto> getTvSeries(StreamingFilterDto filters, String page) {
        return (clientService.getTvSeries(API_TOKEN,
                page,
                filters.getSortBy(),
                filters.getWithWatchProviders(),
                filters.getWithReleaseType(),
                filters.getWithGenres(),
                filters.getCertification(),
                filters.getWithRuntime_gte(),
                filters.getWithRuntime_lte(),
                filters.getReleaseDate_gte(),
                filters.getReleaseDate_lte(),
                filters.getVoteAverage_gte(),
                filters.getVoteAverage_lte(),
                filters.getVoteCount_gte(),
                filters.getWithKeywords(),
                filters.getAirDate_gte(),
                filters.getAirDate_lte(),
                filters.getFirstAirDate_gte(),
                filters.getFirstAirDate_lte(),
                filters.getFirstAirDateYear(),
                filters.getWitNetworks(),
                filters.getShowMe())).getResults();
    }
    
}
