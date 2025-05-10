package com.footalentgroup.controllers;


import com.footalentgroup.models.dtos.request.FanProfileRequestDto;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.services.FanProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(FanProfileController.FAN)
@RequiredArgsConstructor
@Tag(name = "Fan Profile")
public class FanProfileController {
    public static final String FAN = "/fan-profile";
    private final FanProfileService fanProfileService;

    @Operation(summary = "Obtiene perfil del fan especificado por id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getFanProfileById(@PathVariable Long id){
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.fanProfileService.getFanProfileById(id)));
    }

    @Operation(summary = "Actualiza perfil del fan, solo usuario autenticado", security= @SecurityRequirement(name = "bearer-key"))
    @PutMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> updateFanProfile(@ModelAttribute @Valid FanProfileRequestDto requestDto){
        this.fanProfileService.updateFanProfile(requestDto);
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>("Perfil de fan actualizado correctamente"));
    }
}
