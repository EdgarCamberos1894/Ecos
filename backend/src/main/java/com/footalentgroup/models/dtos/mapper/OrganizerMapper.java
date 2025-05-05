package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.OrganizerRequestDto;
import com.footalentgroup.models.dtos.response.OrganizerResponseDto;
import com.footalentgroup.models.entities.OrganizerUserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrganizerMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "imagePublicId", ignore = true)
    OrganizerUserEntity toEntity(OrganizerRequestDto dto);

    @Mapping(source = "user.email", target = "email")
    OrganizerResponseDto toResponse(OrganizerUserEntity user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "imagePublicId", ignore = true)
    void updateEntity(OrganizerRequestDto dto, @MappingTarget OrganizerUserEntity user);
}
