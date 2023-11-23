package com.opinions.repository;

import com.opinions.entities.Review;
import com.opinions.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByUser (User user);

}
