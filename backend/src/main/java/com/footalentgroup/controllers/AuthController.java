package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.request.EmailRequestDto;
import com.footalentgroup.models.dtos.request.PasswordResetRequestDto;
import com.footalentgroup.models.dtos.request.TokenRequestDto;
import com.footalentgroup.models.dtos.request.UserRequestDto;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AuthController.AUTH)
@RequiredArgsConstructor
@Tag(name = "Autenticación")
public class AuthController {
    public static final String AUTH = "/auth";
    public static final String LOGIN = "/login";

    private final AuthService authService;

    @Operation(summary = "Registro de usuario")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody UserRequestDto userDto) {
        this.authService.createUser(userDto.toEntity());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Revisa tu correo para verificar tu cuenta."));
    }

    @Operation(summary = "Inicio de sesión")
    @PostMapping(LOGIN)
    public ResponseEntity<TokenResponseDto> login(@Valid @RequestBody LoginRequestDto loginDto, HttpServletResponse response) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.authService.login(loginDto, response));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody TokenRequestDto request) {
        this.authService.verifyEmail(request.getToken());
        return ResponseEntity.ok(new ApiResponse<>("Tu correo fue verificado. Ya puedes iniciar sesión."));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse<Void>> resendVerificationEmail(@Valid @RequestBody EmailRequestDto request) {
        this.authService.resendVerificationEmail(request.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("Si la cuenta existe y está pendiente de verificación, enviamos un nuevo correo."));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody EmailRequestDto request) {
        this.authService.requestPasswordReset(request.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("Si existe una cuenta con ese correo, recibirás instrucciones para restablecer la contraseña."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody PasswordResetRequestDto request) {
        this.authService.resetPassword(request.getToken(), request.getPassword());
        return ResponseEntity.ok(new ApiResponse<>("Tu contraseña fue actualizada. Ya puedes iniciar sesión."));
    }
}
