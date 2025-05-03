package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.ImageFile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.web.multipart.MultipartFile;

public record MusicianProfileRequestDto(

        @NotBlank(message = "El nombre de artista/banda no puede estar vacío")
        String stageName,

        @ImageFile
        MultipartFile photo,

        boolean deletePhoto,

        @NotBlank(message = "El genero no debe estar vacio")
        String genre,

        @NotBlank(message = "El paíz no debe estar vacio")
        String country,

        String whatsapp,

        @Pattern(regexp = "^(https?://)?(www\\.)?spotify\\.com/.*$", message = "Debe ser una URL válida de Spotify")
        String spotifyUrl,

        @Pattern(regexp = "^(https?://)?(www\\.)?youtube\\.com/.*$", message = "Debe ser una URL válida de YouTube")
        String youtubeUrl,

        @Pattern(regexp = "^(https?://)?(www\\.)?instagram\\.com/.*$", message = "Debe ser una URL válida de Instagram")
        String instagramUrl,

        @Pattern(regexp = "^(https?://)?(www\\.)?tiktok\\.com/.*$", message = "Debe ser una URL válida de TikTok")
        String tiktokUrl
) {
}
