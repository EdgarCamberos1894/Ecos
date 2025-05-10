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
    public static final String SEARCH = "/search";
    public static final String ID_MUSICIAN = "/musician/{musicianId}";

    private final EventServiceImpl eventService;

    @GetMapping(ID_ID)
    public ResponseEntity<?> read(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.eventService.read(id));
    }

    @GetMapping(SEARCH)
    public ResponseEntity<?> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.eventService.search(page, size));
    }

    @GetMapping(ID_MUSICIAN)
    public ResponseEntity<?> searchByMusician(
            @PathVariable Long musicianId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.eventService.searchByMusician(musicianId, page, size));
    }

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> create(@ModelAttribute @Valid EventRequestDto eventDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.eventService.create(eventDto));
    }

    @PutMapping(value = ID_ID, consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> update(@PathVariable Long id, @ModelAttribute @Valid EventRequestDto eventDto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.eventService.update(id, eventDto));
    }
}
