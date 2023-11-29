package com.opinions.dto;

import java.math.BigInteger;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeriesDto {
    private Long id;
    private String name;
    private List<SeasonDto> seasons;
    private String overview;
    private String homepage;
    private Date first_air_date;
    private String tagline;
    private List<Integer> episode_run_time;
    private Integer number_of_episodes;
    private Integer number_of_seasons;
    private List<ProductionCompanieDto> production_companies;
    private List<ProductionCountrieDto> production_countries;
    private String status;
    private String type;
    private Date last_air_date;
    private EpisodeToAirDto last_episode_to_air;
    private EpisodeToAirDto next_episode_to_air;
    private Boolean in_production;
    private List<GenreDto> genres;
    private Float popularity;
    private Float vote_average;
    private Float vote_count;
    private String poster_path;
    private String backdrop_path;
    private List<NetworkDto> networks;
    private List<CreatedByDto> created_by;
    private String media_type;
    private List<CastDto> cast;
    private String trailer;
}
