package com.opinions.dto;

import com.opinions.entities.User;
import com.opinions.entities.zonedDateTime;

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
public class ReviewDto {
    
    private Long id;
    private User user;
    private Float rate;
    private zonedDateTime created;
    private String streaming;
    private String description;

}
