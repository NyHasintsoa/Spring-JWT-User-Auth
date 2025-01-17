package com.group.exercise.project.security.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    
    private String email;

    private String password;

    private String confirmation;

    private String username;

    private String fullname;

}
