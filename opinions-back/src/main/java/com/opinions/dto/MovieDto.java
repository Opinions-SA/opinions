package com.opinions.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieDto {
    private Long id;
    private String title;
    private String homepage;
    private String overview;
    private Date release_date;
    private String status;
    private List<ProductionCompanieDto> production_companies;
    private List<ProductionCountrieDto> production_countries;
    private String tagline;
    private Float budget;
    private Float revenue;
    private Float runtime;
    private ArrayList<GenreDto> genres;
    private Float popularity;
    private Float vote_average;
    private Float vote_count;
    private String poster_path;
    private String backdrop_path;
    private String media_type;
    private List<CastDto> cast;
    private String trailer;
}
