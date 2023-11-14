package com.opinions.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductionCompanieDto {

    private Long id;
    private String name;
    private String logo_path;
    private String origin_country;
}
