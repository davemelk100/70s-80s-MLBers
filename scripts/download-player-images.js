import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Player data - you can expand this list
const players = [
  { name: "Reggie Jackson", searchTerm: "Reggie Jackson" },
  { name: "Pete Rose", searchTerm: "Pete Rose" },
  { name: "Nolan Ryan", searchTerm: "Nolan Ryan" },
  { name: "George Brett", searchTerm: "George Brett" },
  { name: "Tony Gwynn", searchTerm: "Tony Gwynn" },
  { name: "Mike Schmidt", searchTerm: "Mike Schmidt" },
  { name: "Carlton Fisk", searchTerm: "Carlton Fisk" },
  { name: "Rickey Henderson", searchTerm: "Rickey Henderson" },
  { name: "Wade Boggs", searchTerm: "Wade Boggs" },
  { name: "Don Mattingly", searchTerm: "Don Mattingly" },
  { name: "Johnny Bench", searchTerm: "Johnny Bench" },
  { name: "Rod Carew", searchTerm: "Rod Carew" },
];

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

// Function to search for images from Wikimedia Commons
async function searchWikimediaImage(playerName) {
  try {
    console.log(`Searching Wikimedia Commons for: ${playerName}`);

    // Search Wikimedia Commons API
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      playerName + " baseball"
    )}&format=json&origin=*`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.query?.search?.length > 0) {
      const firstResult = data.query.search[0];

      // Get image info
      const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        firstResult.title
      )}&prop=imageinfo&iiprop=url|size|dimensions&format=json&origin=*`;

      const imageResponse = await fetch(imageInfoUrl);
      const imageData = await imageResponse.json();

      const pages = imageData.query?.pages;
      const pageId = Object.keys(pages)[0];
      const pageInfo = pages[pageId];

      if (pageInfo.imageinfo?.[0]?.url) {
        return pageInfo.imageinfo[0].url;
      }
    }
  } catch (error) {
    console.error(`Error searching Wikimedia for ${playerName}:`, error);
  }

  return null;
}

// Main function to process all players
async function downloadAllPlayerImages() {
  console.log("Starting image download process from legal sources...");
  console.log("Note: Baseball Reference does not provide a public API");
  console.log("Using Wikimedia Commons and other legal sources instead.\n");

  for (const player of players) {
    const filename = `${player.name.toLowerCase().replace(/\s+/g, "-")}.png`;
    const filePath = path.join(imagesDir, filename);

    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${filename} - already exists`);
      continue;
    }

    try {
      // Try to find image from Wikimedia Commons
      const imageUrl = await searchWikimediaImage(player.searchTerm);

      if (imageUrl) {
        await downloadImage(imageUrl, filename);
      } else {
        console.log(`No image found for ${player.name} - using placeholder`);
        // You could copy a placeholder image here
      }
    } catch (error) {
      console.error(`Error processing ${player.name}:`, error.message);
    }

    // Add delay to be respectful to servers
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\nImage download process completed!");
  console.log("Legal image sources used: Wikimedia Commons");
}

// Run the script
downloadAllPlayerImages().catch(console.error);
