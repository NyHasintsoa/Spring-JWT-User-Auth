package com.group.exercise.project.request;

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
public class ContactRequest {

    @NotBlank
    @Size(min = 5, message = "name should be at least 5 characters")
    private String name;

    @NotBlank
    @Size(min = 5, message = "email should be at least 5 characters")
    private String email;

    @NotBlank
    @Size(min = 5, message = "message should be at least 5 characters")
    private String message;

}
