package com.footalentgroup.repositories;

import com.footalentgroup.models.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<EventEntity, Long> {
    List<EventEntity> findAllByOrganizer_Id(Long id);
}
