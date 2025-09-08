CREATE TABLE saved_songs_ecos (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    song_id BIGINT NOT NULL,
    fan_id BIGINT NOT NULL,
    CONSTRAINT fk_saved_songs_song FOREIGN KEY (song_id) REFERENCES songs_ecos(id) ON DELETE CASCADE,
    CONSTRAINT fk_saved_songs_fan FOREIGN KEY (fan_id) REFERENCES fan_profiles_ecos(id) ON DELETE CASCADE,
    CONSTRAINT uq_saved_songs UNIQUE (fan_id, song_id)
);