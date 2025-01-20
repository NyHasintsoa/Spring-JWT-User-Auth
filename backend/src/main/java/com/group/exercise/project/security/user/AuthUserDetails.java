package com.group.exercise.project.security.user;

import java.util.Collection;
import java.util.Date;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.group.exercise.project.entity.User;
import com.group.exercise.project.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthUserDetails implements UserDetails {

    private String id;

    private String email;

    private String password;

    private String profileImage;

    private Set<Roles> roles;

    private Boolean enabled;

    private Boolean accountNonLocked;

    private Date createdAt;

    private Date updatedAt;

    public static AuthUserDetails buildDetails(User user) {
        return new AuthUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getProfileImage(),
                user.getRoles(),
                user.getEnabled(),
                user.getAccountNonLocked(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

}
