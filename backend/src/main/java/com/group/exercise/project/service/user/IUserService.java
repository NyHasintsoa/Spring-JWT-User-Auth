package com.group.exercise.project.service.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.web.multipart.MultipartFile;

import com.group.exercise.project.dto.UserDto;
import com.group.exercise.project.entity.User;
import com.group.exercise.project.request.AddUserRequest;
import com.group.exercise.project.request.UpdateProfileRequest;
import com.group.exercise.project.security.user.AuthUserDetails;

public interface IUserService {

    User getUserByEmail(String email);

    User getUserById(String id);

    Page<User> getPaginatedUsers(Pageable pageable);

    PagedModel<User> getPagedUsers(Pageable pageable);

    Page<UserDto> convertPaginatedUsersToUsersDto(Page<User> userPaged);

    PagedModel<UserDto> getPagedUsersDto(Pageable pageable);

    User addUser(AddUserRequest request);

    User updateProfileUser(String userId, UpdateProfileRequest request);

    User uploadProfileImage(String userId, MultipartFile imageFile);

    List<User> getAllUsers();

    User unlockUserById(String id);

    User enableUserById(String id);

    byte[] generatePdf(User user);

    UserDto convertToDto(User user);

    List<UserDto> convertAllToDto(List<User> users);

    UserDto convertUserDetailsToDto(AuthUserDetails userDetails);

    User convertUserDetailsToUser(AuthUserDetails userDetails);

}
