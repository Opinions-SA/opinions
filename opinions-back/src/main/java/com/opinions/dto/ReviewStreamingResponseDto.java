package com.opinions.dto;

import com.opinions.entities.User;
import lombok.*;

import java.time.ZonedDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ReviewStreamingResponseDto {

    private Long id;
    private StreamingDto streaming;
    private Long user;
    private ZonedDateTime created;
    private Float rate;
    private String title;
    private String description;

    public ReviewStreamingResponseDto (ReviewDto review, StreamingDto streaming) {
        this.id = review.getId();
        this.streaming = streaming;
        this.user = review.getUser().getId();
        this.created = review.getCreated();
        this.rate = review.getRate();
        this.title = review.getTitle();
        this.description = review.getDescription();
    }

}
