package com.group.exercise.project.dto;

import java.util.Date;
import java.util.Set;

import com.group.exercise.project.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String id;

    private String email;

    private String username;

    private Set<Roles> roles;

    private String fullname;

    private String profileImage;

    private Boolean enabled;

    private Boolean accountNonLocked;

    private Date createdAt;

    private Date updatedAt;

}
