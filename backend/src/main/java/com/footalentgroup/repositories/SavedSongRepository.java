package com.footalentgroup.repositories;

import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.SavedSongEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedSongRepository extends JpaRepository<SavedSongEntity, Long> {
    Optional<FanProfileEntity> findByUserEmail(String email);
    List<SongResponseDto> findByFanIdAndDeletedAtIsNull(Long fanId);
}
