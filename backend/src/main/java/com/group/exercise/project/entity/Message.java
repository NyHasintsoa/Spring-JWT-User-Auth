package com.group.exercise.project.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "messages")
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    private String id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "from_id", nullable = false)
    private User fromId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "to_id", nullable = false)
    private User toId;

    @Column(nullable = false)
    private String content;

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @Column(name = "read_at", nullable = true)
    private Date readAt;

}
