package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.OrganizerRequestDto;
import com.footalentgroup.models.dtos.response.OrganizerResponseDto;

public interface OrganizerService {
    OrganizerResponseDto read(Long id);
    OrganizerResponseDto create(OrganizerRequestDto organizerDto);
    OrganizerResponseDto update(Long id, OrganizerRequestDto organizerDto);
}
