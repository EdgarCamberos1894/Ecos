package com.footalentgroup.models.dtos.response;

public record MusicianSimpleResponseDto(
        String stageName,
        String photoUrl,
        String genre,
        String country
)
{
}
