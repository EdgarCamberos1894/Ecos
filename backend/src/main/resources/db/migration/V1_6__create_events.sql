CREATE TABLE events_ecos (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    image_public_id VARCHAR(255),
    active CHAR(1),
    musician_id BIGINT NOT NULL,
    CONSTRAINT fk_events_musician FOREIGN KEY (musician_id) REFERENCES musician_profiles_ecos(id) ON DELETE CASCADE
);