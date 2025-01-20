package com.group.exercise.project.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group.exercise.project.entity.InvalidToken;

@Repository
public interface InvalidTokenRepository extends JpaRepository<InvalidToken, String> {
    
    List<InvalidToken> findByExpirationDateBefore(Date date);

    Boolean existsByToken(String Token);
    
}
