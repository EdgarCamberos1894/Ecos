package com.footalentgroup.repositories;

import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.MusicianFollowsEntity;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MusicianFollowsRepository extends JpaRepository<MusicianFollowsEntity, Long> {

    List<MusicianProfileEntity> findByFanId(Long fanId);


    List<FanProfileEntity> findByMusicianId(Long musicianId);

    // Verificar si un fan ya sigue a un músico
    boolean existsByFanIdAndMusicianId(Long fanId, Long musicianId);

    MusicianFollowsEntity findByFanIdAndMusicianId(Long fanId, Long musicianId);
}
