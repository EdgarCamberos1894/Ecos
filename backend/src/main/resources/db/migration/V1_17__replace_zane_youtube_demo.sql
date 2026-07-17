-- Replace the unavailable YouTube sample with a public embeddable portfolio demo.
UPDATE musician_profiles
SET youtube_url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
WHERE id = 30;

UPDATE songs
SET youtube_url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
WHERE musician_id = 30;
