package com.group.exercise.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.security.request.ForgotPasswordRequest;
import com.group.exercise.project.security.request.UpdatePasswordRequest;
import com.group.exercise.project.security.service.forgotPassword.IForgotPasswordService;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("${api.prefix}/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private IForgotPasswordService forgotPasswordService;

    @PostMapping()
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            forgotPasswordService.sendMailReset(request.getEmail());
            return ResponseEntity.ok(
                    new ApiResponse(
                            "Token Sended",
                            request));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<ApiResponse> updatePassword(@RequestBody UpdatePasswordRequest request) {
        try {
            forgotPasswordService.updatePasswordByToken(request);
            return ResponseEntity.ok(
                    new ApiResponse());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse());
        }
    }

}
