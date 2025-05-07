package com.footalentgroup.models.dtos.request;

import com.footalentgroup.models.enums.EventTicket;
import com.footalentgroup.models.enums.EventType;
import com.footalentgroup.validators.ImageFile;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
public class EventRequestDto {

    @NotBlank(message = "El nombre del evento no puede estar vacío.")
    private String name;

    @NotBlank(message = "La categoría del evento no puede estar vacía.")
    private String category;

    @NotNull(message = "El tipo de evento es obligatorio.")
    private EventType type;

    @NotBlank(message = "La fecha del evento es obligatoria.")
    private String dateString;  // Stores the raw date string from the request
    private LocalDate date;     // Stores the parsed and validated LocalDate object

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @NotNull(message = "La hora de inicio es obligatoria.")
    private LocalTime startTime;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @NotNull(message = "La hora de finalización es obligatoria.")
    private LocalTime endTime;

    @NotBlank(message = "La ubicación del evento no puede estar vacía.")
    private String location;

    @NotBlank(message = "La descripción del evento no puede estar vacía.")
    private String description;

    @ImageFile
    private MultipartFile image;

    private Boolean deleteImage;

    private EventTicket ticket;

    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a cero.")
    private BigDecimal price;

    private Boolean active;

    @NotNull(message = "El ID del músico es obligatorio.")
    private Long musicianId;

    public void doDefault() {
        if (dateString != null && !dateString.isEmpty()) {
            date = LocalDate.parse(dateString, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        }

        if (Objects.isNull(deleteImage)) {
            deleteImage = false;
        }

        if (Objects.isNull(ticket)) {
            ticket = EventTicket.FreeEvent;
        }

        if (Objects.isNull(price)) {
            price = BigDecimal.ZERO;
        }
    }
}
