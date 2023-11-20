package com.opinions.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SeasonDto {

    private Long id;
    private String name;
    private String overview;
    private Date air_date;
    private String poster_path;
    private String season_number;
    private Integer episode_count;
    private Float vote_average;
}
