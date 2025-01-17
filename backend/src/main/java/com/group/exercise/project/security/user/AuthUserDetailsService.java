package com.group.exercise.project.security.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.group.exercise.project.entity.User;
import com.group.exercise.project.repository.UserRepository;

@Service
public class AuthUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = Optional
        .ofNullable(userRepository.findByEmail(username))
        .orElseThrow(() -> new UsernameNotFoundException("User not found !"));
        return AuthUserDetails.buildDetails(user);
    }
    
}
