package com.footalentgroup.repositories;


import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicianProfileRepository extends JpaRepository<MusicianProfileEntity, Long> {

    Optional<MusicianProfileEntity> findByUserEmail(String email);
    Page<MusicianProfileResponseDto> findByStageNameContainingIgnoreCaseAndGenreContainingIgnoreCase(String stageName, String genre, Pageable pageable);
}
