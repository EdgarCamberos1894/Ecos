package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.models.dtos.response.EventResponseDto;

public interface EventService {
    EventResponseDto read(Long id);
    EventResponseDto create(EventRequestDto eventDto);
    EventResponseDto update(Long id, EventRequestDto eventDto);
}
