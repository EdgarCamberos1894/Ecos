package com.footalentgroup.models.dtos.response;

public record MusicianProfileResponseDto(
        String stageName,
        String photoUrl,
        String genre,
        String country,
        String whatsapp,
        String paymentLink,
        String paymentAlias,
        String cbu,
        String spotifyUrl,
        String youtubeUrl,
        String instagramUrl,
        String tiktokUrl
) {}