package com.footalentgroup.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.footalentgroup.models.enums.EventTicket;
import com.footalentgroup.models.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventResponseDto {
    private Long id;
    private String name;
    private String category;
    private EventType type;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private String location;
    private String description;
    private String image;
    private EventTicket ticket;
    private BigDecimal price;
    private Boolean active;
    private Long musicianId;
}
