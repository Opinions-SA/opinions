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
public class EpisodeToAirDto {
    private Long id;
    private String name;
    private String overview;
    private Float vote_average;
    private Long vote_count;
    private Date air_date;
    private Integer episode_number;
    private String episode_type;
    private String production_code;
    private Integer runtime;
    private Integer season_number;
    private Integer show_id;
    private String still_path;
}
