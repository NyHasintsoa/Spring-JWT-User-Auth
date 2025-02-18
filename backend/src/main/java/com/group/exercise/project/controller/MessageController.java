package com.group.exercise.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.exercise.project.request.WriteMessageRequest;
import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.security.user.AuthUserDetails;
import com.group.exercise.project.service.message.IMessageService;
import com.group.exercise.project.service.user.IUserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("${api.prefix}/messages")
public class MessageController {

    @Autowired
    private IMessageService messageService;

    @Autowired
    private IUserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getMessageFromTo(@PathVariable String userId) {
        try {
            AuthUserDetails userConnected = (AuthUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
            return ResponseEntity.ok(
                new ApiResponse(
                    "Messages With to users => ",
                    messageService.getConversationsFromToId(userConnected.getId(), userId)
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(
                    "INTERNAL_SERVER_ERROR",
                    e.getMessage()
                )
            );
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse> writeMessage(
        @PathVariable String userId,
        @RequestBody @Valid WriteMessageRequest request
    ) {
        try {
            AuthUserDetails userConnected = (AuthUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
            return ResponseEntity.ok(
                new ApiResponse(
                    "Message Writen successfully",
                    messageService.writeMessageFromIdToId(
                        userService.convertUserDetailsToUser(userConnected),
                        userId,
                        request
                    )
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse(
                    "INTERNAL_SERVER_ERROR",
                    e.getMessage()
                )
            );
        }
    }

}
