package com.group.exercise.project.controller;

import com.group.exercise.project.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/test")
public class TestController {

    @GetMapping("/show-test")
    public ResponseEntity<ApiResponse> testRequest(@RequestParam Integer error) {
        try {
            switch (error) {
                case 500:
                    throw new Exception("Error Server");
                case 404:
                    throw new Exception("Content Not found");
                case 403:
                    throw new Exception("Please check your email or your password !");
            }
            return ResponseEntity.ok(
                    new ApiResponse("This is test Message", "This is Data Test"));
        } catch (Exception e) {
            switch (error) {
                case 500:
                    return ResponseEntity
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ApiResponse("INTERNAL SERVER ERROR", e.getMessage()));
                case 404:
                    return ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("NOT FOUND", e.getMessage()));
                case 403:
                    return ResponseEntity
                            .status(HttpStatus.FORBIDDEN)
                            .body(new ApiResponse("FORBIDDEN", e.getMessage()));
            }
            return null;
        }
    }

}
