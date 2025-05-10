package com.footalentgroup.services.impl;

import com.footalentgroup.models.dtos.request.FanProfileRequestDto;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.FanProfileRepository;
import com.footalentgroup.services.FanProfileService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class FanProfileServiceImp implements FanProfileService {
    private final FanProfileRepository fanProfileRepository;

    @Override
    public FanProfileResponseDto getFanProfileById(Long id) {
        return null;
    }

    @Override
    public void createFanProfile(UserEntity user) {
        FanProfileEntity fan = new FanProfileEntity();
        fan.setUser(user);
        fanProfileRepository.save(fan);
    }

    @Override
    public void updateFanProfile(FanProfileRequestDto requestDto) {

    }
}
