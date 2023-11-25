package com.opinions.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TmdbResult {

    private Long page;

    private List<StreamingTempDto> results;
}
