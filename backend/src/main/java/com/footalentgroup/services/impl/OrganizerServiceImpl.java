package com.footalentgroup.services.impl;

import com.footalentgroup.repositories.OrganizerUserRepository;
import com.footalentgroup.services.OrganizerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizerServiceImpl implements OrganizerService {
    private final OrganizerUserRepository organizerUserRepository;
}
