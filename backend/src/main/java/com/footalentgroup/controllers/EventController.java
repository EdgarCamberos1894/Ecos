package com.footalentgroup.controllers;

import com.footalentgroup.services.impl.EventServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(EventController.EVENTS)
@RequiredArgsConstructor
public class EventController {
    public static final String EVENTS = "/events";

    private final EventServiceImpl eventService;
}
