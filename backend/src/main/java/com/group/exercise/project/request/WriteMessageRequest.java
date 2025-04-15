package com.group.exercise.project.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WriteMessageRequest {

    @NotBlank
    private String content;

    @NotBlank
    private String fromId;

}
