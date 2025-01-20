package com.group.exercise.project.security.service.auth;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.group.exercise.project.entity.User;
import com.group.exercise.project.enums.Roles;
import com.group.exercise.project.repository.UserRepository;
import com.group.exercise.project.security.jwt.JwtUtils;
import com.group.exercise.project.security.request.LoginRequest;
import com.group.exercise.project.security.request.RegisterRequest;
import com.group.exercise.project.security.response.JwtResponse;
import com.group.exercise.project.security.user.AuthUserDetails;
import com.group.exercise.project.util.GenerateId;

@Service
public class AuthService implements IAuthService {

    @Value("${entity.id.max.length}")
    private Integer MAX_LENGTH_ID;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public JwtResponse signIn(LoginRequest request) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateTokenForUser(authentication);
        AuthUserDetails userDetails = (AuthUserDetails) authentication.getPrincipal();
        return new JwtResponse(jwt, userDetails.getId());
    }

    @Override
    public JwtResponse signUp(RegisterRequest request) {
        User newUser = new User();
        newUser.setId(GenerateId.generateConstanteLengthId(request.getEmail(), MAX_LENGTH_ID));
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setUsername(request.getUsername());
        newUser.setFullname(request.getFullname());
        Set<Roles> roles = new HashSet<>();
        roles.add(Roles.ROLE_USER);
        newUser.setRoles(roles);
        newUser.setAccountNonLocked(true);
        newUser.setEnabled(true);
        userRepository.save(newUser);
        return this.signIn(new LoginRequest(request.getEmail(), request.getPassword()));
    }

}
