package com.opinions.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class tmdbResult {

    private Long page;

    private List<StreamingTempDto> results;
}
