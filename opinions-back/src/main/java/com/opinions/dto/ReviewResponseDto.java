package com.opinions.dto;

import com.opinions.entities.Review;
import com.opinions.entities.User;

import java.time.ZonedDateTime;

public record ReviewResponseDto (Long id, Long user, Float rate, ZonedDateTime created, String streaming, String description) {

    public ReviewResponseDto(Review review) {
        this(review.getId(), review.getUser().getId(), review.getRate(), review.getCreated(), review.getStreaming(), review.getDescription());
    }
}
