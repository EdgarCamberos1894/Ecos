package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.ForbiddenException;
import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.mapper.OrganizerMapper;
import com.footalentgroup.models.dtos.request.OrganizerRequestDto;
import com.footalentgroup.models.dtos.response.OrganizerResponseDto;
import com.footalentgroup.models.entities.OrganizerUserEntity;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import com.footalentgroup.repositories.OrganizerUserRepository;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.OrganizerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class OrganizerServiceImpl implements OrganizerService {
    private final UserRepository userRepository;
    private final OrganizerUserRepository organizerRepository;
    private final AuthenticatedUserService authenticatedUserService;
    private final CloudinaryService cloudinaryService;
    private final OrganizerMapper organizerMapper;

    @Override
    @Transactional
    public OrganizerResponseDto create(OrganizerRequestDto organizerDto) {
        OrganizerUserEntity organizer = this.organizerMapper.toEntity(organizerDto);
        organizer.setUser(getRequestUser());
        organizer.setImage(saveImage(organizerDto.getImage()));

        return this.organizerMapper.toResponse(this.organizerRepository.save(organizer));
    }

    private UserEntity getRequestUser() {
        String email = this.authenticatedUserService.getAuthenticatedUsername();

        UserEntity user = this.userRepository
                .findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Organizador no encontrado: " + email));

        if (!user.getRole().equals(Role.ORGANIZER)) {
            throw new ForbiddenException("El usuario no tiene permisos de organizador");
        }

        return user;
    }

    private String saveImage(MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            return this.cloudinaryService.uploadImage(file).get("secure_url").toString();
        }

        return null;
    }
}
