package com.footalentgroup.models.dtos.response;

public record MusicianInfoReponseDto(
        String stageName,
        String artistName,
        String spotifyUrl,
        String youtubeUrl
) {
}
