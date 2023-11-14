package com.opinions.dto;

import com.opinions.entities.Review;

import java.time.ZonedDateTime;

public record ReviewResponseDto (Long id, Long streamingId, String streamingType, Long user, Float rate, ZonedDateTime created, String description) {

    public ReviewResponseDto(Review review) {
        this(review.getId(), review.getStreaming_id(), review.getStreaming_type(), review.getUser().getId(), review.getRate(), review.getCreated(), review.getDescription());
    }
}
