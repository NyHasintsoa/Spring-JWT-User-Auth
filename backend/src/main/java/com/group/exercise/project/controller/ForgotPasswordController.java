package com.group.exercise.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.security.request.ForgotPasswordRequest;
import com.group.exercise.project.security.request.UpdatePasswordRequest;
import com.group.exercise.project.security.service.forgotPassword.IForgotPasswordService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("${api.prefix}/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private IForgotPasswordService forgotPasswordService;

    @PostMapping
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        try {
            forgotPasswordService.sendMailReset(request.getEmail());
            return ResponseEntity.ok(
                    new ApiResponse(
                            "Token Sended",
                            request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(
                            "Error",
                            e.getMessage()));
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<ApiResponse> updatePassword(@RequestBody @Valid UpdatePasswordRequest request) {
        try {
            forgotPasswordService.updatePasswordByToken(request);
            return ResponseEntity.ok(
                    new ApiResponse(
                            "Password Updated successfully",
                            "Your password is updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse());
        }
    }

    @PostMapping("/check-validity")
    public ResponseEntity<ApiResponse> checkIfTokenValid(@RequestParam String token) {
        try {
            return ResponseEntity.ok(
                    new ApiResponse(
                            "Check If Token Valid",
                            forgotPasswordService.checkIfTokenValid(token)));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                            new ApiResponse(
                                    "Check If Token Valid",
                                    false));
        }
    }

}
