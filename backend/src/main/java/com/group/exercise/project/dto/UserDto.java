package com.group.exercise.project.dto;

import java.util.Date;

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

    private Roles role;

    private String fullname;

    private Boolean enabled;

    private Boolean accountNonLocked;

    private Date createdAt;

    private Date updatedAt;

}
