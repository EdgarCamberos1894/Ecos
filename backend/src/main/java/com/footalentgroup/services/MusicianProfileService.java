package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.UserEntity;

public interface MusicianProfileService {

    MusicianProfileResponseDto getProfilById(Long id);

    void createProfile(UserEntity user);

    void updateProfile(MusicianProfileRequestDto requestDto);

}
