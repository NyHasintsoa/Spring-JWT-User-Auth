package com.group.exercise.project.service.user;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.group.exercise.project.dto.UserDto;
import com.group.exercise.project.entity.User;
import com.group.exercise.project.repository.UserRepository;
import com.group.exercise.project.request.AddUserRequest;
import com.group.exercise.project.request.UpdateProfileRequest;
import com.group.exercise.project.security.user.AuthUserDetails;
import com.group.exercise.project.util.GenerateId;
import com.itextpdf.html2pdf.HtmlConverter;

import jakarta.mail.internet.MimeMessage;

@Service
public class UserService implements IUserService {

    @Value("${entity.id.max.length}")
    private Integer MAX_LENGTH_ID;

    @Value("${project.mail.from}")
    private String MAIL_FROM;

    @Value("${project.name.from}")
    private String NAME_FROM;

    @Value("${profile.image.upload.path}")
    private String UPLOAD_DIR;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

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
    public User addUser(AddUserRequest request) {
        User user = new User();
        user.setId(GenerateId.generateConstanteLengthId(request.getEmail(), MAX_LENGTH_ID));
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setRoles(request.getRoles());
        String password = GenerateId.generateConstanteLengthId(request.getFullname(), 10);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullname(request.getFullname());
        user.setAccountNonLocked(true);
        user.setEnabled(true);
        sendMailUserAdded(user, password);
        return userRepository.save(user);
    }

    private void sendMailUserAdded(User user, String password) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeHelper = new MimeMessageHelper(mimeMessage, false);
            mimeHelper.setTo(user.getEmail());
            mimeHelper.setSubject("User's Password");
            mimeHelper.setFrom(MAIL_FROM, NAME_FROM);
            Map<String, Object> model = new HashMap<>();
            model.put("email", user.getEmail());
            model.put("username", user.getUsername());
            model.put("fullname", user.getFullname());
            model.put("password", password);
            String htmlBody = templateEngine.process("mailing/sendPassword", new Context(Locale.FRENCH, model));
            mimeHelper.setText(htmlBody, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public User updateProfileUser(String userId, UpdateProfileRequest request) {
        User user = getUserById(userId);
        user.setFullname(request.getFullname());
        user.setUsername(request.getUsername());
        user.setUpdatedAt(new Date());
        return userRepository.save(user);
    }

    @Override
    public User uploadProfileImage(String userId, MultipartFile imageFile) {
        Date uploadedAt = new Date();
        User user = getUserById(userId);
        String storageFileName = imageFile.getOriginalFilename();
        String pathAbsolute = UPLOAD_DIR + uploadedAt.getTime() + "/";
        Path uploadPath = Paths.get(pathAbsolute);
        try {
            if (user.getProfileImage() != null) {
                Path fileDelete = Paths.get(UPLOAD_DIR + user.getProfileImage());
                if (Files.exists(fileDelete)) {
                    Files.delete(fileDelete);
                    if (Files.list(fileDelete.getParent()).count() == 0)
                        Files.delete(fileDelete.getParent());
                }
            }
            if (!Files.exists(uploadPath))
                Files.createDirectories(uploadPath);
            InputStream inputStream = imageFile.getInputStream();
            Files.copy(
                    inputStream,
                    Paths.get(pathAbsolute + storageFileName),
                    StandardCopyOption.REPLACE_EXISTING);
            user.setProfileImage(uploadedAt.getTime() + "/" + storageFileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        user.setUpdatedAt(uploadedAt);
        return userRepository.save(user);
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
                user.getRoles(),
                user.getFullname(),
                user.getProfileImage(),
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
                userDetails.getUserProfile(),
                userDetails.getRoles(),
                userDetails.getFullname(),
                userDetails.getProfileImage(),
                userDetails.isEnabled(),
                userDetails.getAccountNonLocked(),
                userDetails.getCreatedAt(),
                userDetails.getUpdatedAt());
    }

}
