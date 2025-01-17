package com.group.exercise.project.service.user;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.group.exercise.project.dto.UserDto;
import com.group.exercise.project.entity.User;
import com.group.exercise.project.repository.UserRepository;
import com.group.exercise.project.security.user.AuthUserDetails;
import com.itextpdf.html2pdf.HtmlConverter;

@Service
public class UserService implements IUserService {

    @Value("${server.port}")
    private Integer HOST_PORT;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User unlockUserById(String id) {
        User user = getUserById(id);
        if (!user.getAccountNonLocked()) {
            user.setAccountNonLocked(true);
        }
        return userRepository.save(user);
    }

    @Override
    public User enableUserById(String id) {
        User user = getUserById(id);
        if (!user.getEnabled()) {
            user.setEnabled(true);
        }
        return userRepository.save(user);
    }

    @Override
    public byte[] generatePdf(User user) {
        Map<String, Object> model = new HashMap<>();
        model.put("hostPort", HOST_PORT);
        model.put("email", user.getEmail());
        model.put("username", user.getUsername());
        String htmlBody = templateEngine.process("pdf/userInfo", new Context(Locale.FRENCH, model));
        ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
        try {
            HtmlConverter.convertToPdf(htmlBody, arrayOutputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arrayOutputStream.toByteArray();
    }

    @Override
    public UserDto convertToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.getFullname(),
                user.getEnabled(),
                user.getAccountNonLocked(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }

    @Override
    public List<UserDto> convertAllToDto(List<User> users) {
        return users.stream().map(this::convertToDto).toList();
    }

    @Override
    public UserDto convertUserDetailsToDto(AuthUserDetails userDetails) {
        return new UserDto(
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getUsername(),
                userDetails.getRole(),
                userDetails.getEmail(),
                userDetails.isEnabled(),
                userDetails.getAccountNonLocked(),
                null,
                null);
    }

}
