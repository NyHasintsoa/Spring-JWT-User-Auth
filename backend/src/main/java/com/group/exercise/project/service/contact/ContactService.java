package com.group.exercise.project.service.contact;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.group.exercise.project.request.ContactRequest;

import jakarta.mail.internet.MimeMessage;

@Service
public class ContactService implements IContactService {

    @Value("${project.mail.from}")
    private String MAIL_FROM;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Override
    public void sendMailMessage(ContactRequest request) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeHelper = new MimeMessageHelper(mimeMessage, false);
            mimeHelper.setTo(MAIL_FROM);
            mimeHelper.setSubject("Contact Message");
            mimeHelper.setFrom(request.getEmail(), request.getName());
            Map<String, Object> model = new HashMap<>();
            model.put("email", request.getEmail());
            model.put("name", request.getName());
            model.put("message", request.getMessage());
            String htmlBody = templateEngine.process("contact/send", new Context(Locale.FRENCH, model));
            mimeHelper.setText(htmlBody, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
