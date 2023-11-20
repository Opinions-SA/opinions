package com.opinions.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.Entity;

@Entity
@Data
public class Streaming {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String category;
    private Character type;
    private Float scoreRate;   
    private String releaseYear; 
    private String duration;
    private String trailer;
    private String image;
    private String cast;
    private String description;

}
