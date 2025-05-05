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

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrganizerServiceImpl implements OrganizerService {
    private final UserRepository userRepository;
    private final OrganizerUserRepository organizerRepository;
    private final AuthenticatedUserService authenticatedUserService;
    private final CloudinaryService cloudinaryService;
    private final OrganizerMapper organizerMapper;

    @Override
    public OrganizerResponseDto read(Long id) {
        OrganizerUserEntity organizer = this.organizerRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Organizador no encontrado: " + id));
        return this.organizerMapper.toResponse(organizer);
    }

    @Override
    @Transactional
    public OrganizerResponseDto create(OrganizerRequestDto organizerDto) {
        OrganizerUserEntity organizer = this.organizerMapper.toEntity(organizerDto);
        organizer.setUser(getRequestUser());
        this.saveImage(organizerDto.getImage(), organizer);

        return this.organizerMapper.toResponse(this.organizerRepository.save(organizer));
    }

    @Override
    @Transactional
    public OrganizerResponseDto update(Long id, OrganizerRequestDto organizerDto) {
        OrganizerUserEntity organizer = this.organizerRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Organizador no encontrado: " + id));
        this.organizerMapper.updateEntity(organizerDto, organizer);
        this.updateImage(organizerDto.getImage(), organizer, organizerDto.getDeletedImage());

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

    private void saveImage(MultipartFile file, OrganizerUserEntity organizer) {
        if (file != null && !file.isEmpty()) {
            Map<String, Object> image = this.cloudinaryService.uploadImage(file);
            organizer.setImage(image.get("secure_url").toString());
            organizer.setImagePublicId(image.get("public_id").toString());
        }
    }

    private void updateImage(MultipartFile file, OrganizerUserEntity organizer, Boolean deleteImage) {
        if (deleteImage && (organizer.getImagePublicId() != null && !organizer.getImagePublicId().isEmpty())) {
            this.cloudinaryService.deleteImage(organizer.getImagePublicId());
            organizer.setImage(null);
            organizer.setImagePublicId(null);
        }

        this.saveImage(file, organizer);
    }
}
