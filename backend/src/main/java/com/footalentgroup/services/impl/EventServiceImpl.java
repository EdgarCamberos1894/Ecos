package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.mapper.EventMapper;
import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.models.dtos.response.EventResponseDto;
import com.footalentgroup.models.entities.EventEntity;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.repositories.EventRepository;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.EventService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final MusicianProfileRepository musicianRepository;
    private final CloudinaryService cloudinaryService;
    private final EventMapper eventMapper;

    @Override
    public EventResponseDto read(Long id) {
        EventEntity event = this.eventRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Evento no encontrado: " + id));
        return this.eventMapper.toDto(event);
    }

    @Override
    @Transactional
    public EventResponseDto create(EventRequestDto eventDto) {
        MusicianProfileEntity musician = this.musicianRepository
                .findById(eventDto.getMusicianId())
                .orElseThrow(() -> new NotFoundException("Musico/Banda no encontrado"));

        EventEntity event = this.eventMapper.toEntity(eventDto);
        event.setMusician(musician);
        saveImage(eventDto.getImage(), event);

        return this.eventMapper.toDto(this.eventRepository.save(event));
    }

    @Override
    @Transactional
    public EventResponseDto update(Long id, EventRequestDto eventDto) {
        EventEntity event = this.eventRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Evento no encontrado: " + id));

        this.eventMapper.updateEntity(eventDto, event);
        updateImage(eventDto.getImage(), event, eventDto.getDeleteImage());

        return this.eventMapper.toDto(this.eventRepository.save(event));
    }

    private void saveImage(MultipartFile file, EventEntity event) {
        if (file != null && !file.isEmpty()) {
            Map<String, Object> image = cloudinaryService.uploadImage(file);
            event.setImage(image.get("secure_url").toString());
            event.setImagePublicId(image.get("public_id").toString());
        }
    }

    private void updateImage(MultipartFile file, EventEntity event, Boolean deleteImage) {
        if (deleteImage && event.getImagePublicId() != null && !event.getImagePublicId().isEmpty()) {
            cloudinaryService.deleteImage(event.getImagePublicId());
            event.setImage(null);
            event.setImagePublicId(null);
        }

        saveImage(file, event);
    }
}
