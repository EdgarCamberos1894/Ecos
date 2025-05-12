package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.AlreadyFollowingMusicianException;
import com.footalentgroup.exceptions.FanProfileNotFoundException;
import com.footalentgroup.exceptions.MusicianProfileNotFoundException;
import com.footalentgroup.models.dtos.mapper.FanProfileMapper;
import com.footalentgroup.models.dtos.mapper.MusicProfileMapper;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
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

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MusicianFollowsServiceImlp implements MusicianFollowsService {
    private MusicianFollowsRepository musicianFollowsRepository;
    private FanProfileRepository fanRepository;
    private MusicianProfileRepository musicianRepository;
    private final AuthenticatedUserService authenticatedUserService;
    private final MusicProfileMapper musicianMapper;
    private final FanProfileMapper fanMapper;

    //Obtener musicos seguido por un fan
    @Override
    public List<MusicianProfileResponseDto> getFollowMusicians() {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

        List<MusicianProfileEntity> musicianProfiles = musicianFollowsRepository.findByFanId(fan.getId());

        return musicianProfiles.stream()
                .map(musicianMapper::toResponse)
                .collect(Collectors.toList());
    }

    //Obtener seguidores de musico
    @Override
    public List<FanProfileResponseDto> getFansByMusician() {
        String email = authenticatedUserService.getAuthenticatedUsername();
        MusicianProfileEntity musician= musicianRepository.findByUserEmail(email)
                .orElseThrow(()-> new MusicianProfileNotFoundException("No se encontró un perfil de musico asociado al usuario autenticado"));

        List<FanProfileEntity> fanProfiles = musicianFollowsRepository.findByMusicianId(musician.getId());

        return fanProfiles.stream()
                .map(fanMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void addMusicianToFavorites(Long musician_id) {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

      //verificamos si el musico ya se encuentra en favoritos de fan
        if(!musicianFollowsRepository.existsByFanIdAndMusicianId(fan.getId(), musician_id)){
            MusicianFollowsEntity follow = new MusicianFollowsEntity();

            MusicianProfileEntity musician = musicianRepository.findById(musician_id)
                    .orElseThrow(()-> new MusicianProfileNotFoundException("El perfil de musico con ID" + musician_id + " no existe."));

            follow.setFan(fan);
            follow.setMusician(musician);

            musicianFollowsRepository.save(follow);
        }else{
            throw new AlreadyFollowingMusicianException("El fan ya sigue a este músico.");
        }
    }

    @Override
    public void removeMusicianFromFavorites(Long musicianId) {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

        if(fan!=null){
            MusicianFollowsEntity follow = musicianFollowsRepository.findByFanIdAndMusicianId(fan.getId(), musicianId);
            if (follow != null) {
                musicianFollowsRepository.delete(follow);
            }
        }

    }
}
