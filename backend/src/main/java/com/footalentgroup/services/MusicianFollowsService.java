package com.footalentgroup.services;

import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;

import java.util.List;

public interface MusicianFollowsService {
    public List<MusicianProfileResponseDto> getFollowMusicians ();

    public List<FanProfileResponseDto> getFansByMusician ();

    public void addMusicianToFavorites(Long musician_id);

    public void removeMusicianFromFavorites(Long musicianId);
}
