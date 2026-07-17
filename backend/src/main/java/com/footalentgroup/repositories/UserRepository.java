package com.footalentgroup.repositories;

import com.footalentgroup.models.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByEmailVerificationTokenHash(String tokenHash);
    Optional<UserEntity> findByPasswordResetTokenHash(String tokenHash);
}
