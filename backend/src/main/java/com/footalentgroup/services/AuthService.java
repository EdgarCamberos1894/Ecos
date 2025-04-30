package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthService {
    public TokenResponseDto createUser(UserEntity userDto);

    public TokenResponseDto login(LoginRequestDto loginRequestDto);

    public TokenResponseDto refreshToken(HttpServletRequest request,HttpServletResponse response) throws IOException;
}