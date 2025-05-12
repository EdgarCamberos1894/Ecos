package com.footalentgroup.services;

import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianSimpleResponseDto;

import java.util.List;

public interface MusicianFollowsService {
    public List<MusicianSimpleResponseDto> getFollowMusicians ();

    public List<FanProfileResponseDto> getFansByMusician ();

    public void addMusicianToFavorites(Long musician_id);

    public void removeMusicianFromFavorites(Long musicianId);
}
