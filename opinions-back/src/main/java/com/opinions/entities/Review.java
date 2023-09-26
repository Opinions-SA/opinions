package com.opinions.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    private User user;
    private Float rate;
    private String comment;
}
