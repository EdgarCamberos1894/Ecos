package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.BadRequestException;
import com.footalentgroup.exceptions.ConflictException;
import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.AuthService;
import com.footalentgroup.services.JwtService;
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
    public TokenResponseDto createUser(UserEntity user) {
        this.assertEmailNotExist(user.getEmail());

        UserEntity savedUser = this.userRepository.save(user);
        String token = this.jwtService.createToken(savedUser.getEmail(), savedUser.getName(), savedUser.getRole().name());
        String refreshToken= this.jwtService.refreshToken(savedUser.getEmail(), savedUser.getName(), savedUser.getRole().name());
        return new TokenResponseDto(token, refreshToken);
    }

    @Override
    public TokenResponseDto login(LoginRequestDto loginDto) {
        UserEntity user = userRepository.findByEmail(loginDto.getEmail()).orElse(null);

        if (user == null || !passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("");
        }

        String token = this.jwtService.createToken(user.getEmail(), user.getName(), user.getRole().name());
        String refreshToken= this.jwtService.refreshToken(user.getEmail(), user.getName(), user.getRole().name());

        return new TokenResponseDto(token, refreshToken);
    }

    private void assertEmailNotExist(String email) {
        this.userRepository
                .findByEmail(email)
                .ifPresent(user -> { throw new ConflictException("El correo ya está registrado: " + email); });
    }

    public TokenResponseDto refreshToken(HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        final String authHeader= request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new BadRequestException("Header de autorización inválido");
        }
        refreshToken= authHeader.substring(7);
        email= jwtService.email(refreshToken);

        if (email == null) {
            throw new BadRequestException("Token de refresh inválido o expirado");
        }

        UserEntity user= this.userRepository.findByEmail(email)
                    .orElseThrow(()-> new UsernameNotFoundException(""));

            String accessToken= jwtService.createToken(user.getEmail(), user.getName(), user.getRole().name());

            return new TokenResponseDto(accessToken, refreshToken);

    }
}
