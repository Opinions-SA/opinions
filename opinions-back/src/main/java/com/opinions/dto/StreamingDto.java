package com.opinions.dto;

import java.math.BigInteger;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;

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
public class StreamingDto {
    private Long id;
    private String title;
    private String overview;
    private Date release_date;
    private String tagline;
    private Float budget;
    private Float revenue;
    private Float runtime;
    private ArrayList<BigInteger> genre_ids;
    private Float popularity;
    private Float vote_average;
    private Float vote_count;
    private String poster_path;
    private String backdrop_path;
    private String media_type;
}
