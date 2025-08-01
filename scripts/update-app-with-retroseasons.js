import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the RetroSeasons players data
function readRetroSeasonsPlayers() {
  const playersPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "retroseasons-players.ts"
  );

  if (!fs.existsSync(playersPath)) {
    console.error(
      "RetroSeasons players file not found. Run the integration script first."
    );
    return null;
  }

  const content = fs.readFileSync(playersPath, "utf8");

  // Extract the players array from the TypeScript file
  const match = content.match(
    /const retroSeasonsPlayers: Player\[\] = (\[[\s\S]*?\]);/
  );
  if (!match) {
    console.error("Could not parse RetroSeasons players data");
    return null;
  }

  // Convert the TypeScript array to JavaScript object
  const playersString = match[1];
  // Remove the trailing comma and semicolon
  const cleanString = playersString.replace(/,\s*];$/, "]");

  try {
    // This is a simplified approach - in a real scenario you'd want a proper TypeScript parser
    return JSON.parse(cleanString);
  } catch (error) {
    console.error("Error parsing players data:", error);
    return null;
  }
}

// Update the App.tsx file
function updateAppTsx(retroSeasonsPlayers) {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");

  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }

  let content = fs.readFileSync(appPath, "utf8");

  // Add import for RetroSeasons players
  const importStatement = `import { retroSeasonsPlayers } from './data/retroseasons-players';`;

  // Check if import already exists
  if (!content.includes("retroseasons-players")) {
    // Add import after the existing imports
    const importIndex = content.lastIndexOf("import");
    const nextLineIndex = content.indexOf("\n", importIndex) + 1;
    content =
      content.slice(0, nextLineIndex) +
      importStatement +
      "\n" +
      content.slice(nextLineIndex);
  }

  // Find the mockPlayers array and add the RetroSeasons players
  const mockPlayersMatch = content.match(
    /(const mockPlayers: Player\[\] = \[[\s\S]*?\];)/
  );
  if (mockPlayersMatch) {
    const mockPlayersString = mockPlayersMatch[1];

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
  console.log("🔄 Updating App.tsx with RetroSeasons players...\n");

  // Create backup
  createBackup();

  // Read RetroSeasons players
  const retroSeasonsPlayers = readRetroSeasonsPlayers();
  if (!retroSeasonsPlayers) {
    return;
  }

  console.log(`📄 Found ${retroSeasonsPlayers.length} RetroSeasons players`);

  // Update App.tsx
  const success = updateAppTsx(retroSeasonsPlayers);

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
