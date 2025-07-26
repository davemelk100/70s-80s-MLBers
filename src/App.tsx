import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BeerIcon as Baseball,
  Calendar,
  MapPin,
  Trophy,
  RefreshCw,
} from "lucide-react";
import { PlayerImage } from "@/components/player-image";
import {
  prefetchPlayerImages,
  clearImageCache,
} from "@/utils/image-prefetcher";

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  years_active: string;
  decade: string;
  image_url: string;
  description: string;
  stats: Record<string, any>;
}

// Mock data for demonstration - using Wikimedia Commons images
const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Reggie Jackson",
    team: "New York Yankees",
    position: "Right Field",
    years_active: "1967-1987",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Reggie_Jackson_-_New_York_Yankees_-_1981.jpg",
    description:
      'Known as "Mr. October" for his clutch postseason performances',
    stats: { home_runs: 563, rbi: 1702, batting_average: 0.262 },
  },
  {
    id: 2,
    name: "Pete Rose",
    team: "Cincinnati Reds",
    position: "First Base",
    years_active: "1963-1986",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rose_walking_onto_field.jpg/960px-Rose_walking_onto_field.jpg",
    description: "All-time hits leader and key member of the Big Red Machine",
    stats: { hits: 4256, games: 3562, batting_average: 0.303 },
  },
  {
    id: 3,
    name: "Nolan Ryan",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1966-1993",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Nolan_Ryan_in_Atlanta_close-up.jpg",
    description:
      "Hall of Fame pitcher known for his blazing fastball and no-hitters",
    stats: { strikeouts: 5714, no_hitters: 7, era: 3.19 },
  },
  {
    id: 4,
    name: "George Brett",
    team: "Kansas City Royals",
    position: "Third Base",
    years_active: "1973-1993",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/George_Brett_1990_CROP.jpg",
    description: "Royals legend who nearly hit .400 in 1980",
    stats: { batting_average: 0.305, home_runs: 317, hits: 3154 },
  },
  {
    id: 5,
    name: "Tony Gwynn",
    team: "San Diego Padres",
    position: "Right Field",
    years_active: "1982-2001",
    decade: "1980s",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Tony_Gwynn_83.jpg",
    description: "Master contact hitter with 8 batting titles",
    stats: { batting_average: 0.338, hits: 3141, stolen_bases: 319 },
  },
  {
    id: 6,
    name: "Mike Schmidt",
    team: "Philadelphia Phillies",
    position: "Third Base",
    years_active: "1972-1989",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/Mike_Schmidt_Press_Box.jpg",
    description: "Hall of Fame third baseman and three-time MVP",
    stats: { home_runs: 548, rbi: 1595, gold_gloves: 10 },
  },
  {
    id: 7,
    name: "Willie Mays Aikens",
    team: "Kansas City Royals",
    position: "First Base",
    years_active: "1977-1985",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Willie_Mays_Aikens.jpg",
    description:
      "Power-hitting first baseman for the Royals during their championship era",
    stats: { home_runs: 110, rbi: 415, batting_average: 0.271 },
  },
  {
    id: 8,
    name: "Tom Veryzer",
    team: "Detroit Tigers",
    position: "Shortstop",
    years_active: "1973-1984",
    decade: "Both",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Tom_Veryzer_1975.jpg",
    description: "Solid defensive shortstop for the Tigers and other teams",
    stats: { batting_average: 0.241, hits: 1001, games: 1208 },
  },
];

export default function App() {
  const [players] = useState<Player[]>(mockPlayers);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(mockPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDecade, setSelectedDecade] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Start prefetching images when component mounts
  useEffect(() => {
    const playerNames = players.map((player) => player.name);
    prefetchPlayerImages(playerNames);
  }, [players]);

  const handleRefreshImages = async () => {
    setIsRefreshing(true);
    clearImageCache(); // Clear cache to force fresh downloads
    const playerNames = players.map((player) => player.name);
    await prefetchPlayerImages(playerNames);
    setIsRefreshing(false);
  };

  useEffect(() => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.team.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDecade !== "all") {
      if (selectedDecade === "70s and 80s") {
        // Show players from both 1970s and 1980s decades
        filtered = filtered.filter(
          (player) =>
            player.decade === "1970s" ||
            player.decade === "1980s" ||
            player.decade === "Both"
        );
      } else {
        // Show players from specific decade or "Both"
        filtered = filtered.filter(
          (player) =>
            player.decade === selectedDecade || player.decade === "Both"
        );
      }
    }

    if (selectedPosition !== "all") {
      filtered = filtered.filter(
        (player) => player.position === selectedPosition
      );
    }

    setFilteredPlayers(filtered);
  }, [searchTerm, selectedDecade, selectedPosition, players]);

  const getDecadeBadgeColor = (decade: string) => {
    switch (decade) {
      case "1970s":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "1980s":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Both":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "70s and 80s":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Baseball className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Baseball Legends Database
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the greatest baseball players from the 1970s and 1980s with
            their iconic images and career statistics
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search players or teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDecade} onValueChange={setSelectedDecade}>
              <SelectTrigger>
                <SelectValue placeholder="Select decade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Decades</SelectItem>
                <SelectItem value="1970s">1970s</SelectItem>
                <SelectItem value="1980s">1980s</SelectItem>
                <SelectItem value="70s and 80s">70s and 80s</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedPosition}
              onValueChange={setSelectedPosition}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Pitcher">Pitcher</SelectItem>
                <SelectItem value="Catcher">Catcher</SelectItem>
                <SelectItem value="First Base">First Base</SelectItem>
                <SelectItem value="Second Base">Second Base</SelectItem>
                <SelectItem value="Third Base">Third Base</SelectItem>
                <SelectItem value="Shortstop">Shortstop</SelectItem>
                <SelectItem value="Left Field">Left Field</SelectItem>
                <SelectItem value="Center Field">Center Field</SelectItem>
                <SelectItem value="Right Field">Right Field</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleRefreshImages}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh Images"}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPlayers.length} of {players.length} players
          </p>
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <Card
              key={player.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[3/4] relative bg-gray-100">
                <PlayerImage
                  src={player.image_url}
                  alt={`${player.name} baseball card`}
                  className="rounded-t-lg"
                  playerName={player.name}
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                    {player.name}
                  </CardTitle>
                  <Badge className={getDecadeBadgeColor(player.decade)}>
                    {player.decade}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {player.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{player.team}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-gray-400" />
                    <span>{player.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{player.years_active}</span>
                  </div>

                  {/* Key Stats */}
                  <div className="pt-2 border-t">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Key Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(player.stats)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-500 capitalize">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span className="font-medium">
                              {typeof value === "number" &&
                              value < 1 &&
                              value > 0
                                ? value.toFixed(3)
                                : value.toLocaleString()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <Baseball className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No players found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Footer with image source info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              Player images sourced from{" "}
              <a
                href="https://commons.wikimedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Wikimedia Commons
              </a>{" "}
              under open license
            </p>
            <p>
              All images are freely available for use under Creative Commons
              licenses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
