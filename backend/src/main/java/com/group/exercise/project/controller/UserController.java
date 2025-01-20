package com.group.exercise.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.group.exercise.project.dto.UserDto;
import com.group.exercise.project.request.AddUserRequest;
import com.group.exercise.project.response.ApiResponse;
import com.group.exercise.project.security.request.ForgotPasswordRequest;
import com.group.exercise.project.security.user.AuthUserDetails;
import com.group.exercise.project.service.user.IUserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("${api.prefix}/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            return ResponseEntity.ok(
                    new ApiResponse(
                            "All users",
                            userService.convertAllToDto(userService.getAllUsers())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse("500", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(
                new ApiResponse(
                    "User By Id => " + id,
                    userService.convertToDto(userService.getUserById(id))));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiResponse("404", e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addUser(@RequestBody @Valid AddUserRequest request) {
        try {
            return ResponseEntity.ok(
                new ApiResponse(
                    "User Added successfully",
                    userService.convertToDto(
                        userService.addUser(request)))
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiResponse("500", e.getMessage()));
        }
    }
    
    @PostMapping("/profile/upload")
    public ResponseEntity<ApiResponse> uploadProfileImage(@RequestParam MultipartFile profileFile) {
        try {
            AuthUserDetails userConnected = (AuthUserDetails) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();
            UserDto userDto = userService.convertToDto(
                userService.uploadProfileImage(userConnected.getId(), profileFile)
            );
            return ResponseEntity.ok(
                new ApiResponse(
                    "Profile Image upload => ",
                    userDto
                )
            );
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                    new ApiResponse(
                        "INTERNAL_SERVER_ERROR",
                        e.getMessage()
                    )
                );
        }
    }
    

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> showConnecteduser() {
        try {
            AuthUserDetails userConnected = (AuthUserDetails) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();
            return ResponseEntity.ok(
                    new ApiResponse("User'Informations",
                            userService.convertUserDetailsToDto(userConnected)));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            new ApiResponse("500", "INTERNAL_SERVER_ERROR"));
        }
    }

    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody @Valid ForgotPasswordRequest request) {
        try {
            byte[] pdfBytes = userService.generatePdf(userService.getUserByEmail(request.getEmail()));
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/pdf");
            headers.add("Content-Disposition", "attachment; filename=document.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
