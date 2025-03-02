package com.group.exercise.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.group.exercise.project.request.WriteMessageRequest;
import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.security.user.AuthUserDetails;
import com.group.exercise.project.service.message.IMessageService;
import com.group.exercise.project.service.user.IUserService;

import jakarta.validation.Valid;

@RestController
public class MessageController {

    @Autowired
    private IMessageService messageService;

    @Autowired
    private IUserService userService;

    @GetMapping("${api.prefix}/messages/{userId}")
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

    @PostMapping("${api.prefix}/messages/{userId}")
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

    @MessageMapping("/send/{userId}")
    @SendTo("/chat-room/{userId}")
    public ResponseEntity<ApiResponse> sendMessage(
        @DestinationVariable String userId,
        WriteMessageRequest message
    ) {
        try {
            return ResponseEntity.ok(
                new ApiResponse(
                    "Private Message",
                    message
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

    @MessageMapping("/message")
    @SendTo("/chat-room/public")
    public ResponseEntity<ApiResponse> publicMessage(
        @Payload WriteMessageRequest request
    ) {
        try {
            return ResponseEntity.ok(
                new ApiResponse(
                    "Public Message",
                    request
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
