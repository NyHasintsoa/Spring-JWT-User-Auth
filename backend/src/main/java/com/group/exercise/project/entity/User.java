package com.group.exercise.project.entity;

import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import com.group.exercise.project.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
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
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Roles> roles;

    @Column(name = "full_name", nullable = true, length = 255)
    private String fullname;

    @Column(name = "profile_image", nullable = true)
    private String profileImage;

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @Column(name = "updated_at")
    private Date updatedAt = new Date();

    @Column(name = "is_enabled")
    private Boolean enabled;

    @Column(name = "is_account_non_locked")
    private Boolean accountNonLocked;

}
