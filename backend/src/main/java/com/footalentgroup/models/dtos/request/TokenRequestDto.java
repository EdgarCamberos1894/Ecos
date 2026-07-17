package com.footalentgroup.models.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TokenRequestDto {
    @NotBlank(message = "El token es obligatorio.")
    private String token;
}
