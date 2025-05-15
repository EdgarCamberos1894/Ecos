package com.footalentgroup.repositories;

import com.footalentgroup.models.entities.EventEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface EventRepository extends JpaRepository<EventEntity, Long> {
    Page<EventEntity> findByDateGreaterThanEqualOrderByDateAsc(LocalDate date, Pageable pageable);
    Page<EventEntity> findByMusicianIdAndDateGreaterThanEqualOrderByDateAsc(Long musicianId, LocalDate date, Pageable pageable);
}
