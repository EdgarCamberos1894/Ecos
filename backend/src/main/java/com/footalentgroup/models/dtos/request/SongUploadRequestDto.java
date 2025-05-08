package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.MusicFile;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public record SongUploadRequestDto(
        @NotBlank(message = "El título es obligatorio.")
        @Schema(description = "Título de la canción", example = "Mi Canción Favorita", required = true)
        String title,

        @MusicFile(message = "El archivo de música debe ser válido (mp3, wav, flac, etc.).")
        @Schema(description = "Archivo de audio en formato mp3, wav, etc.")
        MultipartFile audio,

        @Schema(description = "Enlace opcional a Spotify", example = "https://open.spotify.com/track/abc123")
        @Pattern(regexp = "^(https?://(www\\.)?spotify\\.com/.*)?$", message = "El enlace de Spotify no es válido.")
        String spotifyUrl,

        @Schema(description = "Enlace opcional a YouTube", example = "https://www.youtube.com/watch?v=xyz456")
        @Pattern(regexp = "^(https?://(www\\.)?youtube\\.com/.*)?$", message = "El enlace de YouTube no es válido.")
        String youtubeUrl,

        @Schema(description = "Enlace opcional a SoundCloud", example = "https://soundcloud.com/artista/cancion")
        @Pattern(regexp = "^(https?://(www\\.)?soundcloud\\.com/.*)?$", message = "El enlace de SoundCloud no es válido.")
        String soundcloudUrl,

        @Schema(description = "Fecha de lanzamiento de la canción", example = "2024-10-15")
        @NotNull(message = "La fecha de lanzamiento es obligatoria.")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        Date releaseDate,

        @Schema(description = "Género musical", example = "Reggaetón",required = true)
        @NotBlank(message = "El género es obligatorio.")
        String genre
) {
}
