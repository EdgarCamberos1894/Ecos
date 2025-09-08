-- Tabla principal fan_profiles
CREATE TABLE fan_profiles_ecos (
    id BIGINT PRIMARY KEY,
    photo_url VARCHAR(255),
    photo_public_id VARCHAR(255),
    country VARCHAR(100),
    CONSTRAINT fk_fan_profiles_user FOREIGN KEY (id) REFERENCES users_ecos(id) ON DELETE CASCADE
);

-- Tabla de intereses (géneros musicales)
CREATE TABLE fan_interest_genres_ecos (
    fan_profile_id BIGINT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    PRIMARY KEY (fan_profile_id, genre),
    CONSTRAINT fk_fan_interest_fan FOREIGN KEY (fan_profile_id) REFERENCES fan_profiles_ecos(id) ON DELETE CASCADE
);
