CREATE TABLE IF NOT EXISTS endings (
    ending_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ending_number int NOT NULL,
    nickname text NOT NULL,
    audio_path text NOT NULL,
    info text NOT NULL
);

ALTER TABLE endings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read endings" ON endings
    FOR SELECT
        USING (TRUE);

