package com.footalentgroup.services;

import com.footalentgroup.models.dtos.response.SongResponseDto;

import java.util.List;

public interface SavedSongService {
    void saveSongAsFavourite (Long song_id);
    void deleteSongFromFavourites (Long song_id);

    List<SongResponseDto> getAllSongsFromFavouritesFan();

}
