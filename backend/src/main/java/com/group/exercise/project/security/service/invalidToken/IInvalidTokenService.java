package com.group.exercise.project.security.service.invalidToken;

import java.util.Date;
import java.util.List;

import com.group.exercise.project.entity.InvalidToken;

public interface IInvalidTokenService {
    
    void deleteAllExpiredTokens();

    Boolean checkIfTokenExist(String token);

    InvalidToken makeTokenInvalid(String token);

    List<InvalidToken> getAllInalidTokensBefore(Date date);

}
