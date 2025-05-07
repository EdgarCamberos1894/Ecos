package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.models.dtos.response.EventResponseDto;
import com.footalentgroup.models.entities.EventEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EventMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "imagePublicId", ignore = true)
    @Mapping(target = "musician", ignore = true)
    EventEntity toEntity(EventRequestDto dto);

    @Mapping(target = "musicianId", source = "musician.id")
    EventResponseDto toDto(EventEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "imagePublicId", ignore = true)
    @Mapping(target = "musician", ignore = true)
    void updateEntity(EventRequestDto dto, @MappingTarget EventEntity entity);
}
