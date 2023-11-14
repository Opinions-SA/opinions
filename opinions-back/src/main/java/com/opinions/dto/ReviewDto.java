package com.opinions.dto;

import com.opinions.entities.User;
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
    private Long streaming_id;
    private String streaming_type;
    private User user;
    private ZonedDateTime created;
    private Float rate;
    private String title;
    private String description;

}
