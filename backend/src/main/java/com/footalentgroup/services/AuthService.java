package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void createUser(UserEntity userDto);
    TokenResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response);
    void verifyEmail(String token);
    void resendVerificationEmail(String email);
    void requestPasswordReset(String email);
    void resetPassword(String token, String password);
}
