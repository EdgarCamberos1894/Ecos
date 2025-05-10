package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.BannerUploadReqestDto;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.request.MusicianSearchRequestDTO;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.models.dtos.response.BannerResponseDto;
import com.footalentgroup.services.MusicianProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(MusicianProfileController.MUSICC)
@RequiredArgsConstructor
@Tag(name = "Musician Profile")
public class MusicianProfileController {

    public static final String MUSICC = "/musician-profile";

    private final MusicianProfileService musicService;

    @Operation(summary = "Obtiene perfil del músico especificado por id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.musicService.getProfilById(id)));
    }

    @Operation(summary = "Actualiza perfil del músico, solo usuario autenticado", security= @SecurityRequirement(name = "bearer-key"))
    @PutMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> update(@ModelAttribute @Valid MusicianProfileRequestDto requestDto){
        this.musicService.updateProfile(requestDto);
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>("Perfil de musico Actualizado"));
    }

    @Operation(summary = "Buscar musicos por nombre y genero (paginado)")
    @GetMapping("/search")
    public ResponseEntity<?> searchMusicians(@ParameterObject @Valid MusicianSearchRequestDTO requestDto){
        return ResponseEntity
                .ok()
                .body(this.musicService.searchMusicians(requestDto));
    }

    @Operation(summary = "Actualiza el banner del perfil del músico autenticado", security= @SecurityRequirement(name = "bearer-key"))
    @PutMapping(value = "/banner", consumes = "multipart/form-data")
    public ResponseEntity<?> updateBanner(@ModelAttribute @Valid BannerUploadReqestDto reqest){
        this.musicService.updateBanner(reqest);
        return ResponseEntity.ok().body(new ApiResponse<>("Banner actualizado con exito"));
    }

    @Operation(summary = "Obtiene el banner del perfil de un músico por su ID")
    @GetMapping("/{id}/banner")
    public ResponseEntity<BannerResponseDto> getBanner(@PathVariable Long id) {
        return ResponseEntity.ok(this.musicService.getBannerByMusicianId(id));
    }
}
