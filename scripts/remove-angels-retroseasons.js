import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeAngelsAndRetroSeasons() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");
  
  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }
  
  let content = fs.readFileSync(appPath, 'utf8');
  
  // Find the mockPlayers array
  const mockPlayersMatch = content.match(/(const mockPlayers: Player\[\] = \[[\s\S]*?\];)/);
  if (!mockPlayersMatch) {
    console.error("Could not find mockPlayers array");
    return false;
  }
  
  // Keep only the original players (non-Angels, non-RetroSeasons)
  const originalPlayers = [
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
      description: "Hall of Fame third baseman known as 'The Human Vacuum Cleaner'",
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
      description: "Hall of Fame pitcher known for his blazing fastball and no-hitters",
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
      description: "Known as \"Mr. October\" for his clutch postseason performances",
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
      id: 13,
      name: "Carl Yastrzemski",
      team: "Boston Red Sox",
      position: "Left Field",
      years_active: "1961-1983",
      decade: "Both",
      image_url: "/images/players/carl-yasrzemski.jpg",
      description: "Hall of Fame outfielder and Triple Crown winner",
      stats: { hits: 3419, home_runs: 452, batting_average: 0.285 },
    },
    {
      id: 14,
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
      id: 15,
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
      id: 16,
      name: "Bobby Bonds",
      team: "San Francisco Giants",
      position: "Right Field",
      years_active: "1968-1981",
      decade: "1970s",
      image_url: "/images/players/bobby-bonds.jpg",
      description: "Power hitter and father of Barry Bonds",
      stats: { home_runs: 332, stolen_bases: 461, batting_average: 0.268 },
    },
    {
      id: 17,
      name: "Terry Humphrey",
      team: "Detroit Tigers",
      position: "Catcher",
      years_active: "1971-1981",
      decade: "1970s",
      image_url: "/images/players/terry-humphrey.jpg",
      description: "Catcher for multiple teams",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
    {
      id: 18,
      name: "Don Hood",
      team: "Baltimore Orioles",
      position: "Pitcher",
      years_active: "1973-1984",
      decade: "1970s",
      image_url: "/images/players/don-hood.jpg",
      description: "Relief pitcher for multiple teams",
      stats: { wins: 22, losses: 18, era: 3.85 },
    },
    {
      id: 19,
      name: "Julio Gonzalez",
      team: "Chicago White Sox",
      position: "Shortstop",
      years_active: "1976-1984",
      decade: "1970s",
      image_url: "/images/players/julio-gonzalez.jpg",
      description: "Infielder for multiple teams",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
    {
      id: 20,
      name: "Marc Hill",
      team: "San Francisco Giants",
      position: "Catcher",
      years_active: "1973-1986",
      decade: "1970s",
      image_url: "/images/players/marc-hill.jpg",
      description: "Catcher for multiple teams",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
    {
      id: 21,
      name: "Rico Carty",
      team: "Atlanta Braves",
      position: "Designated Hitter",
      years_active: "1963-1979",
      decade: "1970s",
      image_url: "/images/players/rico-carty.jpg",
      description: "All-Star outfielder and DH",
      stats: { hits: 1844, home_runs: 204, batting_average: 0.299 },
    },
    {
      id: 22,
      name: "Alan Trammell",
      team: "Detroit Tigers",
      position: "Shortstop",
      years_active: "1977-1996",
      decade: "1970s",
      image_url: "/images/players/alan-trammell.jpg",
      description: "Hall of Fame shortstop and 1984 World Series MVP",
      stats: { hits: 2365, home_runs: 185, batting_average: 0.285 },
    },
    {
      id: 23,
      name: "Bill North",
      team: "Oakland Athletics",
      position: "Center Field",
      years_active: "1971-1981",
      decade: "1970s",
      image_url: "/images/players/bill-north.jpg",
      description: "Speedster outfielder and stolen base leader",
      stats: { stolen_bases: 395, hits: 1008, batting_average: 0.263 },
    },
    {
      id: 24,
      name: "Dick Allen",
      team: "Chicago White Sox",
      position: "First Base",
      years_active: "1963-1977",
      decade: "1970s",
      image_url: "/images/players/dick-allen.jpg",
      description: "Power hitter and 1972 AL MVP",
      stats: { home_runs: 351, rbi: 1119, batting_average: 0.292 },
    },
    {
      id: 25,
      name: "Jim Palmer",
      team: "Baltimore Orioles",
      position: "Pitcher",
      years_active: "1965-1984",
      decade: "1970s",
      image_url: "/images/players/jim-palmer.jpg",
      description: "Hall of Fame pitcher and three-time Cy Young winner",
      stats: { wins: 268, losses: 152, era: 2.86 },
    },
    {
      id: 26,
      name: "Tom Griffin",
      team: "Houston Astros",
      position: "Pitcher",
      years_active: "1969-1982",
      decade: "1970s",
      image_url: "/images/players/tom-griffin.jpg",
      description: "Pitcher for multiple teams",
      stats: { wins: 77, losses: 94, era: 3.54 },
    },
    {
      id: 27,
      name: "Jamie Easterly",
      team: "Atlanta Braves",
      position: "Pitcher",
      years_active: "1975-1986",
      decade: "1970s",
      image_url: "/images/players/jamie-easterly.jpg",
      description: "Relief pitcher for multiple teams",
      stats: { wins: 22, losses: 18, era: 3.85 },
    },
    {
      id: 28,
      name: "Andy Messersmith",
      team: "Los Angeles Dodgers",
      position: "Pitcher",
      years_active: "1968-1979",
      decade: "1970s",
      image_url: "/images/players/andy-messersmith.jpg",
      description: "All-Star pitcher and free agency pioneer",
      stats: { wins: 130, losses: 99, era: 2.86 },
    },
    {
      id: 29,
      name: "Dave Campbell",
      team: "San Diego Padres",
      position: "Second Base",
      years_active: "1967-1974",
      decade: "1970s",
      image_url: "/images/players/dave-campbell.jpg",
      description: "Infielder and broadcaster",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
    {
      id: 30,
      name: "Darrel Chaney",
      team: "Cincinnati Reds",
      position: "Shortstop",
      years_active: "1969-1979",
      decade: "1970s",
      image_url: "/images/players/darrel-chaney.jpg",
      description: "Infielder for the Big Red Machine",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
    {
      id: 31,
      name: "Garry Templeton",
      team: "St. Louis Cardinals",
      position: "Shortstop",
      years_active: "1976-1991",
      decade: "1970s",
      image_url: "/images/players/garry-templeton.jpg",
      description: "All-Star shortstop and switch hitter",
      stats: { hits: 2091, stolen_bases: 243, batting_average: 0.271 },
    },
    {
      id: 32,
      name: "Bob Lacey",
      team: "Oakland Athletics",
      position: "Pitcher",
      years_active: "1977-1984",
      decade: "1970s",
      image_url: "/images/players/bob-lacey.jpg",
      description: "Relief pitcher for multiple teams",
      stats: { wins: 22, losses: 18, era: 3.85 },
    },
    {
      id: 33,
      name: "Dick Pole",
      team: "Seattle Mariners",
      position: "Pitcher",
      years_active: "1973-1978",
      decade: "1970s",
      image_url: "/images/players/dick-pole.png",
      description: "Pitcher for multiple teams",
      stats: { wins: 22, losses: 18, era: 3.85 },
    },
    {
      id: 34,
      name: "Buddy Bell",
      team: "Cleveland Indians",
      position: "Third Base",
      years_active: "1972-1989",
      decade: "1970s",
      image_url: "/images/players/buddy-bell.jpg",
      description: "All-Star third baseman and Gold Glove winner",
      stats: { hits: 2514, home_runs: 201, batting_average: 0.279 },
    },
    {
      id: 35,
      name: "Jerry Augustine",
      team: "Milwaukee Brewers",
      position: "Pitcher",
      years_active: "1975-1984",
      decade: "1970s",
      image_url: "/images/players/jerry-augustine.jpg",
      description: "Pitcher for the Milwaukee Brewers",
      stats: { wins: 22, losses: 18, era: 3.85 },
    },
    {
      id: 36,
      name: "Rick Dempsey",
      team: "Baltimore Orioles",
      position: "Catcher",
      years_active: "1969-1992",
      decade: "1970s",
      image_url: "/images/players/rick-dempsey.jpg",
      description: "Catcher and 1983 World Series MVP",
      stats: { hits: 156, home_runs: 2, batting_average: 0.207 },
    },
  ];
  
  // Create the new players array string
  const playersArrayString = originalPlayers.map(player => {
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
  }).join(',\n');
  
  // Replace the mockPlayers array
  const newMockPlayersString = `const mockPlayers: Player[] = [
${playersArrayString}
];`;
  
  content = content.replace(mockPlayersMatch[1], newMockPlayersString);
  
  // Write the updated content back
  fs.writeFileSync(appPath, content);
  
  console.log("✅ Removed all Angels and RetroSeasons players");
  console.log("🎴 Kept only the original diverse player collection!");
  
  return true;
}

function removeRetroSeasonsImages() {
  const imagesDir = path.join(__dirname, "..", "public", "images", "players");
  
  if (!fs.existsSync(imagesDir)) {
    console.error("Images directory not found");
    return false;
  }
  
  const files = fs.readdirSync(imagesDir);
  let removedCount = 0;
  
  // List of RetroSeasons/Angels image files to remove
  const filesToRemove = [
    "bob-grich.jpg",
    "don-baylor.jpg",
    "terry-humphrey.jpg",
    "gary-nolan.jpg",
    "bobby-bonds.jpg",
    "dave-chalk.jpg",
    "dyar-miller.jpg",
    "gil-flores.jpg",
    "gary-ross.jpg",
    "andy-etchebarren.jpg",
    "mario-guerrero.jpg",
    "balor-moore.jpg",
    "mike-barlow.jpg",
    "dave-laroche.jpg",
    "jerry-remy.jpg",
    "ike-hampton.jpg",
    "paul-hartzell.jpg",
    "tony-solaita.jpg",
    "rance-mulliniks.jpg",
    "frank-tanana.jpg",
    "thad-bosley.jpg",
    "joe-rudi.jpg",
    "lyman-bostock.jpg",
    "dave-garcia.jpg",
    "ken-brett.jpg",
    "ron-jackson.jpg",
    "retroseasons-mapping.json"
  ];
  
  filesToRemove.forEach(filename => {
    const filePath = path.join(imagesDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      removedCount++;
      console.log(`🗑️  Removed: ${filename}`);
    }
  });
  
  console.log(`✅ Removed ${removedCount} RetroSeasons/Angels image files`);
  return true;
}

function main() {
  console.log("🧹 Cleaning up Angels and RetroSeasons content...\n");
  
  const success1 = removeAngelsAndRetroSeasons();
  const success2 = removeRetroSeasonsImages();
  
  if (success1 && success2) {
    console.log("✅ Successfully removed all Angels and RetroSeasons content");
    console.log("🎴 App now contains only the original diverse player collection!");
  } else {
    console.error("❌ Failed to remove some content");
  }
}

main(); 