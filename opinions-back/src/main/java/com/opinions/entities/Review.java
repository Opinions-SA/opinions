package com.opinions.entities;

import com.opinions.dto.ReviewDto;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    private ZonedDateTime created;
    private String streaming;
    private Float rate;
    private String description;

    
    public Review(ReviewDto data) {
        this.id = data.getId();
        this.user = new User().builder().id(data.getUser()).build();
        this.rate = data.getRate();
        this.created = data.getCreated();
        this.streaming = data.getStreaming();
        this.description = data.getDescription();
    }
}
