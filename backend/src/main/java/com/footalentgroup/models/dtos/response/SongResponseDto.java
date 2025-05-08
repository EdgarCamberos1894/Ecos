package com.footalentgroup.models.dtos.response;

import java.util.Date;

public record SongResponseDto(

        Long id,
        String title,
        String audioUrl,
        String spotifyUrl,
        String youtubeUrl,
        String soundcloudUrl,
        Date releaseDate,
        String genre,
        MusicianInfoReponseDto musicianInfo
        //String albumCoverImageUrl, // existira albun?
        //Boolean isPublished //
) {
}
