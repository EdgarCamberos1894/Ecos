package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.MusicianInfoReponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.SongEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

import java.lang.annotation.Target;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SongMapper {

    @Mapping(target = "audioUrl", ignore = true)
    SongEntity toEntity(SongUploadRequestDto dto);

    @Mapping(target = "musicianInfo", expression = "java(mapMusicianInfo(song.getMusicianProfile()))")
    SongResponseDto toSongResponseDto(SongEntity song);

    void updateEntity(SongUploadRequestDto requestDto, @MappingTarget SongEntity song);



    default MusicianInfoReponseDto mapMusicianInfo(MusicianProfileEntity musicianProfileEntity) {
        if (musicianProfileEntity == null) {
            return null;
        }
        return new MusicianInfoReponseDto(
                musicianProfileEntity.getStageName(),
                musicianProfileEntity.getUser().getName(),
                musicianProfileEntity.getSpotifyUrl(),
                musicianProfileEntity.getYoutubeUrl()
        );
    }

    // Este método puede mapear la página y devolver la respuesta formateada
    default PageResponseDto<SongResponseDto> toPageResponse(Page<SongEntity> songPage) {
        List<SongResponseDto> songDtos = songPage.getContent().stream()
                .map(this::toSongResponseDto)
                .collect(Collectors.toList());

        return new PageResponseDto<>(
                songDtos,
                songPage.getNumber(),
                songPage.getSize(),
                songPage.getTotalPages(),
                songPage.getTotalElements(),
                songPage.isFirst(),
                songPage.isLast()
        );
    }

}
