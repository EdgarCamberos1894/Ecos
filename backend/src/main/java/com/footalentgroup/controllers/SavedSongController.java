package com.footalentgroup.controllers;


import com.footalentgroup.models.dtos.request.SongPageRequestDto;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.services.SavedSongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(SavedSongController.PATH)
@RequiredArgsConstructor
@Tag(name = "Saved Songs")
public class SavedSongController {
    public static final String  PATH = "/saved-songs";
    private final SavedSongService savedSongService;


    @GetMapping()
    @Operation(summary = "Obtiene todas las canciones guardadas de fan autenticado",
            description = "Los datos del fan se obtienen del token de autenticación.",
            security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<?> getAllSongs(@Valid @ParameterObject SongPageRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), request.getSort());
        return ResponseEntity.ok().body(savedSongService.getSavedSongsByFan(pageable));
    }

    @PostMapping("/save/{song_id}")
    @Operation(summary = "Guarda una cancion en favoritos de fan autenticado",
            description = "Los datos del fan se obtienen del token de autenticación.",
            security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<?> saveSongAsFavourite(@PathVariable Long song_id) {
        savedSongService.saveSongAsFavourite(song_id);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Canción guardada con exito"));
    }

    @DeleteMapping("/remove/{song_id}")
    @Operation(summary = "Elimina una cancion en favoritos de fan autenticado (eliminacion logica)",
            description = "Los datos del fan se obtienen del token de autenticación.",
            security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<?> deleteSongFromFavourites(@PathVariable Long song_id) {
        savedSongService.deleteSongFromFavourites(song_id);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Canción eliminada de mis canciones con exito"));
    }
}
