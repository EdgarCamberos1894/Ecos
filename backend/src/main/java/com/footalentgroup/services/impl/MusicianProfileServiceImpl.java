package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.MusicianProfileNotFoundException;
import com.footalentgroup.models.dtos.mapper.MusicProfileMapper;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.MusicianProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MusicianProfileServiceImpl implements MusicianProfileService {

    private final MusicianProfileRepository musicianRepository;
    private final MusicProfileMapper mapper;
    private final CloudinaryService cloudinaryService;
    private final AuthenticatedUserService authenticatedUserService;


    @Override
    public MusicianProfileResponseDto getProfilById(Long id) {
        MusicianProfileEntity musician = musicianRepository.findById(id)
                .orElseThrow(() -> new MusicianProfileNotFoundException("El perfil musical con ID " + id + " no existe."));
        return mapper.toResponse(musician);
    }

    @Override
    public void createProfile(UserEntity user) {
        MusicianProfileEntity music = new MusicianProfileEntity();
        music.setUser(user);
        musicianRepository.save(music);
    }

    @Override
    public void updateProfile(MusicianProfileRequestDto requestDto) {
        String email = authenticatedUserService.getAuthenticatedUsername();
        MusicianProfileEntity music = musicianRepository.findByUserEmail(email).
                orElseThrow(() -> new MusicianProfileNotFoundException("Operación inválida: el usuario autenticado no posee el rol MUSICIAN por lo tanto no cuenta con un perfil musical."));
        mapper.updateEntity(requestDto,music);

        if (requestDto.deletePhoto()) {
            if (music.getPhotoPublicId() != null) {
                cloudinaryService.deleteImage(music.getPhotoPublicId());
                music.setPhotoUrl(null);
                music.setPhotoPublicId(null);
            }
        } else if (requestDto.photo() != null && !requestDto.photo().isEmpty()) {
            if (music.getPhotoPublicId()!=null){
                cloudinaryService.deleteImage(music.getPhotoPublicId());
            }
            Map<String, Object> uploadResult = cloudinaryService.uploadImage(requestDto.photo());
            music.setPhotoUrl((String) uploadResult.get("secure_url"));
            music.setPhotoPublicId((String) uploadResult.get("public_id"));
        }

        musicianRepository.save(music);
    }

    @Override
    public Page<MusicianProfileResponseDto> searchMusicians(String stageName, String genre, int page, int size) {
        //Orden por nombre de forma ascendente
        Pageable pageable= PageRequest.of(page, size, Sort.by(Sort.Order.asc("stageName")));
        return  musicianRepository.findByStageNameContainingIgnoreCaseAndGenreContainingIgnoreCase(stageName,genre,pageable);
    }
}
