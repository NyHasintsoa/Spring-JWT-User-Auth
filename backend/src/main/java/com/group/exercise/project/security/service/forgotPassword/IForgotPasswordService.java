package com.group.exercise.project.security.service.forgotPassword;

import com.group.exercise.project.security.request.UpdatePasswordRequest;

public interface IForgotPasswordService {

    void sendMailReset(String email);

    void updatePasswordByToken(UpdatePasswordRequest request);

}
