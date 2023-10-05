package com.opinions.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.opinions.dto.ReviewDto;
import com.opinions.dto.ReviewResponseDto;
import com.opinions.entities.Review;
import com.opinions.repository.ReviewRepository;

public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    public ReviewResponseDto create (ReviewDto body) {
        Review review = new Review(body);
        repository.save(review);
        return new ReviewResponseDto(review);
    }

    public List<ReviewResponseDto> getAll () {
        return repository.findAll().stream().map(ReviewResponseDto::new).toList();
    }

    public List<ReviewResponseDto> getByFilter () {
        //return service.findByFilter(filter).stream().map(ReviewResponseDto::new).toList();
        return null;
    }

    public ReviewResponseDto update (ReviewDto body) {
        Review review = new Review(body);
        if(repository.existsById(review.getId())) {
            repository.save(review);
        } else {
            throw new RuntimeException("Review doesn't exist!");
        }
        return new ReviewResponseDto(review);
    }

    public ReviewResponseDto delete (ReviewDto body) {
        Review review = new Review(body);
        if(repository.existsById(review.getId())) {
            repository.deleteById(review.getId());
        } else {
            throw new RuntimeException("Review doesn't exist!");
        }
        return new ReviewResponseDto(review);
    }
}
