package com.opinions.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TmdbCastResult {

    private Long id;

    private List<CastDto> cast;
}
