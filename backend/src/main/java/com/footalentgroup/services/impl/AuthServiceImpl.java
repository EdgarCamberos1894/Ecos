package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.ConflictException;
import com.footalentgroup.exceptions.BadRequestException;
import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.AuthService;
import com.footalentgroup.services.AccountTokenService;
import com.footalentgroup.services.EmailService;
import com.footalentgroup.services.FanProfileService;
import com.footalentgroup.services.JwtService;
import com.footalentgroup.services.MusicianProfileService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final MusicianProfileService musicService;
    private final FanProfileService fanService;
    private final EmailService emailService;
    private final AccountTokenService accountTokenService;

    @Override
    @Transactional
    public void createUser(UserEntity user) {
        assertEmailNotExist(user.getEmail());
        UserEntity savedUser = userRepository.save(user);

        if (Role.MUSICIAN.equals(user.getRole())) {
            musicService.createProfile(savedUser);
        }else if (Role.FAN.equals(user.getRole())) {
            fanService.createFanProfile(savedUser);
        }

        sendVerificationEmail(savedUser);
    }

    @Override
    public TokenResponseDto login(LoginRequestDto loginDto,HttpServletResponse response) {
        UserEntity user = userRepository
                .findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new BadCredentialsException(""));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("");
        }

        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new BadCredentialsException("Debes verificar tu correo antes de iniciar sesión.");
        }

        return generateToken(user, response);
    }

    @Override
    @Transactional
    public void verifyEmail(String token) {
        UserEntity user = userRepository.findByEmailVerificationTokenHash(accountTokenService.hash(token))
                .orElseThrow(() -> new BadRequestException("El enlace de verificación no es válido o ya fue utilizado."));

        if (user.getEmailVerificationExpiresAt() == null || user.getEmailVerificationExpiresAt().isBefore(Instant.now())) {
            throw new BadRequestException("El enlace de verificación venció. Solicita uno nuevo.");
        }

        user.setEmailVerified(true);
        user.setEmailVerificationTokenHash(null);
        user.setEmailVerificationExpiresAt(null);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void resendVerificationEmail(String email) {
        userRepository.findByEmail(email)
                .filter(user -> !Boolean.TRUE.equals(user.getEmailVerified()))
                .ifPresent(this::sendVerificationEmail);
    }

    @Override
    @Transactional
    public void requestPasswordReset(String email) {
        userRepository.findByEmail(email).ifPresent(this::sendPasswordResetEmail);
    }

    @Override
    @Transactional
    public void resetPassword(String token, String password) {
        UserEntity user = userRepository.findByPasswordResetTokenHash(accountTokenService.hash(token))
                .orElseThrow(() -> new BadRequestException("El enlace para restablecer la contraseña no es válido o ya fue utilizado."));

        if (user.getPasswordResetExpiresAt() == null || user.getPasswordResetExpiresAt().isBefore(Instant.now())) {
            throw new BadRequestException("El enlace para restablecer la contraseña venció. Solicita uno nuevo.");
        }

        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordResetTokenHash(null);
        user.setPasswordResetExpiresAt(null);
        userRepository.save(user);
    }

    private void assertEmailNotExist(String email) {
        this.userRepository
                .findByEmail(email)
                .ifPresent(user -> { throw new ConflictException("El correo ya está registrado: " + email); });
    }

    private TokenResponseDto generateToken(UserEntity user, HttpServletResponse response) {
        String accessToken = this.jwtService.generateAccessToken(user);
        String refreshToken = this.jwtService.generateRefreshToken(user);
        this.jwtService.setRefreshToken(response, refreshToken);

        return new TokenResponseDto(accessToken);
    }

    private void sendVerificationEmail(UserEntity user) {
        String token = accountTokenService.createToken();
        user.setEmailVerificationTokenHash(accountTokenService.hash(token));
        user.setEmailVerificationExpiresAt(Instant.now().plus(24, ChronoUnit.HOURS));
        userRepository.save(user);
        emailService.sendVerificationEmail(user, token);
    }

    private void sendPasswordResetEmail(UserEntity user) {
        String token = accountTokenService.createToken();
        user.setPasswordResetTokenHash(accountTokenService.hash(token));
        user.setPasswordResetExpiresAt(Instant.now().plus(1, ChronoUnit.HOURS));
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user, token);
    }
}
