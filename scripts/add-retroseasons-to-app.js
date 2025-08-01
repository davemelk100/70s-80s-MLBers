import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RetroSeasons players data
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

// Update the App.tsx file
function updateAppTsx() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");

  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }

  let content = fs.readFileSync(appPath, "utf8");

  // Find the mockPlayers array and add the RetroSeasons players
  const mockPlayersMatch = content.match(
    /(const mockPlayers: Player\[\] = \[[\s\S]*?\];)/
  );
  if (mockPlayersMatch) {
    // Create the new players array with RetroSeasons players
    const retroSeasonsPlayersString = retroSeasonsPlayers
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
${retroSeasonsPlayersString}
];`;

    content = content.replace(mockPlayersMatch[1], newMockPlayersString);
  }

  // Write the updated content back to the file
  fs.writeFileSync(appPath, content);
  return true;
}

// Create a backup of the original App.tsx
function createBackup() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");
  const backupPath = path.join(__dirname, "..", "src", "App.tsx.backup");

  if (fs.existsSync(appPath)) {
    fs.copyFileSync(appPath, backupPath);
    console.log(`📄 Created backup: ${backupPath}`);
  }
}

// Main function
function main() {
  console.log("🔄 Adding RetroSeasons players to App.tsx...\n");

  // Create backup
  createBackup();

  console.log(`📄 Found ${retroSeasonsPlayers.length} RetroSeasons players`);

  // Update App.tsx
  const success = updateAppTsx();

  if (success) {
    console.log("✅ Successfully updated App.tsx");
    console.log(
      `🎴 Added ${retroSeasonsPlayers.length} new players from RetroSeasons`
    );
    console.log(
      "\n💡 The app now includes the 1978 California Angels players!"
    );
    console.log("🚀 You can now run the app to see the new players.");
  } else {
    console.error("❌ Failed to update App.tsx");
  }
}

// Run the script
main();
