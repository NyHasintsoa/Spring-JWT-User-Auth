package com.group.exercise.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.security.request.LoginRequest;
import com.group.exercise.project.security.request.RegisterRequest;
import com.group.exercise.project.security.service.auth.IAuthService;

@RestController
@RequestMapping("${api.prefix}/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signUp(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(
                    new ApiResponse("Sign up Request", authService.signUp(request)));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> signIn(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(
                    new ApiResponse("Sign in Request", authService.signIn(request)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new ApiResponse("FORBIDDEN", e.getMessage()));
        }
    }

}
