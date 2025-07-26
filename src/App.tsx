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
import { LazyPlayerCard } from "@/components/lazy-player-card";
import { InfinitePlayerGrid } from "@/components/infinite-player-grid";
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

// 1978 Topps Baseball Card Collection
const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Lou Brock",
    team: "St. Louis Cardinals",
    position: "Left Field",
    years_active: "1961-1979",
    decade: "1970s",
    image_url: "/images/players/lou-brock.jpg",
    description: "Hall of Fame outfielder and stolen base legend",
    stats: { stolen_bases: 938, hits: 3023, batting_average: 0.293 },
  },
  {
    id: 2,
    name: "Sparky Lyle",
    team: "New York Yankees",
    position: "Pitcher",
    years_active: "1967-1982",
    decade: "Both",
    image_url: "/images/players/sparky-lyle.jpg",
    description: "Relief pitcher and 1977 AL Cy Young Award winner",
    stats: { saves: 238, wins: 99, era: 2.88 },
  },
  {
    id: 3,
    name: "Willie McCovey",
    team: "San Francisco Giants",
    position: "First Base",
    years_active: "1959-1980",
    decade: "1970s",
    image_url: "/images/players/willie-mccovey.jpg",
    description: "Hall of Fame first baseman known as 'Stretch'",
    stats: { home_runs: 521, rbi: 1555, batting_average: 0.27 },
  },
  {
    id: 4,
    name: "Brooks Robinson",
    team: "Baltimore Orioles",
    position: "Third Base",
    years_active: "1955-1977",
    decade: "1970s",
    image_url: "/images/players/brooks-robinson.jpg",
    description:
      "Hall of Fame third baseman known as 'The Human Vacuum Cleaner'",
    stats: { gold_gloves: 16, hits: 2848, batting_average: 0.267 },
  },
  {
    id: 5,
    name: "Pete Rose",
    team: "Cincinnati Reds",
    position: "First Base",
    years_active: "1963-1986",
    decade: "Both",
    image_url: "/images/players/pete-rose.jpg",
    description: "All-time hits leader and key member of the Big Red Machine",
    stats: { hits: 4256, games: 3562, batting_average: 0.303 },
  },
  {
    id: 6,
    name: "Nolan Ryan",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1966-1993",
    decade: "Both",
    image_url: "/images/players/nolan-ryan.jpg",
    description:
      "Hall of Fame pitcher known for his blazing fastball and no-hitters",
    stats: { strikeouts: 5714, no_hitters: 7, era: 3.19 },
  },
  {
    id: 7,
    name: "Reggie Jackson",
    team: "New York Yankees",
    position: "Right Field",
    years_active: "1967-1987",
    decade: "Both",
    image_url: "/images/players/reggie-jackson.jpg",
    description:
      'Known as "Mr. October" for his clutch postseason performances',
    stats: { home_runs: 563, rbi: 1702, batting_average: 0.262 },
  },
  {
    id: 8,
    name: "Mike Sadek",
    team: "San Francisco Giants",
    position: "Catcher",
    years_active: "1973-1981",
    decade: "Both",
    image_url: "/images/players/mike-sadek.jpg",
    description: "Backup catcher for the Giants",
    stats: { batting_average: 0.234, hits: 234, games: 401 },
  },
  {
    id: 9,
    name: "Doug DeCinces",
    team: "Baltimore Orioles",
    position: "Third Base",
    years_active: "1973-1987",
    decade: "Both",
    image_url: "/images/players/doug-decinces.jpg",
    description: "Third baseman who replaced Brooks Robinson",
    stats: { home_runs: 237, rbi: 879, batting_average: 0.259 },
  },
  {
    id: 10,
    name: "Phil Niekro",
    team: "Atlanta Braves",
    position: "Pitcher",
    years_active: "1964-1987",
    decade: "Both",
    image_url: "/images/players/phil-niekro.jpg",
    description: "Hall of Fame knuckleball pitcher",
    stats: { wins: 318, strikeouts: 3342, era: 3.35 },
  },
  {
    id: 11,
    name: "Rick Manning",
    team: "Cleveland Indians",
    position: "Center Field",
    years_active: "1975-1987",
    decade: "Both",
    image_url: "/images/players/rick-manning.jpg",
    description: "Gold Glove center fielder for the Indians",
    stats: { batting_average: 0.257, hits: 1496, stolen_bases: 195 },
  },
  {
    id: 12,
    name: "Don Aase",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1977-1990",
    decade: "Both",
    image_url: "/images/players/don-aase.jpg",
    description: "Relief pitcher and closer",
    stats: { saves: 82, wins: 66, era: 3.8 },
  },
  {
    id: 13,
    name: "Art Howe",
    team: "Pittsburgh Pirates",
    position: "Third Base",
    years_active: "1974-1985",
    decade: "Both",
    image_url: "/images/players/art-howe.jpg",
    description: "Third baseman who later became a manager",
    stats: { batting_average: 0.26, hits: 1202, home_runs: 43 },
  },
  {
    id: 14,
    name: "Lerrin LaGrow",
    team: "Detroit Tigers",
    position: "Pitcher",
    years_active: "1970-1980",
    decade: "1970s",
    image_url: "/images/players/lerrin-lagrow.jpg",
    description: "Relief pitcher for multiple teams",
    stats: { wins: 41, saves: 25, era: 3.35 },
  },
  {
    id: 15,
    name: "Tony Perez",
    team: "Cincinnati Reds",
    position: "First Base",
    years_active: "1964-1986",
    decade: "Both",
    image_url: "/images/players/tony-perez.jpg",
    description: "Hall of Fame first baseman and Big Red Machine member",
    stats: { home_runs: 379, rbi: 1652, batting_average: 0.279 },
  },
  {
    id: 16,
    name: "Roy White",
    team: "New York Yankees",
    position: "Left Field",
    years_active: "1965-1979",
    decade: "1970s",
    image_url: "/images/players/roy-white.jpg",
    description: "Yankees outfielder and switch-hitter",
    stats: { batting_average: 0.271, hits: 1806, home_runs: 160 },
  },
  {
    id: 17,
    name: "Mike Krukow",
    team: "Chicago Cubs",
    position: "Pitcher",
    years_active: "1976-1989",
    decade: "Both",
    image_url: "/images/players/mike-krukow.jpg",
    description: "Starting pitcher who later became a broadcaster",
    stats: { wins: 124, strikeouts: 1197, era: 3.9 },
  },
  {
    id: 18,
    name: "Bobby Grich",
    team: "California Angels",
    position: "Second Base",
    years_active: "1970-1986",
    decade: "Both",
    image_url: "/images/players/bobby-grich.jpg",
    description: "Six-time All-Star second baseman",
    stats: { home_runs: 224, batting_average: 0.266, gold_gloves: 4 },
  },
  {
    id: 19,
    name: "Darrell Porter",
    team: "Kansas City Royals",
    position: "Catcher",
    years_active: "1971-1987",
    decade: "Both",
    image_url: "/images/players/darrell-porter.jpg",
    description: "Catcher and 1980 World Series MVP",
    stats: { home_runs: 188, batting_average: 0.247, rbi: 826 },
  },
  {
    id: 20,
    name: "Pete Rose",
    team: "Cincinnati Reds",
    position: "First Base",
    years_active: "1963-1986",
    decade: "Both",
    image_url: "/images/players/pete-rose.jpg",
    description: "All-time hits leader and key member of the Big Red Machine",
    stats: { hits: 4256, games: 3562, batting_average: 0.303 },
  },
  {
    id: 21,
    name: "Steve Kemp",
    team: "Detroit Tigers",
    position: "Left Field",
    years_active: "1977-1988",
    decade: "Both",
    image_url: "/images/players/steve-kemp.jpg",
    description: "Outfielder and 1979 All-Star",
    stats: { batting_average: 0.278, home_runs: 130, rbi: 634 },
  },
  {
    id: 22,
    name: "Charlie Hough",
    team: "Los Angeles Dodgers",
    position: "Pitcher",
    years_active: "1970-1994",
    decade: "Both",
    image_url: "/images/players/charlie-hough.jpg",
    description: "Knuckleball pitcher with long career",
    stats: { wins: 216, strikeouts: 2362, era: 3.75 },
  },
  {
    id: 23,
    name: "Bump Wills",
    team: "Texas Rangers",
    position: "Second Base",
    years_active: "1977-1982",
    decade: "Both",
    image_url: "/images/players/bump-wills.jpg",
    description: "Second baseman and son of Maury Wills",
    stats: { batting_average: 0.27, stolen_bases: 196, hits: 693 },
  },
  {
    id: 24,
    name: "Don Money",
    team: "Milwaukee Brewers",
    position: "Third Base",
    years_active: "1968-1983",
    decade: "Both",
    image_url: "/images/players/don-money.jpg",
    description: "Four-time All-Star third baseman",
    stats: { batting_average: 0.263, home_runs: 176, hits: 1834 },
  },
  {
    id: 25,
    name: "Jon Matlack",
    team: "New York Mets",
    position: "Pitcher",
    years_active: "1971-1983",
    decade: "Both",
    image_url: "/images/players/jon-matlack.jpg",
    description: "Three-time All-Star pitcher",
    stats: { wins: 125, strikeouts: 1516, era: 3.18 },
  },
  {
    id: 26,
    name: "Richie Hebner",
    team: "Philadelphia Phillies",
    position: "Third Base",
    years_active: "1968-1985",
    decade: "Both",
    image_url: "/images/players/richie-hebner.jpg",
    description: "Third baseman and power hitter",
    stats: { home_runs: 203, batting_average: 0.277, rbi: 890 },
  },
  {
    id: 27,
    name: "Geoff Zahn",
    team: "Chicago Cubs",
    position: "Pitcher",
    years_active: "1973-1985",
    decade: "Both",
    image_url: "/images/players/geoff-zahn.jpg",
    description: "Left-handed starting pitcher",
    stats: { wins: 111, era: 3.74, strikeouts: 713 },
  },
  {
    id: 28,
    name: "Ed Ott",
    team: "Pittsburgh Pirates",
    position: "Catcher",
    years_active: "1974-1981",
    decade: "Both",
    image_url: "/images/players/ed-ott.jpg",
    description: "Catcher for the Pirates",
    stats: { batting_average: 0.259, home_runs: 33, hits: 401 },
  },
  {
    id: 29,
    name: "Bob Lacey",
    team: "Oakland Athletics",
    position: "Pitcher",
    years_active: "1977-1984",
    decade: "Both",
    image_url: "/images/players/bob-lacey.jpg",
    description: "Relief pitcher for the Athletics",
    stats: { wins: 15, saves: 8, era: 4.15 },
  },
  {
    id: 30,
    name: "George Hendrick",
    team: "San Diego Padres",
    position: "Right Field",
    years_active: "1971-1988",
    decade: "Both",
    image_url: "/images/players/george-hendrick.jpg",
    description: "Four-time All-Star outfielder",
    stats: { home_runs: 267, batting_average: 0.278, rbi: 1111 },
  },
  {
    id: 31,
    name: "Glenn Abbott",
    team: "Oakland Athletics",
    position: "Pitcher",
    years_active: "1973-1984",
    decade: "Both",
    image_url: "/images/players/glenn-abbott.jpg",
    description: "Starting pitcher for the Athletics",
    stats: { wins: 62, era: 4.39, strikeouts: 471 },
  },
  {
    id: 32,
    name: "Garry Templeton",
    team: "St. Louis Cardinals",
    position: "Shortstop",
    years_active: "1976-1991",
    decade: "Both",
    image_url: "/images/players/garry-templeton.jpg",
    description: "Three-time All-Star shortstop",
    stats: { batting_average: 0.271, hits: 2126, stolen_bases: 243 },
  },
  {
    id: 33,
    name: "Dave Lemanczyk",
    team: "Toronto Blue Jays",
    position: "Pitcher",
    years_active: "1973-1980",
    decade: "1970s",
    image_url: "/images/players/dave-lemanczyk.jpg",
    description: "Starting pitcher for the Blue Jays",
    stats: { wins: 31, era: 4.62, strikeouts: 298 },
  },
  {
    id: 34,
    name: "Willie McCovey",
    team: "San Francisco Giants",
    position: "First Base",
    years_active: "1959-1980",
    decade: "1970s",
    image_url: "/images/players/willie-mccovey.jpg",
    description: "Hall of Fame first baseman known as 'Stretch'",
    stats: { home_runs: 521, rbi: 1555, batting_average: 0.27 },
  },
  {
    id: 35,
    name: "Sparky Lyle",
    team: "New York Yankees",
    position: "Pitcher",
    years_active: "1967-1982",
    decade: "Both",
    image_url: "/images/players/sparky-lyle.jpg",
    description: "Relief pitcher and 1977 AL Cy Young Award winner",
    stats: { saves: 238, wins: 99, era: 2.88 },
  },
  {
    id: 36,
    name: "Eddie Murray",
    team: "Baltimore Orioles",
    position: "First Base",
    years_active: "1977-1997",
    decade: "Both",
    image_url: "/images/players/eddie-murray.jpg",
    description: "Hall of Fame first baseman and switch-hitter",
    stats: { home_runs: 504, rbi: 1917, batting_average: 0.287 },
  },
  {
    id: 37,
    name: "Rick Waits",
    team: "Cleveland Indians",
    position: "Pitcher",
    years_active: "1973-1985",
    decade: "Both",
    image_url: "/images/players/rick-waits.jpg",
    description: "Starting pitcher for the Indians",
    stats: { wins: 79, era: 4.45, strikeouts: 567 },
  },
  {
    id: 38,
    name: "Willie Montanez",
    team: "Atlanta Braves",
    position: "First Base",
    years_active: "1966-1982",
    decade: "Both",
    image_url: "/images/players/willie-montanez.jpg",
    description: "First baseman and outfielder",
    stats: { batting_average: 0.275, home_runs: 139, hits: 1606 },
  },
  {
    id: 39,
    name: "Floyd Bannister",
    team: "Houston Astros",
    position: "Pitcher",
    years_active: "1977-1992",
    decade: "Both",
    image_url: "/images/players/floyd-bannister.jpg",
    description: "Left-handed starting pitcher",
    stats: { wins: 134, strikeouts: 1723, era: 4.06 },
  },
  {
    id: 40,
    name: "Carl Yastrzemski",
    team: "Boston Red Sox",
    position: "Left Field",
    years_active: "1961-1983",
    decade: "1970s",
    image_url: "/images/players/carl-yastrzemski.jpg",
    description: "Hall of Fame outfielder and 1967 Triple Crown winner",
    stats: { home_runs: 452, batting_average: 0.285, hits: 3419 },
  },
  {
    id: 41,
    name: "Burt Hooton",
    team: "Los Angeles Dodgers",
    position: "Pitcher",
    years_active: "1971-1985",
    decade: "Both",
    image_url: "/images/players/burt-hooton.jpg",
    description: "Starting pitcher and knuckleball specialist",
    stats: { wins: 151, strikeouts: 1491, era: 3.38 },
  },
  {
    id: 42,
    name: "Jorge Orta",
    team: "Chicago White Sox",
    position: "Second Base",
    years_active: "1972-1987",
    decade: "Both",
    image_url: "/images/players/jorge-orta.jpg",
    description: "Second baseman and outfielder",
    stats: { batting_average: 0.278, hits: 1700, home_runs: 130 },
  },
  {
    id: 43,
    name: "Bill Atkinson",
    team: "Montreal Expos",
    position: "Pitcher",
    years_active: "1978-1980",
    decade: "Both",
    image_url: "/images/players/bill-atkinson.jpg",
    description: "Relief pitcher for the Expos",
    stats: { wins: 4, saves: 1, era: 4.5 },
  },
  {
    id: 44,
    name: "Toby Harrah",
    team: "Texas Rangers",
    position: "Shortstop",
    years_active: "1969-1986",
    decade: "Both",
    image_url: "/images/players/toby-harrah.jpg",
    description: "Four-time All-Star infielder",
    stats: { batting_average: 0.264, hits: 1954, home_runs: 195 },
  },
  {
    id: 45,
    name: "Mark Fidrych",
    team: "Detroit Tigers",
    position: "Pitcher",
    years_active: "1976-1980",
    decade: "1970s",
    image_url: "/images/players/mark-fidrych.jpg",
    description: "Rookie of the Year and 'The Bird'",
    stats: { wins: 29, era: 3.1, strikeouts: 170 },
  },
  {
    id: 46,
    name: "Al Cowens",
    team: "Kansas City Royals",
    position: "Right Field",
    years_active: "1974-1986",
    decade: "Both",
    image_url: "/images/players/al-cowens.jpg",
    description: "Outfielder and 1977 AL MVP runner-up",
    stats: { batting_average: 0.27, hits: 1396, home_runs: 108 },
  },
  {
    id: 47,
    name: "Jack Billingham",
    team: "Cincinnati Reds",
    position: "Pitcher",
    years_active: "1968-1980",
    decade: "Both",
    image_url: "/images/players/jack-billingham.jpg",
    description: "Starting pitcher for the Big Red Machine",
    stats: { wins: 145, era: 3.83, strikeouts: 1203 },
  },
  {
    id: 48,
    name: "Don Baylor",
    team: "California Angels",
    position: "Designated Hitter",
    years_active: "1970-1988",
    decade: "Both",
    image_url: "/images/players/don-baylor.jpg",
    description: "1979 AL MVP and World Series champion",
    stats: { home_runs: 338, rbi: 1276, batting_average: 0.26 },
  },
  {
    id: 49,
    name: "Ed Kranepool",
    team: "New York Mets",
    position: "First Base",
    years_active: "1962-1979",
    decade: "1970s",
    image_url: "/images/players/ed-kranepool.jpg",
    description: "Longtime Mets first baseman",
    stats: { batting_average: 0.261, hits: 1418, home_runs: 118 },
  },
  {
    id: 50,
    name: "Rick Reuschel",
    team: "Chicago Cubs",
    position: "Pitcher",
    years_active: "1972-1991",
    decade: "Both",
    image_url: "/images/players/rick-reuschel.jpg",
    description: "Three-time All-Star pitcher",
    stats: { wins: 214, strikeouts: 2015, era: 3.37 },
  },
  {
    id: 51,
    name: "Dick Pole",
    team: "Seattle Mariners",
    position: "Pitcher",
    years_active: "1973-1978",
    decade: "1970s",
    image_url: "/images/players/dick-pole.jpg",
    description: "Pitcher for the Seattle Mariners",
    stats: { wins: 19, losses: 25, era: 4.65, strikeouts: 156 },
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
    // Temporarily disabled for debugging
    // const playerNames = players.map((player) => player.name);
    // prefetchPlayerImages(playerNames);
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
            Explore the complete 1978 Topps baseball card collection featuring
            the greatest players from the 1970s and 1980s
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
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <LazyPlayerCard
                key={player.id}
                player={player}
                getDecadeBadgeColor={getDecadeBadgeColor}
              />
            ))}
          </div>
        ) : (
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
