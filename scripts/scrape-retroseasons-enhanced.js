import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "..", "public", "images", "players");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        const filePath = path.join(imagesDir, filename);
        const fileStream = fs.createWriteStream(filePath);

        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve(filePath);
        });

        fileStream.on("error", (err) => {
          fs.unlink(filePath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      })
      .on("error", reject);
  });
}

// Function to extract player information from the page
async function extractPlayerInfo() {
  const url =
    "https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/";

  try {
    console.log(`Fetching page: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract player information using a more specific regex
    const playerRegex = /(\d{4})\s+Topps\s+([^<]+?)\s+Baseball\s+Card/gi;
    const matches = [...html.matchAll(playerRegex)];

    const players = [];
    for (const match of matches) {
      const cardNumber = match[1];
      const playerName = match[2].trim();

      // Clean up the player name
      const cleanName = playerName.replace(/"/g, "").trim();

      if (cleanName && !cleanName.includes("alt") && !cleanName.includes("=")) {
        players.push({
          cardNumber,
          playerName: cleanName,
          filename: `${cleanName.toLowerCase().replace(/\s+/g, "-")}.jpg`,
        });
      }
    }

    // Remove duplicates
    const uniquePlayers = players.filter(
      (player, index, self) =>
        index === self.findIndex((p) => p.playerName === player.playerName)
    );

    console.log(`\nFound ${uniquePlayers.length} unique players:`);
    uniquePlayers.forEach((player) => {
      console.log(`Card #${player.cardNumber}: ${player.playerName}`);
    });

    return uniquePlayers;
  } catch (error) {
    console.error("Error extracting player info:", error.message);
    return [];
  }
}

// Function to scrape and organize images by player
async function scrapeAndOrganizeImages() {
  const url =
    "https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/";

  try {
    console.log(`\nFetching page for image extraction: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract all image URLs
    const imageRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    const matches = [...html.matchAll(imageRegex)];

    const imageUrls = [];
    for (const match of matches) {
      const src = match[1];
      // Filter for baseball card images
      if (
        src.includes("card") ||
        src.includes("topps") ||
        src.includes("baseball") ||
        src.includes("retroseasons")
      ) {
        imageUrls.push(src);
      }
    }

    console.log(`Found ${imageUrls.length} potential card images`);

    // Get player information
    const players = await extractPlayerInfo();

    // Download images and map them to players
    for (let i = 0; i < imageUrls.length && i < players.length; i++) {
      const imageUrl = imageUrls[i];
      const player = players[i];

      if (player) {
        try {
          await downloadImage(imageUrl, player.filename);
          console.log(`✅ Mapped ${player.filename} to ${player.playerName}`);
        } catch (error) {
          console.error(`❌ Failed to download ${imageUrl}:`, error.message);
        }
      }

      // Add delay to be respectful to the server
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return players;
  } catch (error) {
    console.error("Error scraping images:", error.message);
    return [];
  }
}

// Function to create a mapping file
function createPlayerMapping(players) {
  const mapping = {
    source: "RetroSeasons - 1978 California Angels",
    url: "https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/",
    scrapedAt: new Date().toISOString(),
    players: players,
  };

  const mappingPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "players",
    "retroseasons-mapping.json"
  );
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`📄 Created mapping file: ${mappingPath}`);
}

// Main function
async function main() {
  console.log("🏟️  Starting Enhanced RetroSeasons Image Scraping...\n");

  // Scrape and organize images
  const players = await scrapeAndOrganizeImages();

  // Create mapping file
  createPlayerMapping(players);

  console.log("\n📊 Enhanced Scraping Summary:");
  console.log(`📁 Images saved to: ${imagesDir}`);
  console.log(`🎴 Players processed: ${players.length}`);
  console.log(`📄 Mapping file created for reference`);
}

// Run the script
main().catch(console.error);
