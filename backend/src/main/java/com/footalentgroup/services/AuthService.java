package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    TokenResponseDto createUser(UserEntity userDto, HttpServletResponse response);
    TokenResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response);
}