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

// Function to scrape the RetroSeasons page
async function scrapeRetroSeasonsPage() {
  const url =
    "https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/";

  try {
    console.log(`Fetching page: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract image URLs from the page
    // Looking for baseball card images
    const imageRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    const matches = [...html.matchAll(imageRegex)];

    const imageUrls = [];
    for (const match of matches) {
      const src = match[1];
      // Filter for baseball card images (likely containing card-related keywords)
      if (
        src.includes("card") ||
        src.includes("topps") ||
        src.includes("baseball")
      ) {
        imageUrls.push(src);
      }
    }

    console.log(`Found ${imageUrls.length} potential card images`);

    // Download each image
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const filename = `retroseasons-card-${i + 1}.jpg`;

      try {
        await downloadImage(imageUrl, filename);
        // Add delay to be respectful to the server
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to download ${imageUrl}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error scraping page:", error.message);
  }
}

// Function to extract specific player card images
async function extractPlayerCards() {
  const url =
    "https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/";

  try {
    console.log(`Fetching page: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract player names and card numbers from the page content
    const playerCardRegex = /(\d{4})\s+Topps\s+([^<]+)\s+Baseball\s+Card/gi;
    const matches = [...html.matchAll(playerCardRegex)];

    console.log(`Found ${matches.length} player cards`);

    // Create a mapping of player names to card numbers
    const playerCards = [];
    for (const match of matches) {
      const cardNumber = match[1];
      const playerName = match[2].trim();
      playerCards.push({ cardNumber, playerName });
    }

    // Log the found cards
    console.log("\nFound player cards:");
    playerCards.forEach((card) => {
      console.log(`Card #${card.cardNumber}: ${card.playerName}`);
    });

    return playerCards;
  } catch (error) {
    console.error("Error extracting player cards:", error.message);
    return [];
  }
}

// Main function
async function main() {
  console.log("🏟️  Starting RetroSeasons image scraping...\n");

  // First extract player card information
  const playerCards = await extractPlayerCards();

  // Then attempt to scrape images
  await scrapeRetroSeasonsPage();

  console.log("\n📊 Scraping Summary:");
  console.log(`📁 Images saved to: ${imagesDir}`);
  console.log(`🎴 Player cards found: ${playerCards.length}`);
}

// Run the script
main().catch(console.error);
