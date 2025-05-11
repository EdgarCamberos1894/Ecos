package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.models.entities.MusicianFollowsEntity;
import com.footalentgroup.services.MusicianFollowsService;
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
    @GetMapping("/fan/{fanId}")
    public ResponseEntity<?> getFollowedMusicians(@PathVariable Long fanId) {
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.musicianFollowsService.getFollowMusicians(fanId)));
    }

    @PreAuthorize("hasRole('MUSICIAN')")
    @GetMapping("/musician/{musicianId}")
    public ResponseEntity<?> getFansOfMusician(@PathVariable Long musicianId) {
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.musicianFollowsService.getFansByMusician(musicianId)));
    }

    @PreAuthorize("hasRole('FAN')")
    @PostMapping("/fan/{fanId}/musician/{musicianId}")
    public ResponseEntity<?> addMusicianToFavorites(@PathVariable Long fanId, @PathVariable Long musicianId) {
        this.musicianFollowsService.addMusicianToFavorites(fanId, musicianId);
        return ResponseEntity.ok().body(new ApiResponse<>("Se agrego el musico correctamente a favoritos"));
    }

    // Endpoint para eliminar un músico de los favoritos de un fan
    @PreAuthorize("hasRole('FAN')")
    @DeleteMapping("/fan/{fanId}/musician/{musicianId}")
    public  ResponseEntity<?> removeMusicianFromFavorites(@PathVariable Long fanId, @PathVariable Long musicianId) {
        this.musicianFollowsService.removeMusicianFromFavorites(fanId, musicianId);
        return ResponseEntity.ok().body(new ApiResponse<>("Se elimino el musico correctamente a favoritos"));
    }
}
