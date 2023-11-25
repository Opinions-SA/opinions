package com.opinions.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TmdbMovieResult {

    private Long page;

    private List<MovieDto> results;
}
