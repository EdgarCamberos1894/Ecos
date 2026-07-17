-- Seed data must not depend on YouTube availability or embed policies.
UPDATE songs
SET youtube_url = 'demo://ecos-showcase'
WHERE musician_id BETWEEN 16 AND 30;
