// Database utilities for 1978-1979 Topps Baseball Card Collection

import type {
  CardDetails,
  FilterOptions,
  CardsResponse,
  PlayerResponse,
  PlayerStats,
  CreatePlayerData,
  CreateCardData,
  UpdateCardData,
} from "@/types/database";

// Mock database for now - replace with actual database connection
class MockDatabase {
  private cards: CardDetails[] = [];
  private players: any[] = [];
  private sets: any[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with the current 33 players from App.tsx
    this.sets = [
      { id: 1, year: 1978, name: "1978 Topps Baseball", total_cards: 726 },
      { id: 2, year: 1979, name: "1979 Topps Baseball", total_cards: 726 },
    ];

    // Mock cards data - this would come from the actual database
    this.cards = [
      {
        card_id: 1,
        card_number: 1,
        team: "St. Louis Cardinals",
        image_url: "/images/players/lou-brock.jpg",
        stats_json:
          '{"stolen_bases": 938, "hits": 3023, "batting_average": 0.293}',
        notes: "77 Record Breaker Card",
        player_id: 1,
        name: "Lou Brock",
        position: "Left Field",
        years_active: "1961-1979",
        decade: "1970s",
        player_description: "Hall of Fame outfielder and stolen base legend",
        set_year: 1978,
        set_name: "1978 Topps Baseball",
      },
      // Add more mock cards here...
    ];
  }

  // Get cards with filtering and pagination
  async getCards(options: FilterOptions = {}): Promise<CardsResponse> {
    let filteredCards = [...this.cards];

    // Apply filters
    if (options.set_year) {
      filteredCards = filteredCards.filter(
        (card) => card.set_year === options.set_year
      );
    }

    if (options.decade && options.decade !== "all") {
      if (options.decade === "70s and 80s") {
        filteredCards = filteredCards.filter(
          (card) =>
            card.decade === "1970s" ||
            card.decade === "1980s" ||
            card.decade === "Both"
        );
      } else {
        filteredCards = filteredCards.filter(
          (card) => card.decade === options.decade
        );
      }
    }

    if (options.position && options.position !== "all") {
      filteredCards = filteredCards.filter(
        (card) => card.position === options.position
      );
    }

    if (options.search_term) {
      const searchTerm = options.search_term.toLowerCase();
      filteredCards = filteredCards.filter(
        (card) =>
          card.name.toLowerCase().includes(searchTerm) ||
          card.team.toLowerCase().includes(searchTerm) ||
          card.position.toLowerCase().includes(searchTerm)
      );
    }

    // Apply pagination
    const page = options.page || 1;
    const pageSize = options.page_size || 10;
    const totalCount = filteredCards.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCards = filteredCards.slice(startIndex, endIndex);

    return {
      cards: paginatedCards,
      total_count: totalCount,
      page,
      page_size: pageSize,
      total_pages: totalPages,
    };
  }

  // Get a single player with all their cards
  async getPlayer(playerId: number): Promise<PlayerResponse | null> {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) return null;

    const playerCards = this.cards.filter(
      (card) => card.player_id === playerId
    );
    const stats = this.parseStatsFromCards(playerCards);

    return {
      player,
      cards: playerCards,
      stats,
    };
  }

  // Get all sets
  async getSets() {
    return this.sets;
  }

  // Get players who appear in both sets
  async getPlayersInBothSets() {
    const playerIds = new Set();
    const bothSetsPlayers = new Map();

    // Find players in both sets
    this.cards.forEach((card) => {
      if (card.set_year === 1978) {
        playerIds.add(card.player_id);
      }
    });

    this.cards.forEach((card) => {
      if (card.set_year === 1979 && playerIds.has(card.player_id)) {
        bothSetsPlayers.set(card.player_id, {
          id: card.player_id,
          name: card.name,
          position: card.position,
          years_active: card.years_active,
          decade: card.decade,
          card_1978: null,
          team_1978: null,
          card_1979: card.card_number,
          team_1979: card.team,
        });
      }
    });

    // Add 1978 card info
    this.cards.forEach((card) => {
      if (card.set_year === 1978 && bothSetsPlayers.has(card.player_id)) {
        const player = bothSetsPlayers.get(card.player_id);
        player.card_1978 = card.card_number;
        player.team_1978 = card.team;
      }
    });

    return Array.from(bothSetsPlayers.values());
  }

  // Parse stats from cards
  private parseStatsFromCards(cards: CardDetails[]): any[] {
    const stats: any[] = [];

    cards.forEach((card) => {
      if (card.stats_json) {
        try {
          const parsedStats = JSON.parse(card.stats_json);
          Object.entries(parsedStats).forEach(([statName, statValue]) => {
            stats.push({
              id: stats.length + 1,
              player_id: card.player_id,
              stat_type: "career",
              stat_name: statName,
              stat_value: statValue,
              created_at: new Date().toISOString(),
            });
          });
        } catch (error) {
          console.error("Error parsing stats JSON:", error);
        }
      }
    });

    return stats;
  }

  // Create a new player
  async createPlayer(playerData: CreatePlayerData) {
    const newPlayer = {
      id: this.players.length + 1,
      ...playerData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  // Create a new card
  async createCard(cardData: CreateCardData) {
    const newCard = {
      id: this.cards.length + 1,
      ...cardData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // Note: This is a mock implementation - in real app, this would be properly typed
    this.cards.push(newCard as unknown as CardDetails);
    return newCard;
  }

  // Update a card
  async updateCard(cardId: number, updateData: UpdateCardData) {
    const cardIndex = this.cards.findIndex((card) => card.card_id === cardId);
    if (cardIndex === -1) return null;

    this.cards[cardIndex] = {
      ...this.cards[cardIndex],
      ...updateData,
      // Note: updated_at is not in CardDetails type but needed for mock implementation
    } as CardDetails;

    return this.cards[cardIndex];
  }

  // Delete a card
  async deleteCard(cardId: number) {
    const cardIndex = this.cards.findIndex((card) => card.card_id === cardId);
    if (cardIndex === -1) return false;

    this.cards.splice(cardIndex, 1);
    return true;
  }
}

// Export singleton instance
export const db = new MockDatabase();

// Utility functions
export const parseStats = (statsJson: string): PlayerStats => {
  try {
    return JSON.parse(statsJson);
  } catch (error) {
    console.error("Error parsing stats JSON:", error);
    return {};
  }
};

export const formatStats = (stats: PlayerStats): string => {
  const formattedStats: string[] = [];

  if (stats.hits) formattedStats.push(`${stats.hits} hits`);
  if (stats.home_runs) formattedStats.push(`${stats.home_runs} HR`);
  if (stats.batting_average)
    formattedStats.push(`.${Math.round(stats.batting_average * 1000)} avg`);
  if (stats.stolen_bases) formattedStats.push(`${stats.stolen_bases} SB`);
  if (stats.rbi) formattedStats.push(`${stats.rbi} RBI`);
  if (stats.wins) formattedStats.push(`${stats.wins} wins`);
  if (stats.era) formattedStats.push(`${stats.era} ERA`);
  if (stats.strikeouts) formattedStats.push(`${stats.strikeouts} K`);
  if (stats.saves) formattedStats.push(`${stats.saves} saves`);

  return formattedStats.join(", ");
};

export const getDecadeBadgeColor = (decade: string): string => {
  switch (decade) {
    case "1970s":
      return "bg-orange-100 text-orange-800";
    case "1980s":
      return "bg-blue-100 text-blue-800";
    case "Both":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
