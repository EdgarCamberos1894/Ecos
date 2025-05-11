package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.AlreadyFollowingMusicianException;
import com.footalentgroup.exceptions.FanProfileNotFoundException;
import com.footalentgroup.exceptions.MusicianProfileNotFoundException;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.MusicianFollowsEntity;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.repositories.FanProfileRepository;
import com.footalentgroup.repositories.MusicianFollowsRepository;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.MusicianFollowsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MusicianFollowsServiceImlp implements MusicianFollowsService {
    private MusicianFollowsRepository musicianFollowsRepository;
    private FanProfileRepository fanRepository;
    private MusicianProfileRepository musicianRepository;

    //Obtener musicos seguido por un fan
    @Override
    public List<MusicianInfoReponseDto> getFollowMusicians(Long fan_id) {
        return musicianFollowsRepository.findByFanId(fan_id);

    }

    //Obtener seguidores de musico
    @Override
    public List<FanProfileResponseDto> getFansByMusician(Long musician_id) {
        return musicianFollowsRepository.findByMusicianId(musician_id);
    }

    @Override
    public void addMusicianToFavorites(Long fan_id, Long musician_id) {
      //verificamos si el musico ya se encuentra en favoritos de fan
        if(!musicianFollowsRepository.existsByFanIdAndMusicianId(fan_id, musician_id)){
            MusicianFollowsEntity follow = new MusicianFollowsEntity();

            FanProfileEntity fan = fanRepository.findById(fan_id).
                    orElseThrow(() -> new FanProfileNotFoundException("El perfil de fan con ID" + fan_id + " no existe."));

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
    public void removeMusicianFromFavorites(Long fanId, Long musicianId) {
        MusicianFollowsEntity follow = musicianFollowsRepository.findByFanIdAndMusicianId(fanId, musicianId);
        if (follow != null) {
            musicianFollowsRepository.delete(follow);
        }
    }
}
