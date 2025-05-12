package com.footalentgroup.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "musician_profiles")
public class MusicianProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stageName;
    private String genre;
    private String country;

    private String photoUrl;
    private String photoPublicId;

    private String bannerUrl;
    private String bannerPublicId;

    //Contact Data
    private String whatsapp;
    private String spotifyUrl;
    private String youtubeUrl;
    private String instagramUrl;
    private String tiktokUrl;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "musicianProfile", fetch = FetchType.LAZY)
    private List<SongEntity> songs;

}