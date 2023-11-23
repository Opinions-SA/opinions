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
    @Column(nullable = false)
    private Long streaming_id;
    @Column(nullable = false)
    private String streaming_type;
    @ManyToOne
    private User user;
    private ZonedDateTime created;
    @Column(nullable = false)
    private Float rate;
    private String title;
    private String description;

    
    public Review(ReviewDto data) {
        this.id = data.getId();
        this.streaming_id = data.getStreaming_id();
        this.streaming_type = data.getStreaming_type();
        this.user = data.getUser();
        this.created = data.getCreated();
        this.rate = data.getRate();
        this.title = data.getTitle();
        this.description = data.getDescription();
    }
}
