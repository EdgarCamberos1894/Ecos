package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.OrganizerRequestDto;
import com.footalentgroup.services.OrganizerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(OrganizerProfileController.ORGANIZERS)
@RequiredArgsConstructor
public class OrganizerProfileController {
    public static final String ORGANIZERS = "/organizers";

    private final OrganizerService organizerService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> create(@ModelAttribute @Valid OrganizerRequestDto organizerRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.organizerService.create(organizerRequestDto));
    }
}
