package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.MusicFile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public record SongUploadRequestDto(
        @NotBlank(message = "El título es obligatorio.")
        String title,

        @MusicFile(message = "El archivo de música debe ser válido (mp3, wav, flac, etc.).")
        MultipartFile audio,

        @Pattern(regexp = "^(https?://(www\\.)?spotify\\.com/.*)?$", message = "El enlace de Spotify no es válido.")
        String spotifyUrl,

        @Pattern(regexp = "^(https?://(www\\.)?youtube\\.com/.*)?$", message = "El enlace de YouTube no es válido.")
        String youtubeUrl,

        @Pattern(regexp = "^(https?://(www\\.)?soundcloud\\.com/.*)?$", message = "El enlace de SoundCloud no es válido.")
        String soundcloudUrl,

        @NotNull(message = "La fecha de lanzamiento es obligatoria.")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        Date releaseDate,

        @NotBlank(message = "El género es obligatorio.")
        String genre
) {
}
