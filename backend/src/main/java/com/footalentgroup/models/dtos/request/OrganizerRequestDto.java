package com.footalentgroup.models.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
public class OrganizerRequestDto {

    @NotBlank(message = "El nombre no puede estar vacío.")
    private String name;

    @NotBlank(message = "El género no puede estar vacío.")
    private String gender;

    @NotBlank(message = "El país no puede estar vacío.")
    private String country;

    private String whatsapp;

    private String website;

    private String description;

    private MultipartFile image;

    private Boolean deletedImage;

    public void doDefault() {
        if (Objects.isNull(deletedImage)) {
            this.deletedImage = false;
        }
    }
}
