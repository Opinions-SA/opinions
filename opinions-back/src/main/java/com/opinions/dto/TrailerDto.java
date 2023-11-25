package com.opinions.dto;

import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrailerDto {

    private String iso_639_1;
    private String iso_3166_1;
    private String name;
    private String key;
    private String site;
    private Integer size;
    private String type;
    private Boolean official;
    private ZonedDateTime publishedAt;
    private String id;
}
