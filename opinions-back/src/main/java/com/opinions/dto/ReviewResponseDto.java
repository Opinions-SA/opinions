package com.opinions.dto;

import com.opinions.entities.Review;
import com.opinions.entities.User;
import com.opinions.entities.zonedDateTime;

public record ReviewResponseDto (Long id, User user, Float rate, zonedDateTime created, String streaming, String description) {

    public ReviewResponseDto(Review review) {
        this(review.getId(), review.getUser(), review.getRate(), review.getCreated(), review.getStreaming(), review.getDescription());
    }
}
