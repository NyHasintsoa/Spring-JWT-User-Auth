package com.group.exercise.project.security.service.forgotPassword;

import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.group.exercise.project.entity.User;
import com.group.exercise.project.exception.SendMailException;
import com.group.exercise.project.repository.UserRepository;
import com.group.exercise.project.security.jwt.JwtUtils;
import com.group.exercise.project.security.request.UpdatePasswordRequest;
import com.group.exercise.project.security.service.invalidToken.IInvalidTokenService;

import jakarta.mail.internet.MimeMessage;

@Service
public class ForgotPasswordService implements IForgotPasswordService {

    @Value("${project.mail.from}")
    private String MAIL_FROM;

    @Value("${project.name.from}")
    private String NAME_FROM;

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

    @Autowired
    private IInvalidTokenService invalidTokenService;

    @Override
    public void sendMailReset(String email) {
        try {
            String token = jwtUtils.generateTokenByEmail(email);
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeHelper = new MimeMessageHelper(mimeMessage, false);
            mimeHelper.setTo(email);
            mimeHelper.setSubject("Reset Password Mail");
            mimeHelper.setFrom(MAIL_FROM, NAME_FROM);
            Map<String, Object> model = new HashMap<>();
            model.put("token", token);
            model.put("email", email);
            String htmlBody = templateEngine.process("mailing/forgotPassword", new Context(Locale.FRENCH, model));
            mimeHelper.setText(htmlBody, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new SendMailException(e.getMessage());
        }
    }

    @Override
    public Boolean checkIfTokenValid(String token) {
        if (jwtUtils.validateToken(token) && !invalidTokenService.checkIfTokenExist(token))
            return true;
        return false;
    }

    @Override
    public void updatePasswordByToken(UpdatePasswordRequest request) {
        try {
            if (checkIfTokenValid(request.getToken())) {
                User user = userRepository.findByEmail(jwtUtils.getEmailFromToken(request.getToken()));
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setUpdatedAt(new Date());
                userRepository.save(user);
                invalidTokenService.makeTokenInvalid(request.getToken());
            }
        } catch (Exception e) {
            System.out.println("#########################################");
            System.out.println("Message => " + e.getMessage());
            System.out.println("#########################################");
        }
    }

}
