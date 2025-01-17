package com.group.exercise.project.security.service.auth;

import com.group.exercise.project.security.request.LoginRequest;
import com.group.exercise.project.security.request.RegisterRequest;
import com.group.exercise.project.security.response.JwtResponse;

public interface IAuthService {

    JwtResponse signIn(LoginRequest request);

    JwtResponse signUp(RegisterRequest request);

}
