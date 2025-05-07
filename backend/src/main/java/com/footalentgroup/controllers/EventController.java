package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.services.impl.EventServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(EventController.EVENTS)
@RequiredArgsConstructor
public class EventController {
    public static final String EVENTS = "/events";
    public static final String ID_ID = "/{id}";

    private final EventServiceImpl eventService;

    @GetMapping(ID_ID)
    public ResponseEntity<?> read(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.eventService.read(id));
    }

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> create(@ModelAttribute @Valid EventRequestDto eventDto) {
        eventDto.doDefault();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.eventService.create(eventDto));
    }

    @PutMapping(value = ID_ID, consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> update(@PathVariable Long id, @ModelAttribute @Valid EventRequestDto eventDto) {
        eventDto.doDefault();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.eventService.update(id, eventDto));
    }
}
