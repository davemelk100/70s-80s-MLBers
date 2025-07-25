-- Create the baseball players database
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    years_active VARCHAR(20) NOT NULL,
    decade VARCHAR(10) NOT NULL CHECK (decade IN ('1970s', '1980s', 'Both')),
    image_url VARCHAR(500) NOT NULL,
    description TEXT,
    stats JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_players_decade ON players(decade);
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team);
CREATE INDEX IF NOT EXISTS idx_players_position ON players(position);
