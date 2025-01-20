package com.group.exercise.project.request;

import java.util.Set;

import com.group.exercise.project.enums.Roles;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddUserRequest {
    
    @Email
    private String email;

    private String username;

    private String fullname;

    @NotEmpty
    private Set<Roles> roles;

}
