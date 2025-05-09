package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.BannerUploadReqestDto;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.request.MusicianSearchRequestDTO;
import com.footalentgroup.models.dtos.response.BannerResponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import org.springframework.data.domain.Page;

public interface MusicianProfileService {

    MusicianProfileResponseDto getProfilById(Long id);

    void createProfile(UserEntity user);

    void updateProfile(MusicianProfileRequestDto requestDto);

    Page<MusicianProfileResponseDto> searchMusicians(MusicianSearchRequestDTO requestDTO);

    void updateBanner(BannerUploadReqestDto reqest);

    BannerResponseDto getBannerByMusicianId(Long id);
}
