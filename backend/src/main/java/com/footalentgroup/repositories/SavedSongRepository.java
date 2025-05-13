package com.footalentgroup.repositories;

import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.SavedSongEntity;
import com.footalentgroup.models.entities.SongEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SavedSongRepository extends JpaRepository<SavedSongEntity, Long> {
    Optional<FanProfileEntity> findByUserEmail(String email);
    List<SongResponseDto> findByFanIdAndDeletedAtIsNull(Long fanId);

    SavedSongEntity findByFanIdAndSongId(Long fan_id, Long song_id);

    @Query("SELECT s.song FROM SavedSongEntity s WHERE s.fan.id = :fanId AND s.deletedAt IS NULL")
    Page<SongEntity> findSongsByFanId(@Param("fanId") Long fanId, Pageable pageable);
}
