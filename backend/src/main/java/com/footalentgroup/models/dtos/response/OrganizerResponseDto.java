package com.footalentgroup.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrganizerResponseDto {
    private Long id;
    private String name;
    private String gender;
    private String country;
    private String email;
    private String whatsapp;
    private String website;
    private String description;
    private String image;
}
