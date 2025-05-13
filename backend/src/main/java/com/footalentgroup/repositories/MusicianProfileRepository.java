package com.footalentgroup.repositories;

import com.footalentgroup.models.dtos.response.DonationResponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MusicianProfileRepository extends JpaRepository<MusicianProfileEntity, Long> {
    Optional<MusicianProfileEntity> findByUserEmail(String email);

    Page<MusicianProfileResponseDto> findByStageNameContainingIgnoreCaseAndGenreContainingIgnoreCase(String stageName, String genre, Pageable pageable);

    @Query(
            "SELECT new com.footalentgroup.models.dtos.response.DonationResponseDto(m.paymentLink, m.paymentAlias, m.cbu, m.user.email, m.bannerUrl) " +
            "FROM MusicianProfileEntity m WHERE m.id = :id"
    )
    Optional<DonationResponseDto> findDonationInfoById(@Param("id") Long id);
}
