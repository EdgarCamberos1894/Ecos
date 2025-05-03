package com.footalentgroup.controllers;

import com.footalentgroup.services.OrganizerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(OrganizerProfileController.ORGANIZERS)
@RequiredArgsConstructor
public class OrganizerProfileController {
    public static final String ORGANIZERS = "/organizers";

    private final OrganizerService organizerService;
}
