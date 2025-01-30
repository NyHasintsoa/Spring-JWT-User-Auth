package com.group.exercise.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.exercise.project.request.ContactRequest;
import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.service.contact.IContactService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${api.prefix}/contact")
public class ContactController {

    @Autowired
    private IContactService contactService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendMessage(@RequestBody @Valid ContactRequest request) {
        try {
            contactService.sendMailMessage(request);
            return ResponseEntity.ok(
                    new ApiResponse("Message sended successfully",
                            request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse("Error Message", e.getMessage()));
        }
    }

}
