// Database types for 1978-1979 Topps Baseball Card Collection

export interface Player {
  id: number;
  name: string;
  position: string;
  years_active: string;
  decade: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Set {
  id: number;
  year: number;
  name: string;
  total_cards: number;
  description?: string;
  created_at: string;
}

export interface Card {
  id: number;
  player_id: number;
  set_id: number;
  card_number: number;
  team: string;
  image_url?: string;
  stats_json?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PlayerStat {
  id: number;
  player_id: number;
  stat_type: string; // 'career', 'season_1978', 'season_1979', etc.
  stat_name: string; // 'hits', 'home_runs', 'wins', 'era', etc.
  stat_value: number;
  created_at: string;
}

export interface CardDetails {
  card_id: number;
  card_number: number;
  team: string;
  image_url?: string;
  stats_json?: string;
  notes?: string;
  player_id: number;
  name: string;
  position: string;
  years_active: string;
  decade: string;
  player_description?: string;
  set_year: number;
  set_name: string;
}

export interface PlayerInBothSets {
  id: number;
  name: string;
  position: string;
  years_active: string;
  decade: string;
  card_1978: number;
  team_1978: string;
  card_1979: number;
  team_1979: string;
}

// Parsed stats interface for the stats_json field
export interface PlayerStats {
  hits?: number;
  home_runs?: number;
  batting_average?: number;
  stolen_bases?: number;
  rbi?: number;
  wins?: number;
  losses?: number;
  era?: number;
  strikeouts?: number;
  saves?: number;
  games?: number;
  walks?: number;
  gold_gloves?: number;
  all_star_games?: number;
  no_hitters?: number;
}

// Filter options for the frontend
export interface FilterOptions {
  set_year?: number;
  decade?: string;
  position?: string;
  search_term?: string;
  page?: number;
  page_size?: number;
}

// API response types
export interface CardsResponse {
  cards: CardDetails[];
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface PlayerResponse {
  player: Player;
  cards: CardDetails[];
  stats: PlayerStat[];
}

export interface SetsResponse {
  sets: Set[];
}

// Database query types
export interface CreatePlayerData {
  name: string;
  position: string;
  years_active: string;
  decade: string;
  description?: string;
}

export interface CreateCardData {
  player_id: number;
  set_id: number;
  card_number: number;
  team: string;
  image_url?: string;
  stats_json?: string;
  notes?: string;
}

export interface UpdateCardData {
  team?: string;
  image_url?: string;
  stats_json?: string;
  notes?: string;
} 