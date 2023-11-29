package com.opinions.repository;

import com.opinions.entities.Review;
import com.opinions.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByUser (User user);

    @Query("SELECT r FROM Review r WHERE r.user = :user AND r.streaming_id = :streamingId AND r.streaming_type = :streamingType")
    List<Review> findByUserAndStreamingIdAndStreamingType(@Param("user") User user, @Param("streamingId") Long streamingId, @Param("streamingType") String streamingType);

    @Query("SELECT r FROM Review r WHERE r.streaming_id = :streamingId AND r.streaming_type = :streamingType")
    List<Review> findByStreamingIdAndStreamingType(@Param("streamingId") Long streamingId, @Param("streamingType") String streamingType);

}
