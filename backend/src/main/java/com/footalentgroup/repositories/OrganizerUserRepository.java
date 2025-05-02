package com.footalentgroup.repositories;

import com.footalentgroup.models.entities.OrganizerUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizerUserRepository extends JpaRepository<OrganizerUserEntity, Long> {
    Optional<OrganizerUserEntity> findByUser_Id(Long id);
}
