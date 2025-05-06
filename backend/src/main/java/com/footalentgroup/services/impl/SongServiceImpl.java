package com.footalentgroup.services.impl;

import com.footalentgroup.models.dtos.mapper.SongMapper;
import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.SongEntity;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.repositories.SongRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final SongMapper mapper;
    private final AuthenticatedUserService authenticatedUserService;
    private final MusicianProfileRepository musician;
    private final CloudinaryService cloudinaryService;


    @Override
    public SongResponseDto uploadSong(SongUploadRequestDto requestDto) {
        String email = authenticatedUserService.getAuthenticatedUsername();
        MusicianProfileEntity entity = musician.findByUserEmail(email).orElseThrow();
        SongEntity song = mapper.toEntity(requestDto);
        song.setMusicianProfile(entity);

       if (requestDto.audio() != null && !requestDto.audio().isEmpty()) {
            Map<String, Object> uploadResult = cloudinaryService.uploadAudio(requestDto.audio());
            song.setAudioUrl ((String) uploadResult.get("secure_url"));
            song.setAudioPublicId((String) uploadResult.get("public_id"));
        }

       songRepository.save(song);
        return null;
    }

    @Override
    public SongResponseDto getSongById(Long id) {
        SongEntity song = songRepository.findById(id).orElseThrow();
        return mapper.toSongResponseDto(song);
    }

    @Override
    public PageResponseDto<SongResponseDto> getAllSongs(Pageable pageable) {
        Page<SongEntity> songPage = songRepository.findAll(pageable);
        return mapper.toPageResponse(songPage);
    }

    @Override
    public SongResponseDto updateSong(Long idSong, SongUploadRequestDto requestDto) {
        String email = authenticatedUserService.getAuthenticatedUsername();
        SongEntity song = songRepository.findByIdAndMusicianProfile_User_Email(idSong, email)
                .orElseThrow(() -> new RuntimeException("La canción no pertenece al perfil del músico autenticado o no existe"));

        mapper.updateEntity(requestDto, song);
        if (requestDto.audio() != null && !requestDto.audio().isEmpty()) {
            if (song.getAudioPublicId()!=null){
                cloudinaryService.deleteAudio(song.getAudioPublicId());
            }
            Map<String, Object> uploadResult = cloudinaryService.uploadAudio(requestDto.audio());
            song.setAudioUrl((String) uploadResult.get("secure_url"));
            song.setAudioPublicId((String) uploadResult.get("public_id"));
        }

        songRepository.save(song);
        return null;
    }

    @Override
    public void deleteSong(Long id) {
        //delete logico o no?
    }
}
