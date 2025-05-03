package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.OrganizerRequestDto;
import com.footalentgroup.models.dtos.response.OrganizerResponseDto;

public interface OrganizerService {
    OrganizerResponseDto create(OrganizerRequestDto organizerDto);
}
