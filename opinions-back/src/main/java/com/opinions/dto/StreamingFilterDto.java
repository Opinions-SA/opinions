package com.opinions.dto;

import lombok.Getter;

@Getter
public class StreamingFilterDto {
    private String sortBy;
    private String withWatchProviders;
    private String withReleaseType;
    private String withGenres;
    private String certification;
    private String withRuntime_gte;
    private String withRuntime_lte;
    private String voteAverage_gte;
    private String voteAverage_lte;
    private String voteCount_gte;
    private String withKeywords;
    private String showMe;

    private String releaseDate_gte;
    private String releaseDate_lte;

    private String airDate_gte;
    private String airDate_lte;
    private String firstAirDate_gte;
    private String firstAirDate_lte;
    private String firstAirDateYear;
    private String witNetworks;
}


