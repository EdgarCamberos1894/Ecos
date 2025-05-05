package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.OrganizerRequestDto;
import com.footalentgroup.services.OrganizerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(OrganizerProfileController.ORGANIZERS)
@RequiredArgsConstructor
public class OrganizerProfileController {
    public static final String ORGANIZERS = "/organizers";
    public static final String ID_ID = "/{id}";

    private final OrganizerService organizerService;

    @GetMapping(ID_ID)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.organizerService.read(id));
    }

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<?> create(@ModelAttribute @Valid OrganizerRequestDto organizerRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.organizerService.create(organizerRequestDto));
    }

    @PutMapping(path = ID_ID, consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<?> update(@PathVariable Long id, @ModelAttribute @Valid OrganizerRequestDto organizerRequestDto) {
        organizerRequestDto.doDefault();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.organizerService.update(id, organizerRequestDto));
    }
}
