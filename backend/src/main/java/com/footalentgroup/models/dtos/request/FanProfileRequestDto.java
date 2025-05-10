package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.ImageFile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record FanProfileRequestDto (
        @ImageFile
        MultipartFile photo,

        boolean deletePhoto,

        @NotBlank(message = "El paíz no debe estar vacio")
        String country,

        @Size(min = 1, message = "Debe seleccionar al menos un género de interés")
        List<@NotBlank(message = "El género no puede estar vacío") String> genreInterest
        )
{
}
