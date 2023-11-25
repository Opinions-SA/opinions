package com.opinions.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TmdbTrailerResult {

    private Long id;

    private List<TrailerDto> results;
}
