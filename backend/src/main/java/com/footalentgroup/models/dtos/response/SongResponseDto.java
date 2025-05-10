package com.footalentgroup.models.dtos.response;

import java.util.Date;

public record SongResponseDto(

        Long id,
        String title,
        String genre,
        String audioUrl,
        String spotifyUrl,
        String youtubeUrl,
        MusicianInfoReponseDto musicianInfo
        //String albumCoverImageUrl, // existira albun?
        //Boolean isPublished //
) {
}
