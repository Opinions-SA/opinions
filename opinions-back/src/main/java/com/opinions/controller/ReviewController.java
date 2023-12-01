package com.opinions.controller;

import java.util.List;
import java.util.Optional;

import com.opinions.dto.ReviewStreamingResponseDto;
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
import com.opinions.service.ReviewService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("review")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ReviewResponseDto create(HttpServletRequest request, @RequestBody ReviewDto data){
        return service.create(request, data);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ReviewResponseDto> getAll(){
        return service.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/user")
    public List<ReviewStreamingResponseDto> getByUser(HttpServletRequest request, @RequestParam("streamingId") Optional<Long> streamingId, @RequestParam("streamingType") Optional<String> streamingType) {
        return service.getByUser(request, streamingId, streamingType);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/streaming")
    public List<ReviewStreamingResponseDto> getByStreaming(HttpServletRequest request, @RequestParam("streamingId") Long streamingId, @RequestParam("streamingType") String streamingType) {
        return service.getByStreaming(request, streamingId, streamingType);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/filter")
    public List<ReviewResponseDto> getByFilter(@RequestParam Optional<String> filter){
        //return servide.getByFilter(filter);
        return null;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update")
    public ReviewResponseDto update(@RequestBody ReviewDto data) {
        return service.update(data);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/delete")
    public ReviewResponseDto delete(@RequestBody ReviewDto data) {
        return service.delete(data);
    } 
}
