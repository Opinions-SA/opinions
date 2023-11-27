package com.opinions;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.opinions.dto.ReviewDto;
import com.opinions.dto.ReviewResponseDto;
import com.opinions.entities.Review;
import com.opinions.entities.User;
import com.opinions.repository.ReviewRepository;
import com.opinions.service.ReviewService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ReviewTests {
    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Test
    public void testGetReview() {
        // A função getByFilter ainda não recebeu um parametro
    }

    @Test
    public void testListReviews() {
        List<Review> simulatedReviews = new ArrayList<>();

        Mockito.when(reviewRepository.findAll()).thenReturn(simulatedReviews);
        List<ReviewResponseDto> response = reviewService.getAll();

        assertEquals(simulatedReviews.size(), response.size());
    }

    @Test
    public void testCreateReview() {
        ReviewDto reviewDto = new ReviewDto();
        User user = new User();
        reviewDto.setUser(user);

        Review review = new Review(reviewDto);
        Mockito.when(reviewRepository.save(Mockito.any(Review.class))).thenReturn(review);
        reviewService.create(reviewDto);

        Mockito.verify(reviewRepository, Mockito.times(1)).save(Mockito.any(Review.class));
    }

    @Test
    public void testUpdateReview() {
        ReviewDto reviewDto = new ReviewDto();
        User user = new User();
        reviewDto.setUser(user);

        Review review = new Review(reviewDto);
        Mockito.when(reviewRepository.existsById(review.getId())).thenReturn(true);
        Mockito.when(reviewRepository.save(Mockito.any(Review.class))).thenReturn(review);
        reviewService.update(reviewDto);

        Mockito.verify(reviewRepository, Mockito.times(1)).save(Mockito.any(Review.class));
    }

    @Test
    public void testDeleteReview() {
        ReviewDto reviewDto = new ReviewDto();
        User user = new User();
        reviewDto.setUser(user);

        Review review = new Review(reviewDto);
        Mockito.when(reviewRepository.findById(review.getId())).thenReturn(Optional.of(review));
        reviewService.delete(reviewDto);

        Mockito.verify(reviewRepository, Mockito.times(1)).deleteById(review.getId());
    }
}