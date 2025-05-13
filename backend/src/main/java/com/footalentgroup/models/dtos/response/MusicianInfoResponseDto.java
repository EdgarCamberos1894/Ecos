package com.footalentgroup.models.dtos.response;

public record MusicianInfoResponseDto(
        Long artistId,
        String stageName,
        String artistName,
        String spotifyUrl,
        String youtubeUrl
) {
}
