package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.MusicianProfileNotFoundException;
import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.mapper.MusicProfileMapper;
import com.footalentgroup.models.dtos.request.BannerUploadReqestDto;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.request.MusicianSearchRequestDTO;
import com.footalentgroup.models.dtos.response.BannerResponseDto;
import com.footalentgroup.models.dtos.response.DonationResponseDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.MusicianProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.function.BiConsumer;

@Service
@RequiredArgsConstructor
public class MusicianProfileServiceImpl implements MusicianProfileService {

    private final MusicianProfileRepository musicianRepository;
    private final MusicProfileMapper mapper;
    private final CloudinaryService cloudinaryService;
    private final AuthenticatedUserService authenticatedUserService;


    @Override
    public MusicianProfileResponseDto getProfileById(Long id) {
        MusicianProfileEntity musician = musicianRepository.findById(id)
                .orElseThrow(() -> new MusicianProfileNotFoundException("El perfil musical con ID " + id + " no existe."));
        return mapper.toResponse(musician);
    }

    @Override
    public void createProfile(UserEntity user) {
        MusicianProfileEntity music = new MusicianProfileEntity();
        music.setUser(user);
        musicianRepository.save(music);
    }

    @Override
    public void updateProfile(MusicianProfileRequestDto requestDto) {
        MusicianProfileEntity music = getAuthenticatedMusicianProfile();
        mapper.updateEntity(requestDto,music);

        handleImageUpdate(
                requestDto.deletePhoto(), requestDto.photo(), music.getPhotoPublicId(),
                (url, publicId) -> {
                    music.setPhotoUrl(url);
                    music.setPhotoPublicId(publicId);
                },
                () -> {
                    music.setPhotoUrl(null);
                    music.setPhotoPublicId(null);
                }
        );

        musicianRepository.save(music);
    }

    @Override
    public Page<MusicianProfileResponseDto> searchMusicians(MusicianSearchRequestDTO requestDTO) {
        //Ordenamiento por nombre de forma ascendente
        Pageable pageable= PageRequest.of(requestDTO.getPage(), requestDTO.getSize(), Sort.by(Sort.Order.asc("stageName")));
        return  musicianRepository.findByStageNameContainingIgnoreCaseAndGenreContainingIgnoreCase(requestDTO.getStageName(),requestDTO.getGenre() ,pageable);
    }

    @Override
    public void updateBanner(BannerUploadReqestDto request) {
        MusicianProfileEntity music = getAuthenticatedMusicianProfile();

        handleImageUpdate(
                request.deleteBanner(),
                request.banner(),
                music.getBannerPublicId(),
                (url, publicId) -> {
                    music.setBannerUrl(url);
                    music.setBannerPublicId(publicId);
                },
                () -> {
                    music.setBannerUrl(null);
                    music.setBannerPublicId(null);
                }
        );

        musicianRepository.save(music);
    }

    @Override
    public BannerResponseDto getBannerByMusicianId(Long id) {
        MusicianProfileEntity musicianProfile = musicianRepository.findById(id)
                .orElseThrow(() -> new MusicianProfileNotFoundException("El perfil musical con ID " + id + " no existe."));
        return new BannerResponseDto(musicianProfile.getBannerUrl());
    }

    @Override
    public DonationResponseDto getDonationInfo(Long id) {
        return this.musicianRepository
                .findDonationInfoById(id)
                .orElseThrow(() -> new NotFoundException("El perfil musical con ID " + id + " no existe."));
    }

    private MusicianProfileEntity getAuthenticatedMusicianProfile() {
        String email = authenticatedUserService.getAuthenticatedUsername();
        return musicianRepository.findByUserEmail(email)
                .orElseThrow(() -> new MusicianProfileNotFoundException("Operación inválida: el usuario autenticado no pose el rol MUSICIAN por lo tanto no cuenta con un perfil musical."));
    }

    private void handleImageUpdate(boolean deleteFlag,
                                   MultipartFile newFile,
                                   String existingPublicId,
                                   BiConsumer<String, String> setUrlAndPublicId,
                                   Runnable clearUrlAndPublicId) {

        if (deleteFlag) {
            if (existingPublicId != null) {
                cloudinaryService.deleteImage(existingPublicId);
                clearUrlAndPublicId.run();
            }
        } else if (newFile != null && !newFile.isEmpty()) {
            if (existingPublicId != null) {
                cloudinaryService.deleteImage(existingPublicId);
            }
            Map<String, Object> uploadResult = cloudinaryService.uploadImage(newFile);
            setUrlAndPublicId.accept(
                    (String) uploadResult.get("secure_url"),
                    (String) uploadResult.get("public_id")
            );
        }
    }
}
