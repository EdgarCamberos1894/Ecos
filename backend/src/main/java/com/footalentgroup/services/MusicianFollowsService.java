package com.footalentgroup.services;

import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;

import java.util.List;

public interface MusicianFollowsService {
    public List<MusicianInfoReponseDto> getFollowMusicians (Long fan_id);

    public List<FanProfileResponseDto> getFansByMusician (Long musician_id);

    public void addMusicianToFavorites(Long fan_id, Long musician_id);

    public void removeMusicianFromFavorites(Long fanId, Long musicianId);
}
