-- Datos de prueba para events con type ajustado al enum EventType
INSERT INTO events_ecos (name, category, type, date, start_time, end_time, location, description, image, image_public_id, active, musician_id) VALUES
-- Músico 16
('Echo Beats Festival', 'Music Festival', 'Single', '2025-09-15', '20:00', '23:00', 'Madison Square Garden, NY', 'Una noche de vibrantes ritmos electrónicos con DJ Echo.', 'https://res.cloudinary.com/dggmk0peo/image/upload/v1757154495/Echo_beats_festival_d2uzzi.jpg', 'Echo_beats_festival_d2uzzi', 'Y', 16),
-- Músico 18
('Rock Thunder Night', 'Concert', 'Single', '2025-10-05', '19:30', '22:00', 'The O2 Arena, London', 'Max Thunder enciende el escenario con sus poderosos riffs de guitarra.', 'https://res.cloudinary.com/dggmk0peo/image/upload/v1757154502/Rock_Thunder_Night_festival_jvqkli.jpg', 'Rock_Thunder_Night_festival_jvqkli', 'Y', 18),
-- Músico 19
('Latin Vibes Evening', 'Concert', 'Recurring', '2025-11-01', '21:00', '23:30', 'Auditorio Nacional, Ciudad de México', 'Sofía Rivera trae vibrantes ritmos latinos al escenario.', 'https://res.cloudinary.com/dggmk0peo/image/upload/v1757154496/latin_vives_festival_iwe0y7.webp', 'latin_vives_festival_iwe0y7', 'Y', 19),
-- Músico 22
('Soul & Rhythm Night', 'Concert', 'Single', '2025-09-28', '20:00', '22:30', 'Sydney Opera House, Sídney', 'Kai Moon presenta una noche de soul y R&B lleno de sentimiento.', 'https://res.cloudinary.com/dggmk0peo/image/upload/v1757154509/Soul_Rhythm_Night_festival_cp62bc.jpg', 'Soul_Rhythm_Night_festival_cp62bc', 'Y', 22),
-- Músico 25
('Pop Paradise Live', 'Music Festival', 'Recurring', '2025-12-10', '18:00', '22:00', 'Globen Arena, Estocolmo', 'Maya Sky interpreta sus mejores éxitos en un espectáculo deslumbrante.', 'https://res.cloudinary.com/dggmk0peo/image/upload/v1757154499/Pop_Paradise_Live_gdkka2.jpg', 'Pop_Paradise_Live_gdkka2', 'Y', 25);
