package com.opinions.entities;

import com.opinions.dto.ReviewDto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User user;
    private zonedDateTime created;
    private String streaming;
    private Float rate;
    private String description;

    
    public Review(ReviewDto data) {
        this.id = data.getId();
        this.user = data.getUser();
        this.rate = data.getRate();
        this.created = data.getCreated();
        this.streaming = data.getStreaming();
        this.description = data.getDescription();
    }
}
