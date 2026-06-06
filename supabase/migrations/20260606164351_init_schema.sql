CREATE TABLE IF NOT EXISTS endings (
    ending_id int PRIMARY KEY,
    ending_number int,
    nickname text,
    audio text
);

ALTER TABLE endings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read endings" ON endings
    FOR SELECT
        USING (TRUE);

