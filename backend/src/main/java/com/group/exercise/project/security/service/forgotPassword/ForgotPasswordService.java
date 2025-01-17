package com.group.exercise.project.security.service.forgotPassword;

import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.group.exercise.project.entity.User;
import com.group.exercise.project.repository.UserRepository;
import com.group.exercise.project.security.jwt.JwtUtils;
import com.group.exercise.project.security.request.UpdatePasswordRequest;

import jakarta.mail.internet.MimeMessage;

@Service
public class ForgotPasswordService implements IForgotPasswordService {

    @Value("${project.mail.from}")
    private String MAIL_FROM;

    @Value("${project.name.from}")
    private String NAME_FROM;

    @Value("${server.port}")
    private Integer HOST_PORT;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void sendMailReset(String email) {
        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new UsernameNotFoundException("user not found !"));
        String token = jwtUtils.generateTokenByEmail(email);
        prepareMailSend(user, token);
    }

    private void prepareMailSend(User user, String token) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeHelper = new MimeMessageHelper(mimeMessage, false);
            mimeHelper.setTo(user.getEmail());
            mimeHelper.setSubject("Reset Password Mail");
            mimeHelper.setFrom(MAIL_FROM, NAME_FROM);
            Map<String, Object> model = new HashMap<>();
            model.put("hostPort", HOST_PORT);
            model.put("token", token);
            model.put("email", user.getEmail());
            model.put("username", user.getUsername());
            String htmlBody = templateEngine.process("mailing/forgotPasswordMail", new Context(Locale.FRENCH, model));
            mimeHelper.setText(htmlBody, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updatePasswordByToken(UpdatePasswordRequest request) {
        try {
            if (jwtUtils.validateToken(request.getToken())) {
                User user = userRepository.findByEmail(jwtUtils.getEmailFromToken(request.getToken()));
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setUpdatedAt(new Date());
                userRepository.save(user);
            }
        } catch (Exception e) {
            System.out.println("#########################################");
            System.out.println("Message => " + e.getMessage());
            System.out.println("#########################################");
        }
    }

}
