package com.group.exercise.project.service.user;

import java.util.List;

import com.group.exercise.project.dto.UserDto;
import com.group.exercise.project.entity.User;
import com.group.exercise.project.security.user.AuthUserDetails;

public interface IUserService {

    User getUserByEmail(String email);

    User getUserById(String id);

    List<User> getAllUsers();

    User unlockUserById(String id);

    User enableUserById(String id);

    byte[] generatePdf(User user);

    UserDto convertToDto(User user);

    List<UserDto> convertAllToDto(List<User> users);

    UserDto convertUserDetailsToDto(AuthUserDetails userDetails);

}
