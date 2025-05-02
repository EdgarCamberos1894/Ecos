package com.footalentgroup.repositories;


import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicianProfileRepository extends JpaRepository<MusicianProfileEntity, Long> {

    Optional<MusicianProfileEntity> findByUserEmail(String email);

}
