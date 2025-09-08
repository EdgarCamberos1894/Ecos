CREATE TABLE songs_ecos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    audio_url VARCHAR(255),
    audio_public_id VARCHAR(255),
    spotify_url VARCHAR(255),
    youtube_url VARCHAR(255),
    musician_id BIGINT NOT NULL,
    CONSTRAINT fk_songs_musician FOREIGN KEY (musician_id) REFERENCES musician_profiles_ecos(id) ON DELETE CASCADE
);
