import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the mapping file
function readRetroSeasonsMapping() {
  const mappingPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "players",
    "retroseasons-mapping.json"
  );

  if (!fs.existsSync(mappingPath)) {
    console.error("Mapping file not found. Run the scraping script first.");
    return null;
  }

  const mappingData = fs.readFileSync(mappingPath, "utf8");
  return JSON.parse(mappingData);
}

// Create new player entries for RetroSeasons players
function createRetroSeasonsPlayers(mapping) {
  const players = [];
  let id = 1000; // Start with a high ID to avoid conflicts

  mapping.players.forEach((player, index) => {
    // Skip the team card
    if (player.playerName === "California Angels") {
      return;
    }

    // Create player data based on the scraped information
    const playerData = {
      id: id++,
      name: player.playerName,
      team: "California Angels",
      position: "Various", // We'll need to look up actual positions
      years_active: "1978",
      decade: "1970s",
      image_url: `/images/players/${player.filename}`,
      description: `1978 Topps baseball card player for the California Angels`,
      stats: {
        card_number: player.cardNumber,
        set_year: 1978,
        team: "California Angels",
      },
      source: "RetroSeasons",
    };

    players.push(playerData);
  });

  return players;
}

// Update existing players with new images if they match
function updateExistingPlayers(existingPlayers, mapping) {
  const updatedPlayers = [...existingPlayers];

  mapping.players.forEach((scrapedPlayer) => {
    // Find matching existing players by name
    const existingPlayerIndex = updatedPlayers.findIndex(
      (player) =>
        player.name.toLowerCase() === scrapedPlayer.playerName.toLowerCase()
    );

    if (existingPlayerIndex !== -1) {
      // Update the existing player with the new image
      updatedPlayers[
        existingPlayerIndex
      ].image_url = `/images/players/${scrapedPlayer.filename}`;
      updatedPlayers[existingPlayerIndex].stats = {
        ...updatedPlayers[existingPlayerIndex].stats,
        card_number: scrapedPlayer.cardNumber,
        retroseasons_image: true,
      };
      console.log(`✅ Updated image for ${scrapedPlayer.playerName}`);
    }
  });

  return updatedPlayers;
}

// Generate TypeScript code for the new players
function generateTypeScriptCode(players) {
  const playerEntries = players
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

  return `// RetroSeasons 1978 California Angels Players
const retroSeasonsPlayers: Player[] = [
${playerEntries}
];`;
}

// Main function
function main() {
  console.log("🔄 Integrating RetroSeasons players...\n");

  // Read the mapping file
  const mapping = readRetroSeasonsMapping();
  if (!mapping) {
    return;
  }

  console.log(
    `📄 Found mapping for ${mapping.players.length} players from RetroSeasons`
  );

  // Create new player entries
  const newPlayers = createRetroSeasonsPlayers(mapping);

  console.log(`\n🎴 Created ${newPlayers.length} new player entries:`);
  newPlayers.forEach((player) => {
    console.log(`  - ${player.name} (${player.team})`);
  });

  // Generate TypeScript code
  const tsCode = generateTypeScriptCode(newPlayers);

  // Save the TypeScript code to a file
  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "retroseasons-players.ts"
  );
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, tsCode);
  console.log(`\n📝 Generated TypeScript code: ${outputPath}`);

  // Create a summary file
  const summary = {
    source: "RetroSeasons Integration",
    scrapedAt: mapping.scrapedAt,
    totalPlayers: newPlayers.length,
    players: newPlayers.map((p) => ({
      name: p.name,
      team: p.team,
      image: p.image_url,
    })),
  };

  const summaryPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "players",
    "integration-summary.json"
  );
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log(`\n📊 Integration Summary:`);
  console.log(`✅ ${newPlayers.length} new players created`);
  console.log(`📁 TypeScript code: ${outputPath}`);
  console.log(`📄 Summary: ${summaryPath}`);
  console.log(`\n💡 To use these players, import them into your App.tsx:`);
  console.log(
    `import { retroSeasonsPlayers } from './data/retroseasons-players';`
  );
}

// Run the script
main();
