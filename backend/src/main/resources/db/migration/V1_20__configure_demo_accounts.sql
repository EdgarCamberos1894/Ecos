UPDATE users
SET password = '$2a$10$F8NgTjUepWPZURo1FLAwO.sBHlgbr9GFh0z3NrFLNeYEKcObOAdeC',
    email_verified = TRUE
WHERE email IN ('alice.johnson@example.com', 'peter.donovan@example.com');
