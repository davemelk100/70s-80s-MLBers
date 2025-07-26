// Test file for Wikimedia Commons integration
import { getPlayerImageFromWikimedia } from "./wikimedia-images";

export async function testWikimediaIntegration() {
  console.log("Testing Wikimedia Commons integration...");

  const testPlayers = [
    "Reggie Jackson",
    "Pete Rose",
    "Nolan Ryan",
    "George Brett",
  ];

  for (const player of testPlayers) {
    try {
      console.log(`Searching for ${player}...`);
      const imageUrl = await getPlayerImageFromWikimedia(player);
      console.log(`${player}: ${imageUrl}`);
    } catch (error) {
      console.error(`Error finding image for ${player}:`, error);
    }
  }
}

// Uncomment to run test
// testWikimediaIntegration();
