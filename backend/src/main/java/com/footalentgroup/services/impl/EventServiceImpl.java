package com.footalentgroup.services.impl;

import com.footalentgroup.repositories.EventRepository;
import com.footalentgroup.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
}
