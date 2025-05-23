package com.group.exercise.project.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordRequest {

    private String token;

    @NotBlank
    @Size(min = 5, message = "Password should be at least 5 characters")
    private String password;

    @NotBlank
    @Size(min = 5, message = "Password should be at least 5 characters")
    private String confirmation;

}
