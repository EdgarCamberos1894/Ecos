package com.footalentgroup.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Table(name = "songs")
@Entity
@Data
@NoArgsConstructor
public class SongEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    String title;

    String audioUrl;
    String audioPublicId;


    String spotifyUrl;
    String youtubeUrl;
    String soundcloadUrl;

    @Column(nullable = false)
    Date releaseDate;

    @Column(nullable = false)
    String genre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musician_id", nullable = false)
    private MusicianProfileEntity musicianProfile;

}
