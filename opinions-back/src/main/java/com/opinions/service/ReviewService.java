package com.opinions.service;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.opinions.dto.ReviewDto;
import com.opinions.dto.ReviewResponseDto;
import com.opinions.entities.Review;
import com.opinions.repository.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    public ReviewResponseDto create (ReviewDto body) {
        Review review = new Review(body);
        review.setCreated(review.getCreated() == null ? ZonedDateTime.now() : review.getCreated());
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
        if(!repository.existsById(review.getId())) {
            throw new RuntimeException("Review doesn't exist!");
        } else {
            review = repository.save(review);
        }
        return new ReviewResponseDto(review);
    }

    public ReviewResponseDto delete (ReviewDto body) {
        Review review = new Review(body);
        review = repository.findById(review.getId())
                .orElseThrow(() -> new RuntimeException("Review doesn't exist!"));
        repository.deleteById(review.getId());
        return new ReviewResponseDto(review);
    }
}
