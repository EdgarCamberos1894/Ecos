package com.footalentgroup.controllers;


import com.footalentgroup.models.dtos.request.SongPageRequestDto;
import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.services.SongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(SongController.SONG)
@RequiredArgsConstructor
@Tag(name = "Musica")
public class SongController {

    public static final String SONG = "/songs";

    private final SongService songService;

    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary = "Sube una nueva canción (requiere autenticación)", security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<?> uploadSong(@ModelAttribute @Valid SongUploadRequestDto request) {
        songService.uploadSong(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Canción subida con exito"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtiene una canción por su ID")
    public ResponseEntity<?> getSongById(@PathVariable Long id) {
        return ResponseEntity.ok().body(songService.getSongById(id));
    }

    @GetMapping
    @Operation(summary = "Obtiene todas las canciones")
    public ResponseEntity<?> getAllSongs(@Valid @ParameterObject SongPageRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), request.getSort());
        return ResponseEntity.ok().body(songService.getAllSongs(pageable));
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    @Operation(summary = "Actualiza una canción por ID (requiere autenticación, solo el autor puede editar)", security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<?> updateSong(@PathVariable Long id, @ModelAttribute @Valid SongUploadRequestDto request) {
        songService.updateSong(id,request);
        return ResponseEntity.ok().body(new ApiResponse<>("Los datos de la canción se han atualizado"));
    }

//    ¿Se implementara borrado logico o fisico?
//    @DeleteMapping("/{id}")
//    @Operation(summary = "Elimina una canción por ID (requiere autenticación)", security = @SecurityRequirement(name = "bearer-key"))
//    public ResponseEntity<?> deleteSong(@PathVariable Long id) {
//        return ResponseEntity.ok("Canción eliminada");
//    }
}
