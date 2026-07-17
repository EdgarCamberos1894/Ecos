-- Use an embeddable YouTube demo video for the portfolio profile.
UPDATE musician_profiles
SET youtube_url = 'https://www.youtube.com/watch?v=ScMzIvxBSi'
WHERE id = 30;

UPDATE songs
SET youtube_url = 'https://www.youtube.com/watch?v=ScMzIvxBSi'
WHERE musician_id = 30;
