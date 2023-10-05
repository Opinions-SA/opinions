package com.opinions.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opinions.dto.ReviewDto;
import com.opinions.dto.ReviewResponseDto;
import com.opinions.entities.Review;
import com.opinions.repository.ReviewRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("review")
public class ReviewController {

    @Autowired
    private ReviewRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ReviewResponseDto create(@RequestBody ReviewDto data){
        Review review = new Review(data);
        repository.save(review);
        ReviewResponseDto response = new ReviewResponseDto(review);
        return response;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ReviewResponseDto> getAll(){
        List<ReviewResponseDto> reviewList = repository.findAll().stream().map(ReviewResponseDto::new).toList();
        return reviewList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/filter")
    public List<ReviewResponseDto> getByFilter(@RequestParam Optional<String> filter){
        List<ReviewResponseDto> reviewList = null;
        //usersList = service.findByFilter(filter).stream().map(UserResponseDto::new).toList();
        return reviewList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/delete")
    public ReviewResponseDto delete(@RequestBody Review data) {
        if(repository.existsById(data.getId())) {
            repository.deleteById(data.getId());
        } else {
            throw new RuntimeException("Review doesn't exist!");
        }
        ReviewResponseDto response = new ReviewResponseDto(data);
        return response;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update")
    public ReviewResponseDto update(@RequestBody Review data) {
        if(repository.existsById(data.getId())) {
            repository.save(data);
        } else {
            throw new RuntimeException("Review doesn't exist!");
        }
        ReviewResponseDto response = new ReviewResponseDto(data);
        return response;
    }
}
