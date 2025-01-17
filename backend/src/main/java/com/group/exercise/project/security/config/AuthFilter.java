package com.group.exercise.project.security.config;

import org.springframework.beans.factory.annotation.Value;

public class AuthFilter {

    @Value("${auth.max.attempts}")
    private Integer MAX_FAILED_ATTEMPTS;

}
