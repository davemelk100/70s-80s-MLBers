-- Database schema for 1978-1979 Topps Baseball Card Collection
-- This schema supports players appearing in both 1978 and 1979 sets

-- Players table - stores unique player information
CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    years_active TEXT NOT NULL,
    decade TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sets table - stores information about each Topps set
CREATE TABLE sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    total_cards INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cards table - stores individual card information
-- Links players to specific sets with card-specific data
CREATE TABLE cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    set_id INTEGER NOT NULL,
    card_number INTEGER NOT NULL,
    team TEXT NOT NULL,
    image_url TEXT,
    stats_json TEXT, -- JSON string containing player stats for this card
    notes TEXT, -- Special notes like "Rookie Card", "Record Breaker", etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (set_id) REFERENCES sets(id),
    UNIQUE(set_id, card_number) -- Ensures unique card numbers within each set
);

-- Player stats table - stores career statistics for each player
CREATE TABLE player_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    stat_type TEXT NOT NULL, -- 'career', 'season_1978', 'season_1979', etc.
    stat_name TEXT NOT NULL, -- 'hits', 'home_runs', 'wins', 'era', etc.
    stat_value REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id),
    UNIQUE(player_id, stat_type, stat_name)
);

-- Insert the two Topps sets
INSERT INTO sets (year, name, total_cards, description) VALUES
(1978, '1978 Topps Baseball', 726, 'The complete 1978 Topps baseball card set featuring 726 cards'),
(1979, '1979 Topps Baseball', 726, 'The complete 1979 Topps baseball card set featuring 726 cards');

-- Create indexes for better performance
CREATE INDEX idx_cards_player_id ON cards(player_id);
CREATE INDEX idx_cards_set_id ON cards(set_id);
CREATE INDEX idx_cards_set_number ON cards(set_id, card_number);
CREATE INDEX idx_player_stats_player_id ON player_stats(player_id);
CREATE INDEX idx_players_name ON players(name);
CREATE INDEX idx_players_decade ON players(decade);
CREATE INDEX idx_players_position ON players(position);

-- Create a view for easy querying of cards with player and set information
CREATE VIEW card_details AS
SELECT 
    c.id as card_id,
    c.card_number,
    c.team,
    c.image_url,
    c.stats_json,
    c.notes,
    p.id as player_id,
    p.name,
    p.position,
    p.years_active,
    p.decade,
    p.description as player_description,
    s.year as set_year,
    s.name as set_name
FROM cards c
JOIN players p ON c.player_id = p.id
JOIN sets s ON c.set_id = s.id
ORDER BY s.year, c.card_number;

-- Create a view for players who appear in both sets
CREATE VIEW players_in_both_sets AS
SELECT 
    p.id,
    p.name,
    p.position,
    p.years_active,
    p.decade,
    c1978.card_number as card_1978,
    c1978.team as team_1978,
    c1979.card_number as card_1979,
    c1979.team as team_1979
FROM players p
JOIN cards c1978 ON p.id = c1978.player_id AND c1978.set_id = 1
JOIN cards c1979 ON p.id = c1979.player_id AND c1979.set_id = 2
ORDER BY p.name;
