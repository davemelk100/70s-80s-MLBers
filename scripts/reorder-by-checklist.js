import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1978 Topps checklist order mapping
const checklistOrder = {
  "Lou Brock": 1,
  "Sparky Lyle": 2,
  "Willie McCovey": 3,
  "Brooks Robinson": 4,
  "Pete Rose": 5,
  "Nolan Ryan": 6,
  "Reggie Jackson": 7,
  "Mike Sadek": 8,
  "Doug DeCinces": 9,
  "Phil Niekro": 10,
  "Rick Manning": 11,
  "Don Aase": 12,
  "Bobby Grich": 18,
  "Bobby Bonds": 150,
  "Don Baylor": 48,
  "Terry Humphrey": 71,
  "Gary Nolan": 115,
  "Dave Chalk": 178,
  "Dyar Miller": 239,
  "Gil Flores": 268,
  "Gary Ross": 291,
  "Andy Etchebarren": 313,
  "Mario Guerrero": 339,
  "Balor Moore": 368,
  "Mike Barlow": 429,
  "Dave LaRoche": 454,
  "Jerry Remy": 478,
  "Ike Hampton": 503,
  "Paul Hartzell": 529,
  "Tony Solaita": 557,
  "Rance Mulliniks": 579,
  "Frank Tanana": 600,
  "Thad Bosley": 619,
  "Joe Rudi": 635,
  "Lyman Bostock": 655,
  "Dave Garcia": 656,
  "Ken Brett": 682,
  "Ron Jackson": 718,
  "Carl Yastrzemski": 40,
  "Steve Garvey": 350,
  "Don Sutton": 310,
  "Rick Dempsey": 367,
  "Bobby Bonds": 150,
  "Don Baylor": 48,
  "Terry Humphrey": 71,
  "Don Hood": 398,
  "Julio Gonzalez": 389,
  "Marc Hill": 359,
  "Rico Carty": 305,
  "Alan Trammell": 704,
  "Bill North": 163,
  "Dick Allen": 28,
  "Jim Palmer": 160,
  "Tom Griffin": 318,
  "Jamie Easterly": 264,
  "Andy Messersmith": 156,
  "Dave Campbell": 402,
  "Darrel Chaney": 443,
  "Garry Templeton": 32,
  "Bob Lacey": 29,
  "Dick Pole": 233,
  "Buddy Bell": 280,
  "Jerry Augustine": 133,
  "Rick Dempsey": 367,
  "Bobby Bonds": 150,
  "Don Baylor": 48,
  "Terry Humphrey": 71,
  "Don Hood": 398,
  "Julio Gonzalez": 389,
  "Marc Hill": 359,
  "Rico Carty": 305,
  "Alan Trammell": 704,
  "Bill North": 163,
  "Dick Allen": 28,
  "Jim Palmer": 160,
  "Tom Griffin": 318,
  "Jamie Easterly": 264,
  "Andy Messersmith": 156,
  "Dave Campbell": 402,
  "Darrel Chaney": 443,
  "Garry Templeton": 32,
  "Bob Lacey": 29,
  "Dick Pole": 233,
  "Buddy Bell": 280,
  "Jerry Augustine": 133,
  "Rick Dempsey": 367,
};

function reorderPlayersByChecklist() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");

  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }

  let content = fs.readFileSync(appPath, "utf8");

  // Extract the mockPlayers array
  const mockPlayersMatch = content.match(
    /(const mockPlayers: Player\[\] = \[[\s\S]*?\];)/
  );
  if (!mockPlayersMatch) {
    console.error("Could not find mockPlayers array");
    return false;
  }

  const playersString = mockPlayersMatch[1];

  // Parse the players array
  const playersMatch = playersString.match(/\[([\s\S]*)\]/);
  if (!playersMatch) {
    console.error("Could not parse players array");
    return false;
  }

  // Extract individual player objects
  const playerObjects = [];
  const playerRegex = /\{[^}]*\}/g;
  let match;
  while ((match = playerRegex.exec(playersMatch[1])) !== null) {
    const playerStr = match[0];

    // Extract player name
    const nameMatch = playerStr.match(/name:\s*"([^"]+)"/);
    if (nameMatch) {
      const playerName = nameMatch[1];
      const checklistNumber = checklistOrder[playerName];

      if (checklistNumber) {
        playerObjects.push({
          name: playerName,
          checklistNumber: checklistNumber,
          content: playerStr,
        });
      } else {
        // For players not in checklist, assign a high number
        playerObjects.push({
          name: playerName,
          checklistNumber: 9999,
          content: playerStr,
        });
      }
    }
  }

  // Sort by checklist number
  playerObjects.sort((a, b) => a.checklistNumber - b.checklistNumber);

  // Create new players array
  const newPlayersArray = playerObjects
    .map((player, index) => {
      // Update the ID to match the checklist order
      return player.content.replace(
        /id:\s*\d+/,
        `id: ${player.checklistNumber}`
      );
    })
    .join(",\n");

  // Replace the mockPlayers array
  const newMockPlayersString = `const mockPlayers: Player[] = [
${newPlayersArray}
];`;

  content = content.replace(mockPlayersMatch[1], newMockPlayersString);

  // Write the updated content back
  fs.writeFileSync(appPath, content);

  console.log(
    `✅ Reordered ${playerObjects.length} players by 1978 Topps checklist`
  );
  console.log("🎴 Players are now in authentic checklist order!");

  return true;
}

function main() {
  console.log("🔄 Reordering players by 1978 Topps checklist...\n");

  const success = reorderPlayersByChecklist();

  if (success) {
    console.log("✅ Successfully reordered players");
    console.log(
      "🚀 The app now displays players in authentic checklist order!"
    );
  } else {
    console.error("❌ Failed to reorder players");
  }
}

main();
