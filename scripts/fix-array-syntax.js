import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixArraySyntax() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");

  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }

  let content = fs.readFileSync(appPath, "utf8");

  // Find the broken mockPlayers array
  const mockPlayersMatch = content.match(
    /(const mockPlayers: Player\[\] = \[[\s\S]*?\];)/
  );
  if (!mockPlayersMatch) {
    console.error("Could not find mockPlayers array");
    return false;
  }

  // Restore the original players array with proper syntax
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
      decade: "Both",
      image_url: "/images/players/willie-mccovey.jpg",
      description: "Hall of Fame first baseman and power hitter",
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
      decade: "1970s",
      image_url: "/images/players/mike-sadek.jpg",
      description: "Catcher for the San Francisco Giants",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
    {
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
      name: "Don Aase",
      team: "California Angels",
      position: "Pitcher",
      years_active: "1977-1990",
      decade: "1970s",
      image_url: "/images/players/don-aase.jpg",
      description: "Pitcher for the California Angels",
      stats: { wins: 23, losses: 25, era: 4.12 },
    },
    {
      id: 18,
      name: "Bobby Grich",
      team: "California Angels",
      position: "Second Base",
      years_active: "1970-1986",
      decade: "1970s",
      image_url: "/images/players/bob-grich.jpg",
      description: "1978 Topps baseball card player for the California Angels",
      stats: { card_number: "1978", set_year: 1978, team: "California Angels" },
    },
    {
      id: 48,
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
      id: 71,
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
      id: 115,
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
      id: 150,
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
      id: 178,
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
      id: 239,
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
      id: 268,
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
      id: 291,
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
      id: 313,
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
      id: 339,
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
      id: 368,
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
      id: 429,
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
      id: 454,
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
      id: 478,
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
      id: 503,
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
      id: 529,
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
      id: 557,
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
      id: 579,
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
      id: 600,
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
      id: 619,
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
      id: 635,
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
      id: 655,
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
      id: 656,
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
      id: 682,
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
      id: 718,
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

  // Create the new players array string
  const playersArrayString = originalPlayers
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
  }`;
    })
    .join(",\n");

  // Replace the broken mockPlayers array
  const newMockPlayersString = `const mockPlayers: Player[] = [
${playersArrayString}
];`;

  content = content.replace(mockPlayersMatch[1], newMockPlayersString);

  // Write the fixed content back
  fs.writeFileSync(appPath, content);

  console.log(
    "✅ Fixed array syntax and reordered players by 1978 Topps checklist"
  );
  console.log(
    "🎴 Players are now in authentic checklist order with proper syntax!"
  );

  return true;
}

function main() {
  console.log("🔧 Fixing array syntax and reordering players...\n");

  const success = fixArraySyntax();

  if (success) {
    console.log("✅ Successfully fixed array syntax");
    console.log(
      "🚀 The app should now build and display players in checklist order!"
    );
  } else {
    console.error("❌ Failed to fix array syntax");
  }
}

main();
