package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.BadRequestException;
import com.footalentgroup.exceptions.ConflictException;
import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.AuthService;
import com.footalentgroup.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TokenResponseDto createUser(UserEntity user, HttpServletResponse response) {
        this.assertEmailNotExist(user.getEmail());

        UserEntity savedUser = this.userRepository.save(user);
        String token = this.jwtService.createToken(savedUser.getEmail(), savedUser.getName(), savedUser.getRole().name());
        String refreshToken= this.jwtService.refreshToken(savedUser.getEmail(), savedUser.getName(), savedUser.getRole().name());

        Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshCookie);

        return new TokenResponseDto(token);
    }

    @Override
    public TokenResponseDto login(LoginRequestDto loginDto,HttpServletResponse response ) {
        UserEntity user = userRepository.findByEmail(loginDto.getEmail()).orElse(null);

        if (user == null || !passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("");
        }

        String token = this.jwtService.createToken(user.getEmail(), user.getName(), user.getRole().name());
        String refreshToken= this.jwtService.refreshToken(user.getEmail(), user.getName(), user.getRole().name());

        Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // Establece la duración de la cookie en 7 días (en segundos), se puede ajustar
        response.addCookie(refreshCookie);

        return new TokenResponseDto(token);
    }

    private void assertEmailNotExist(String email) {
        this.userRepository
                .findByEmail(email)
                .ifPresent(user -> { throw new ConflictException("El correo ya está registrado: " + email); });
    }

}
