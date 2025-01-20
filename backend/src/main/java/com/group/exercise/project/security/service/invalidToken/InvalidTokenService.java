package com.group.exercise.project.security.service.invalidToken;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.group.exercise.project.entity.InvalidToken;
import com.group.exercise.project.repository.InvalidTokenRepository;
import com.group.exercise.project.util.GenerateId;

@Service
public class InvalidTokenService implements IInvalidTokenService {

    @Value("${entity.id.max.length}")
    private Integer MAX_LENGTH;

    @Value("${jwt.token.expiration}")
    private Long TOKEN_EXPIRATION;

    @Autowired
    private InvalidTokenRepository invalidTokenRepository;

    /**
     * Delete Invalide Tokens that expired
     */
    @Override
    @Scheduled(fixedRate = 3600000)
    public void deleteAllExpiredTokens() {
        List<String> invalidTokenId = invalidTokenRepository.findByExpirationDateBefore(new Date()).stream().map(
            (item) -> item.getId()
        ).toList();
        invalidTokenRepository.deleteAllById(invalidTokenId);
    }

    @Override
    public Boolean checkIfTokenExist(String token) {
        return invalidTokenRepository.existsByToken(token);
    }

    @Override
    public InvalidToken makeTokenInvalid(String token) {
        return invalidTokenRepository.save(
            new InvalidToken(
                GenerateId.generateConstanteLengthId(token, MAX_LENGTH),
                token,
                new Date(new Date().getTime() + TOKEN_EXPIRATION)
            )
        );
    }

    @Override
    public List<InvalidToken> getAllInalidTokensBefore(Date date) {
        return invalidTokenRepository.findByExpirationDateBefore(date);
    }

}
