package com.footalentgroup.models.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
public class TicketRequestDto {

    @NotBlank(message = "La ubicación de la entrada es obligatoria.")
    private String location;

    private BigDecimal price;

    public void doDefault() {
        if (Objects.isNull(price) || price.compareTo(BigDecimal.ZERO) < 0) {
            price = BigDecimal.ZERO;
        }
    }
}
