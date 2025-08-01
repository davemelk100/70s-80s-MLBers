import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Original players from the backup
const originalPlayers = [
  {
    id: -1,
    name: "Checklist 1",
    team: "1978 Topps",
    position: "Checklist",
    years_active: "1978",
    decade: "1970s",
    image_url: "/images/players/checklist-1.jpg",
    description: "Complete 1978 Topps Baseball Card Checklist",
    stats: { total_cards: 726, set_year: 1978 },
  },
  {
    id: -2,
    name: "Checklist 2",
    team: "1978 Topps",
    position: "Checklist",
    years_active: "1978",
    decade: "1970s",
    image_url: "/images/players/checklist.jpg",
    description: "Complete 1978 Topps Baseball Card Checklist",
    stats: { total_cards: 726, set_year: 1978 },
  },
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
    name: "Dick Pole",
    team: "San Francisco Giants",
    position: "Pitcher",
    years_active: "1973-1978",
    decade: "1970s",
    image_url: "/images/players/dick-pole.png",
    description: "Pitcher for the San Francisco Giants",
    stats: { wins: 25, losses: 30, era: 4.65 },
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    name: "Willie McCovey",
    team: "San Francisco Giants",
    position: "First Base",
    years_active: "1959-1980",
    decade: "Both",
    image_url: "/images/players/willie-mccovey.jpg",
    description: "Hall of Fame first baseman and power hitter",
    stats: { home_runs: 521, rbi: 1555, batting_average: 0.27 },
  },
  {
    id: 8,
    name: "Carl Yastrzemski",
    team: "Boston Red Sox",
    position: "Left Field",
    years_active: "1961-1983",
    decade: "Both",
    image_url: "/images/players/carl-yasrzemski.jpg",
    description: "Hall of Fame outfielder and 1967 Triple Crown winner",
    stats: { home_runs: 452, hits: 3419, batting_average: 0.285 },
  },
  {
    id: 9,
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
    id: 10,
    name: "Steve Garvey",
    team: "Los Angeles Dodgers",
    position: "First Base",
    years_active: "1969-1987",
    decade: "Both",
    image_url: "/images/players/steve-garvey.jpg",
    description: "All-Star first baseman and NL MVP",
    stats: { hits: 2599, home_runs: 272, batting_average: 0.294 },
  },
  {
    id: 11,
    name: "Don Sutton",
    team: "Los Angeles Dodgers",
    position: "Pitcher",
    years_active: "1966-1988",
    decade: "Both",
    image_url: "/images/players/don-sutton.jpg",
    description: "Hall of Fame pitcher with 324 career wins",
    stats: { wins: 324, losses: 256, era: 3.26 },
  },
  {
    id: 12,
    name: "Phil Niekro",
    team: "Atlanta Braves",
    position: "Pitcher",
    years_active: "1964-1987",
    decade: "Both",
    image_url: "/images/players/phil-niekro.jpg",
    description: "Hall of Fame knuckleball pitcher",
    stats: { wins: 318, losses: 274, era: 3.35 },
  },
  {
    id: 13,
    name: "Rick Manning",
    team: "Cleveland Indians",
    position: "Center Field",
    years_active: "1975-1987",
    decade: "1970s",
    image_url: "/images/players/rick-manning.jpg",
    description: "Outfielder and Gold Glove winner",
    stats: { hits: 1491, stolen_bases: 195, batting_average: 0.257 },
  },
  {
    id: 14,
    name: "Doug DeCinces",
    team: "Baltimore Orioles",
    position: "Third Base",
    years_active: "1973-1987",
    decade: "Both",
    image_url: "/images/players/doug-decinces.jpg",
    description: "Third baseman and All-Star",
    stats: { home_runs: 237, hits: 1542, batting_average: 0.259 },
  },
  {
    id: 15,
    name: "Mike Sadek",
    team: "San Francisco Giants",
    position: "Catcher",
    years_active: "1973-1981",
    decade: "1970s",
    image_url: "/images/players/mike-sadek.jpg",
    description: "Catcher for the San Francisco Giants",
    stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
  },
  {
    id: 16,
    name: "Buddy Bell",
    team: "Cleveland Indians",
    position: "Third Base",
    years_active: "1972-1989",
    decade: "Both",
    image_url: "/images/players/buddy-bell.jpg",
    description: "Third baseman and Gold Glove winner",
    stats: { hits: 2514, home_runs: 201, batting_average: 0.279 },
  },
  {
    id: 17,
    name: "Jerry Augustine",
    team: "Milwaukee Brewers",
    position: "Pitcher",
    years_active: "1975-1984",
    decade: "1970s",
    image_url: "/images/players/jerry-augustine.jpg",
    description: "Pitcher for the Milwaukee Brewers",
    stats: { wins: 35, losses: 44, era: 4.23 },
  },
  {
    id: 18,
    name: "Rick Dempsey",
    team: "Baltimore Orioles",
    position: "Catcher",
    years_active: "1969-1992",
    decade: "Both",
    image_url: "/images/players/rick-dempsey.jpg",
    description: "Catcher and World Series MVP",
    stats: { hits: 1205, home_runs: 96, batting_average: 0.233 },
  },
  {
    id: 19,
    name: "Bobby Bonds",
    team: "San Francisco Giants",
    position: "Right Field",
    years_active: "1968-1981",
    decade: "1970s",
    image_url: "/images/players/bobby-bonds.jpg",
    description: "Outfielder and father of Barry Bonds",
    stats: { home_runs: 332, stolen_bases: 461, batting_average: 0.268 },
  },
  {
    id: 20,
    name: "Don Baylor",
    team: "California Angels",
    position: "Left Field",
    years_active: "1970-1988",
    decade: "1970s",
    image_url: "/images/players/don-baylor.jpg",
    description: "Outfielder and 1979 AL MVP",
    stats: { home_runs: 338, hits: 2135, batting_average: 0.26 },
  },
  {
    id: 21,
    name: "Terry Humphrey",
    team: "California Angels",
    position: "Catcher",
    years_active: "1971-1981",
    decade: "1970s",
    image_url: "/images/players/terry-humphrey.jpg",
    description: "Catcher for the California Angels",
    stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
  },
  {
    id: 22,
    name: "Don Hood",
    team: "Cleveland Indians",
    position: "Pitcher",
    years_active: "1973-1984",
    decade: "1970s",
    image_url: "/images/players/don-hood.jpg",
    description: "Pitcher for the Cleveland Indians",
    stats: { wins: 23, losses: 25, era: 4.12 },
  },
  {
    id: 23,
    name: "Julio Gonzalez",
    team: "San Diego Padres",
    position: "Shortstop",
    years_active: "1976-1984",
    decade: "1970s",
    image_url: "/images/players/julio-gonzalez.jpg",
    description: "Shortstop for the San Diego Padres",
    stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
  },
  {
    id: 24,
    name: "Marc Hill",
    team: "San Francisco Giants",
    position: "Catcher",
    years_active: "1973-1984",
    decade: "1970s",
    image_url: "/images/players/marc-hill.jpg",
    description: "Catcher for the San Francisco Giants",
    stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
  },
  {
    id: 25,
    name: "Rico Carty",
    team: "Atlanta Braves",
    position: "Outfield",
    years_active: "1963-1979",
    decade: "1970s",
    image_url: "/images/players/rico-carty.jpg",
    description: "Outfielder and batting champion",
    stats: { hits: 1844, home_runs: 204, batting_average: 0.299 },
  },
  {
    id: 26,
    name: "Alan Trammell",
    team: "Detroit Tigers",
    position: "Shortstop",
    years_active: "1977-1996",
    decade: "Both",
    image_url: "/images/players/alan-trammell.jpg",
    description: "Shortstop and World Series champion",
    stats: { hits: 2365, home_runs: 185, batting_average: 0.285 },
  },
  {
    id: 27,
    name: "Bill North",
    team: "Oakland Athletics",
    position: "Center Field",
    years_active: "1971-1981",
    decade: "1970s",
    image_url: "/images/players/bill-north.jpg",
    description: "Center fielder and stolen base leader",
    stats: { stolen_bases: 395, hits: 1087, batting_average: 0.261 },
  },
  {
    id: 28,
    name: "Dick Allen",
    team: "Chicago White Sox",
    position: "First Base",
    years_active: "1963-1977",
    decade: "1970s",
    image_url: "/images/players/dick-allen.jpg",
    description: "First baseman and 1972 AL MVP",
    stats: { home_runs: 351, hits: 1849, batting_average: 0.292 },
  },
  {
    id: 29,
    name: "Jim Palmer",
    team: "Baltimore Orioles",
    position: "Pitcher",
    years_active: "1965-1984",
    decade: "Both",
    image_url: "/images/players/jim-palmer.jpg",
    description: "Hall of Fame pitcher and three-time Cy Young winner",
    stats: { wins: 268, losses: 152, era: 2.86 },
  },
  {
    id: 30,
    name: "Tom Griffin",
    team: "Houston Astros",
    position: "Pitcher",
    years_active: "1969-1982",
    decade: "1970s",
    image_url: "/images/players/tom-griffin.jpg",
    description: "Pitcher for the Houston Astros",
    stats: { wins: 47, losses: 61, era: 4.08 },
  },
  {
    id: 31,
    name: "Jamie Easterly",
    team: "Atlanta Braves",
    position: "Pitcher",
    years_active: "1974-1986",
    decade: "1970s",
    image_url: "/images/players/jamie-easterly.jpg",
    description: "Pitcher for the Atlanta Braves",
    stats: { wins: 23, losses: 25, era: 4.12 },
  },
  {
    id: 32,
    name: "Andy Messersmith",
    team: "Los Angeles Dodgers",
    position: "Pitcher",
    years_active: "1968-1979",
    decade: "1970s",
    image_url: "/images/players/andy-messersmith.jpg",
    description: "Pitcher and free agency pioneer",
    stats: { wins: 130, losses: 99, era: 2.86 },
  },
  {
    id: 33,
    name: "Dave Campbell",
    team: "San Diego Padres",
    position: "Second Base",
    years_active: "1967-1974",
    decade: "1970s",
    image_url: "/images/players/dave-campbell.jpg",
    description: "Second baseman for the San Diego Padres",
    stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
  },
  {
    id: 34,
    name: "Darrel Chaney",
    team: "Cincinnati Reds",
    position: "Shortstop",
    years_active: "1969-1979",
    decade: "1970s",
    image_url: "/images/players/darrel-chaney.jpg",
    description: "Shortstop for the Cincinnati Reds",
    stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
  },
  {
    id: 35,
    name: "Garry Templeton",
    team: "St. Louis Cardinals",
    position: "Shortstop",
    years_active: "1976-1991",
    decade: "Both",
    image_url: "/images/players/garry-templeton.jpg",
    description: "Shortstop and All-Star",
    stats: { hits: 2093, stolen_bases: 243, batting_average: 0.26 },
  },
  {
    id: 36,
    name: "Bob Lacey",
    team: "Oakland Athletics",
    position: "Pitcher",
    years_active: "1977-1984",
    decade: "1970s",
    image_url: "/images/players/bob-lacey.jpg",
    description: "Pitcher for the Oakland Athletics",
    stats: { wins: 23, losses: 25, era: 4.12 },
  },
  {
    id: 37,
    name: "Don Aase",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1977-1990",
    decade: "1970s",
    image_url: "/images/players/don-aase.jpg",
    description: "Pitcher for the California Angels",
    stats: { wins: 23, losses: 25, era: 4.12 },
  },
];

