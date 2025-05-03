package com.footalentgroup.models.dtos.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MusicianSearchRequestDTO {

    @Schema(example = "")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$", message = "El nombre del artista solo puede contener letras y espacios")
    private String stageName;

    @Schema(example = "")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$", message = "El género musical solo puede contener letras y espacios")
    private String genre;

    @Schema(defaultValue = "0")
    @Min(value = 0, message = "La pagina no puede ser menor que 0")
    private int page;

    @Schema(defaultValue = "3")
    @Min(value = 1, message = "El tamaño debe ser mayor o igual a 1")
    private int size;

    public MusicianSearchRequestDTO() {
        this.stageName = "";
        this.genre = "";
        this.page = 0;
        this.size = 3;
    }
}


