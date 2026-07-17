-- Keep the portfolio landing page populated with upcoming events.
UPDATE events
SET date = CASE name
    WHEN 'Echo Beats Festival' THEN DATE '2026-08-22'
    WHEN 'Soul & Rhythm Night' THEN DATE '2026-09-12'
    WHEN 'Rock Thunder Night' THEN DATE '2026-10-03'
    WHEN 'Latin Vibes Evening' THEN DATE '2026-11-07'
    WHEN 'Pop Paradise Live' THEN DATE '2026-12-05'
    ELSE date
END
WHERE name IN (
    'Echo Beats Festival',
    'Soul & Rhythm Night',
    'Rock Thunder Night',
    'Latin Vibes Evening',
    'Pop Paradise Live'
);
