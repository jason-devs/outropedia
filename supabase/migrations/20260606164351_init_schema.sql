CREATE TABLE IF NOT EXISTS endings (
    ending_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ending_number int NOT NULL UNIQUE,
    nickname text NOT NULL,
    audio_path text NOT NULL,
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE endings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read endings" ON endings
    FOR SELECT
        USING (TRUE);