// RetroSeasons players with proper image mapping
const retroSeasonsPlayers = [
  {
    id: 1000,
    name: "Bob Grich",
    team: "California Angels",
    position: "Second Base",
    years_active: "1970-1986",
    decade: "1970s",
    image_url: "/images/players/bob-grich.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1001,
    name: "Don Baylor",
    team: "California Angels",
    position: "Left Field",
    years_active: "1970-1988",
    decade: "1970s",
    image_url: "/images/players/don-baylor.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1002,
    name: "Terry Humphrey",
    team: "California Angels",
    position: "Catcher",
    years_active: "1971-1981",
    decade: "1970s",
    image_url: "/images/players/terry-humphrey.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1003,
    name: "Gary Nolan",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1967-1977",
    decade: "1970s",
    image_url: "/images/players/gary-nolan.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1004,
    name: "Bobby Bonds",
    team: "California Angels",
    position: "Right Field",
    years_active: "1968-1981",
    decade: "1970s",
    image_url: "/images/players/bobby-bonds.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1005,
    name: "Dave Chalk",
    team: "California Angels",
    position: "Shortstop",
    years_active: "1973-1981",
    decade: "1970s",
    image_url: "/images/players/dave-chalk.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1006,
    name: "Dyar Miller",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1975-1985",
    decade: "1970s",
    image_url: "/images/players/dyar-miller.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1007,
    name: "Gil Flores",
    team: "California Angels",
    position: "Center Field",
    years_active: "1975-1981",
    decade: "1970s",
    image_url: "/images/players/gil-flores.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1008,
    name: "Gary Ross",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1968-1977",
    decade: "1970s",
    image_url: "/images/players/gary-ross.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1009,
    name: "Andy Etchebarren",
    team: "California Angels",
    position: "Catcher",
    years_active: "1962-1978",
    decade: "1970s",
    image_url: "/images/players/andy-etchebarren.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1010,
    name: "Mario Guerrero",
    team: "California Angels",
    position: "Shortstop",
    years_active: "1973-1981",
    decade: "1970s",
    image_url: "/images/players/mario-guerrero.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1011,
    name: "Balor Moore",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1970-1980",
    decade: "1970s",
    image_url: "/images/players/balor-moore.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1012,
    name: "Nolan Ryan",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1966-1993",
    decade: "Both",
    image_url: "/images/players/nolan-ryan.jpg",
    description:
      "Hall of Fame pitcher known for his blazing fastball and no-hitters",
    stats: {
      strikeouts: 5714,
      no_hitters: 7,
      era: 3.19,
      card_number: "1978",
      set_year: 1978,
      team: "California Angels",
    },
  },
  {
    id: 1013,
    name: "Mike Barlow",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1975-1980",
    decade: "1970s",
    image_url: "/images/players/mike-barlow.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1014,
    name: "Dave LaRoche",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1970-1983",
    decade: "1970s",
    image_url: "/images/players/dave-laroche.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1015,
    name: "Jerry Remy",
    team: "California Angels",
    position: "Second Base",
    years_active: "1975-1984",
    decade: "1970s",
    image_url: "/images/players/jerry-remy.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1016,
    name: "Ike Hampton",
    team: "California Angels",
    position: "Catcher",
    years_active: "1974-1980",
    decade: "1970s",
    image_url: "/images/players/ike-hampton.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1017,
    name: "Paul Hartzell",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1976-1984",
    decade: "1970s",
    image_url: "/images/players/paul-hartzell.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1018,
    name: "Tony Solaita",
    team: "California Angels",
    position: "First Base",
    years_active: "1968-1979",
    decade: "1970s",
    image_url: "/images/players/tony-solaita.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1019,
    name: "Rance Mulliniks",
    team: "California Angels",
    position: "Third Base",
    years_active: "1977-1992",
    decade: "1970s",
    image_url: "/images/players/rance-mulliniks.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1020,
    name: "Frank Tanana",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1973-1993",
    decade: "Both",
    image_url: "/images/players/frank-tanana.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1021,
    name: "Thad Bosley",
    team: "California Angels",
    position: "Outfield",
    years_active: "1977-1990",
    decade: "1970s",
    image_url: "/images/players/thad-bosley.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1022,
    name: "Joe Rudi",
    team: "California Angels",
    position: "Left Field",
    years_active: "1967-1982",
    decade: "1970s",
    image_url: "/images/players/joe-rudi.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1023,
    name: "Lyman Bostock",
    team: "California Angels",
    position: "Center Field",
    years_active: "1975-1978",
    decade: "1970s",
    image_url: "/images/players/lyman-bostock.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1024,
    name: "Dave Garcia",
    team: "California Angels",
    position: "Manager",
    years_active: "1978-1982",
    decade: "1970s",
    image_url: "/images/players/dave-garcia.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1025,
    name: "Ken Brett",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1967-1981",
    decade: "1970s",
    image_url: "/images/players/ken-brett.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
  {
    id: 1026,
    name: "Ron Jackson",
    team: "California Angels",
    position: "First Base",
    years_active: "1975-1984",
    decade: "1970s",
    image_url: "/images/players/ron-jackson.jpg",
    description: "1978 Topps baseball card player for the California Angels",
    stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
  },
];

// Function to update existing players with RetroSeasons images
function updateExistingPlayersWithRetroSeasonsImages() {
  const updatedPlayers = [...originalPlayers];

  // Update existing players that have RetroSeasons images
  const nameMappings = {
    "Nolan Ryan": "nolan-ryan.jpg",
    "Don Baylor": "don-baylor.jpg",
    "Terry Humphrey": "terry-humphrey.jpg",
    "Bobby Bonds": "bobby-bonds.jpg",
    "Don Aase": "don-aase.jpg",
  };

  updatedPlayers.forEach((player) => {
    if (nameMappings[player.name]) {
      player.image_url = `/images/players/${nameMappings[player.name]}`;
      player.stats = {
        ...player.stats,
        retroseasons_image: true,
        card_number: "1978",
        set_year: 1978,
      };
      console.log(`✅ Updated image for ${player.name}`);
    }
  });

  return updatedPlayers;
}

// Function to generate the combined players array
function generateCombinedPlayers() {
  const updatedOriginalPlayers = updateExistingPlayersWithRetroSeasonsImages();

  // Combine original players with RetroSeasons players
  const combinedPlayers = [...updatedOriginalPlayers, ...retroSeasonsPlayers];

  return combinedPlayers;
}

// Function to update App.tsx
function updateAppTsx() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");

  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }

  let content = fs.readFileSync(appPath, "utf8");

  // Generate the combined players array
  const combinedPlayers = generateCombinedPlayers();

  // Create the players array string
  const playersArrayString = combinedPlayers
    .map((player) => {
      return `  {
    id: ${player.id},
    name: "${player.name}",
    team: "${player.team}",
    position: "${player.position}",
    years_active: "${player.years_active}",
    decade: "${player.decade}",
    image_url: "${player.image_url}",
    description: "${player.description}",
    stats: ${JSON.stringify(player.stats, null, 6)},
  },`;
    })
    .join("\n");

  // Replace the mockPlayers array
  const newMockPlayersString = `const mockPlayers: Player[] = [
${playersArrayString}
];`;

  const mockPlayersMatch = content.match(
    /(const mockPlayers: Player\[\] = \[[\s\S]*?\];)/
  );
  if (mockPlayersMatch) {
    content = content.replace(mockPlayersMatch[1], newMockPlayersString);
  }

  // Write the updated content back to the file
  fs.writeFileSync(appPath, content);
  return true;
}

// Main function
function main() {
  console.log("🔧 Fixing player mapping and restoring original players...\n");

  const success = updateAppTsx();

  if (success) {
    console.log("✅ Successfully updated App.tsx");
    console.log(`🎴 Restored ${originalPlayers.length} original players`);
    console.log(`🎴 Added ${retroSeasonsPlayers.length} RetroSeasons players`);
    console.log(
      `📊 Total players: ${originalPlayers.length + retroSeasonsPlayers.length}`
    );
    console.log(
      "\n💡 The app now includes both original players and RetroSeasons players!"
    );
    console.log(
      "🚀 Run 'npm run dev' to see all players with proper image mapping."
    );
  } else {
    console.error("❌ Failed to update App.tsx");
  }
}

// Run the script
main();
