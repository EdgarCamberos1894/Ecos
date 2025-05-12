package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.BannerUploadReqestDto;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianSimpleResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MusicProfileMapper{

    @Mapping(target = "photoUrl", ignore = true)
    MusicianProfileEntity toEntity(MusicianProfileRequestDto dto);

    @Mapping(source = "photoUrl", target = "photoUrl")
    MusicianProfileResponseDto toResponse(MusicianProfileEntity entity);

    @Mapping(source = "photoUrl", target = "photoUrl")
    MusicianSimpleResponseDto toSimpleResponse(MusicianProfileEntity entity);

    @Mapping(target = "photoUrl", ignore = true)
    void updateEntity(MusicianProfileRequestDto dto, @MappingTarget MusicianProfileEntity entity);


}
