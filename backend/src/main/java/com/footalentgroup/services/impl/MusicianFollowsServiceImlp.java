package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.AlreadyFollowingMusicianException;
import com.footalentgroup.exceptions.FanProfileNotFoundException;
import com.footalentgroup.exceptions.MusicianProfileNotFoundException;
import com.footalentgroup.models.dtos.mapper.FanProfileMapper;
import com.footalentgroup.models.dtos.mapper.MusicProfileMapper;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianSimpleResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.MusicianFollowsEntity;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.repositories.FanProfileRepository;
import com.footalentgroup.repositories.MusicianFollowsRepository;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.MusicianFollowsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MusicianFollowsServiceImlp implements MusicianFollowsService {
    private final MusicianFollowsRepository musicianFollowsRepository;
    private final FanProfileRepository fanRepository;
    private final MusicianProfileRepository musicianRepository;
    private final AuthenticatedUserService authenticatedUserService;
    private final MusicProfileMapper musicianMapper;
    private final FanProfileMapper fanMapper;

    //Obtener musicos seguido por un fan
    @Override
    public List<MusicianSimpleResponseDto> getFollowMusicians() {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

        List<MusicianSimpleResponseDto> musicians = musicianFollowsRepository.findByFanIdAndDeletedAtIsNull(fan.getId())
                .stream()
                .map(MusicianFollowsEntity::getMusician)
                .map(musicianMapper::toSimpleResponse)
                .collect(Collectors.toList());

        return musicians;
    }

    //Obtener seguidores de musico
    @Override
    public List<FanProfileResponseDto> getFansByMusician() {
        String email = authenticatedUserService.getAuthenticatedUsername();
        MusicianProfileEntity musician= musicianRepository.findByUserEmail(email)
                .orElseThrow(()-> new MusicianProfileNotFoundException("No se encontró un perfil de musico asociado al usuario autenticado"));

        List<FanProfileResponseDto> fans = musicianFollowsRepository.findByMusicianIdAndDeletedAtIsNull(musician.getId())
         .stream()
                .map(MusicianFollowsEntity::getFan)
                .map(fanMapper::toResponse)
                .collect(Collectors.toList());

        return fans;
    }

    @Override
    public void addMusicianToFavorites(Long musician_id) {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

            MusicianFollowsEntity follow = musicianFollowsRepository.findByFanIdAndMusicianId(fan.getId(), musician_id);

            if (follow != null) {
                this.restoreFollowIfDeleted(follow);
            } else {
                this.createNewFollow(fan, musician_id);
            }
    }


    private void restoreFollowIfDeleted(MusicianFollowsEntity follow) {
        if (follow.getDeletedAt() != null) {
            follow.setDeletedAt(null);
            follow.setUpdatedAt(OffsetDateTime.now());
            musicianFollowsRepository.save(follow);
        } else {
            throw new AlreadyFollowingMusicianException("El fan ya sigue a este músico.");
        }
    }

    private void createNewFollow(FanProfileEntity fan, Long musicianId) {
        MusicianFollowsEntity newFollow = new MusicianFollowsEntity();

        MusicianProfileEntity musician = musicianRepository.findById(musicianId)
                .orElseThrow(() -> new MusicianProfileNotFoundException("El perfil de musico con ID " + musicianId + " no existe."));

        newFollow.setFan(fan);
        newFollow.setMusician(musician);
        musicianFollowsRepository.save(newFollow);
    }

    @Override
    public void removeMusicianFromFavorites(Long musicianId) {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));


            MusicianFollowsEntity follow = musicianFollowsRepository.findByFanIdAndMusicianId(fan.getId(), musicianId);
            if (follow != null) {
                follow.setDeletedAt(OffsetDateTime.now());
                musicianFollowsRepository.save(follow);
            }else{
            throw new MusicianProfileNotFoundException("El músico con id "+musicianId+ "no está en tus favoritos");
            }
    }
}
