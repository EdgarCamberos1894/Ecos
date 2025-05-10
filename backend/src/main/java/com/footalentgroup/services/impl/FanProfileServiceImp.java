package com.footalentgroup.services.impl;

import com.footalentgroup.models.dtos.request.FanProfileRequestDto;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.services.FanProfileService;

public class FanProfileServiceImp  implements FanProfileService {
    @Override
    public FanProfileResponseDto getFanProfileById(Long id) {
        return null;
    }

    @Override
    public void createFanProfile(UserEntity user) {

    }

    @Override
    public void updateFanProfile(FanProfileRequestDto requestDto) {

    }
}
