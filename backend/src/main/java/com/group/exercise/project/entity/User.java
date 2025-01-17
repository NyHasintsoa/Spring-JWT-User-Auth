package com.group.exercise.project.entity;

import java.util.Date;

import org.hibernate.annotations.NaturalId;

import com.group.exercise.project.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(length = 20, unique = true, nullable = false, updatable = false)
    private String id;

    @Column(length = 200, nullable = false, unique = true)
    private String username;

    @NaturalId
    @Column(length = 200, nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    private Roles role;

    @Column(name = "full_name", nullable = true, length = 255)
    private String fullname;

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @Column(name = "updated_at")
    private Date updatedAt = new Date();

    @Column(name = "is_enabled")
    private Boolean enabled;

    @Column(name = "is_account_non_locked")
    private Boolean accountNonLocked;

}
