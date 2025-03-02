package com.group.exercise.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.exercise.project.entity.Message;

public interface MessageRepository extends JpaRepository<Message, String> {
}
