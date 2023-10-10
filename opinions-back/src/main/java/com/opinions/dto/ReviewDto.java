package com.opinions.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ReviewDto {

    private Long id;
    private Long user;
    private Float rate;
    private ZonedDateTime created;
    private String streaming;
    private String description;

}
