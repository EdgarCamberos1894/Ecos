CREATE TABLE tickets (
    id BIGSERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    price NUMERIC(19, 2) NOT NULL,
    event_id BIGINT NOT NULL,
    CONSTRAINT fk_tickets_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);