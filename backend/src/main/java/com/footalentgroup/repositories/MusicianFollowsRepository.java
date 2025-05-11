package com.footalentgroup.repositories;

import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.MusicianFollowsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicianFollowsRepository extends JpaRepository<MusicianFollowsEntity, Long> {

    List<MusicianInfoReponseDto> findByFanId(Long fanId);


    List<FanProfileResponseDto> findByMusicianId(Long musicianId);

    // Verificar si un fan ya sigue a un músico
    boolean existsByFanIdAndMusicianId(Long fanId, Long musicianId);

    MusicianFollowsEntity findByFanIdAndMusicianId(Long fanId, Long musicianId);
}
