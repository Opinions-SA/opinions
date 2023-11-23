package com.opinions.service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.opinions.dto.*;
import com.opinions.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.opinions.entities.Review;
import com.opinions.repository.ReviewRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private StreamingService streamingService;

    ModelMapper modelMapper = new ModelMapper();

    public ReviewResponseDto create (ReviewDto body) {
        Review review = new Review(body);
        review.setCreated(review.getCreated() == null ? ZonedDateTime.now() : review.getCreated());
        repository.save(review);
        return new ReviewResponseDto(review);
    }

    public List<ReviewResponseDto> getAll () {
        return repository.findAll().stream().map(ReviewResponseDto::new).toList();
    }

    public List<ReviewStreamingResponseDto> getByUser(HttpServletRequest request) {
        UserDto user = userService.getByToken(request);
        List<ReviewDto> reviews = this.repository.findByUser(new User(user)).stream()
                .map(review -> modelMapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());

        List<ReviewStreamingResponseDto> response = new ArrayList<>();

        for (ReviewDto review: reviews) {
            StreamingDto streaming = new StreamingDto();
            StreamingTempDto temp = new StreamingTempDto();
            if (review.getStreaming_type().equals("movie")) {
                temp = modelMapper.map(streamingService.getMovie(review.getStreaming_id().intValue()), StreamingTempDto.class);
                temp.setMedia_type("movie");
            } else if (review.getStreaming_type().equals("tv")) {
                temp = modelMapper.map(streamingService.getTvSerie(review.getStreaming_id().intValue()), StreamingTempDto.class);
                temp.setMedia_type("tv");
            }
            streaming = streamingService.streamingFormat(temp);
            response.add(new ReviewStreamingResponseDto(review, streaming));
        }

        return response;
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
