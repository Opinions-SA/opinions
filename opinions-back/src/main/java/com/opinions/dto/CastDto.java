package com.opinions.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CastDto {

    private Boolean adult;
    private Integer gender;
    private Integer id;
    private String knownForDepartment;
    private String name;
    private String originalName;
    private Float popularity;
    private String profilePath;
    private Integer castId;
    private String character;
    private String creditId;
    private Integer order;
}
