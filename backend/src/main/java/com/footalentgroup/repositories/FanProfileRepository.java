package com.footalentgroup.repositories;

import com.footalentgroup.models.entities.FanProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FanProfileRepository  extends JpaRepository<FanProfileEntity, Long> {
    Optional<FanProfileEntity> findByUserEmail(String email);
}
