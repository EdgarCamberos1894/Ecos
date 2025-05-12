package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.models.entities.MusicianFollowsEntity;
import com.footalentgroup.services.MusicianFollowsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Favoritos")
@RequestMapping(MusicianFollowsController.FOLLOWS)
public class MusicianFollowsController {
    public static final String FOLLOWS = "/follows";
    private final MusicianFollowsService musicianFollowsService;

    @PreAuthorize("hasRole('FAN')")
    @Operation(summary = "Obtiene los musicos seguidos de un fan autenticado", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping("/fan")
    public ResponseEntity<?> getFollowedMusicians() {
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.musicianFollowsService.getFollowMusicians()));
    }

    @PreAuthorize("hasRole('MUSICIAN')")
    @Operation(summary = "Obtiene los fans que siguen a un músico autenticado", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping("/musician")
    public ResponseEntity<?> getFansOfMusician() {
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.musicianFollowsService.getFansByMusician()));
    }

    @PreAuthorize("hasRole('FAN')")
    @Operation(summary = "Elimina un músico de los favoritos del fan autenticado", security = @SecurityRequirement(name = "bearer-key"))
    @PostMapping("/follow-musician/{musicianId}")
    public ResponseEntity<?> addMusicianToFavorites( @PathVariable Long musicianId) {
        this.musicianFollowsService.addMusicianToFavorites(musicianId);
        return ResponseEntity.ok().body(new ApiResponse<>("Se agrego el musico correctamente a favoritos"));
    }

    // Endpoint para eliminar un músico de los favoritos de un fan
    @PreAuthorize("hasRole('FAN')")
    @Operation(summary = "Elimina musico de favoritos de fan autenticado", security = @SecurityRequirement(name = "bearer-key"))
    @DeleteMapping("/unfollow-musician/{musicianId}")
    public  ResponseEntity<?> removeMusicianFromFavorites(@PathVariable Long musicianId) {
        this.musicianFollowsService.removeMusicianFromFavorites(musicianId);
        return ResponseEntity.ok().body(new ApiResponse<>("Se elimino el musico correctamente a favoritos"));
    }
}
