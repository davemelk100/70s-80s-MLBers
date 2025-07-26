# Database Architecture for 1978-1979 Topps Baseball Card Collection

## Overview

This database is designed to handle baseball card collections from the 1978 and 1979 Topps sets, with support for players who appear in both sets. The architecture is optimized for:

- **Multi-set support**: Players can appear in both 1978 and 1979 sets
- **Flexible stats storage**: JSON-based stats with structured backup
- **Efficient querying**: Indexed views for common operations
- **Scalability**: Ready for additional Topps sets

## Database Schema

### Core Tables

#### `players` Table

Stores unique player information that doesn't change between sets.

```sql
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
```

#### `sets` Table

Stores information about each Topps set.

```sql
CREATE TABLE sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    total_cards INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `cards` Table

Links players to specific sets with card-specific data.

```sql
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
```

#### `player_stats` Table

Stores structured career statistics for each player.

```sql
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
```

### Views

#### `card_details` View

Provides easy access to complete card information with player and set data.

```sql
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
```

#### `players_in_both_sets` View

Identifies players who appear in both 1978 and 1979 sets.

```sql
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
```

## Key Design Decisions

### 1. Player-Card Separation

- **Players table**: Contains immutable player data (name, position, years_active, decade)
- **Cards table**: Contains set-specific data (team, card_number, image_url, stats_json)
- **Rationale**: Many players appear in both 1978 and 1979 sets, often with different teams or stats

### 2. Dual Stats Storage

- **stats_json**: Flexible JSON storage for card-specific stats
- **player_stats**: Structured storage for career statistics
- **Rationale**: Provides flexibility while maintaining data integrity

### 3. Set-Based Architecture

- **sets table**: Defines available Topps sets
- **set_id foreign key**: Links cards to specific sets
- **Rationale**: Easy to add 1980, 1981, etc. Topps sets in the future

### 4. Unique Constraints

- **UNIQUE(set_id, card_number)**: Ensures no duplicate card numbers within a set
- **UNIQUE(player_id, stat_type, stat_name)**: Prevents duplicate stats
- **Rationale**: Maintains data integrity

## Indexes for Performance

```sql
CREATE INDEX idx_cards_player_id ON cards(player_id);
CREATE INDEX idx_cards_set_id ON cards(set_id);
CREATE INDEX idx_cards_set_number ON cards(set_id, card_number);
CREATE INDEX idx_player_stats_player_id ON player_stats(player_id);
CREATE INDEX idx_players_name ON players(name);
CREATE INDEX idx_players_decade ON players(decade);
CREATE INDEX idx_players_position ON players(position);
```

## Common Queries

### Get all cards from 1978 set

```sql
SELECT * FROM card_details WHERE set_year = 1978 ORDER BY card_number;
```

### Get players in both sets

```sql
SELECT * FROM players_in_both_sets;
```

### Get cards by decade

```sql
SELECT * FROM card_details WHERE decade = '1970s' ORDER BY set_year, card_number;
```

### Get player's all cards

```sql
SELECT * FROM card_details WHERE player_id = ? ORDER BY set_year, card_number;
```

### Search cards

```sql
SELECT * FROM card_details
WHERE name LIKE '%Brock%' OR team LIKE '%Cardinals%'
ORDER BY set_year, card_number;
```

## Data Migration Strategy

### From Current App.tsx Structure

1. **Extract players**: Create unique player records from current `mockPlayers`
2. **Create cards**: Generate card records for each player in the 1978 set
3. **Parse stats**: Convert current stats objects to JSON strings
4. **Add 1979 data**: Import 1979 Topps checklist data

### Adding New Sets

1. **Insert set record**: Add new set to `sets` table
2. **Import checklist**: Use Baseball Almanac or similar source
3. **Match players**: Link existing players or create new ones
4. **Add cards**: Create card records for the new set

## TypeScript Integration

The database schema is fully typed with TypeScript interfaces:

- `Player`: Core player information
- `Card`: Individual card data
- `CardDetails`: Complete card information with player and set data
- `PlayerStats`: Parsed statistics
- `FilterOptions`: Query parameters
- `CardsResponse`: Paginated results

## Future Enhancements

### Planned Features

1. **Image management**: Track image sources and versions
2. **Condition tracking**: Card condition and grading
3. **Collection management**: User collections and wishlists
4. **Price tracking**: Historical card values
5. **Advanced stats**: Season-by-season statistics

### Scalability Considerations

1. **Partitioning**: Partition cards table by set_year for large datasets
2. **Caching**: Redis cache for frequently accessed data
3. **Search optimization**: Full-text search indexes
4. **API versioning**: RESTful API with versioning support

## Implementation Notes

### Current Status

- ✅ Database schema defined
- ✅ TypeScript interfaces created
- ✅ Mock database implementation
- ✅ Basic CRUD operations
- 🔄 Frontend integration (in progress)
- ⏳ Real database connection (planned)

### Next Steps

1. **Database setup**: Create actual SQLite/PostgreSQL database
2. **Data import**: Migrate current App.tsx data
3. **API endpoints**: Create REST API for database operations
4. **Frontend updates**: Replace mock data with database calls
5. **1979 data**: Import 1979 Topps checklist
