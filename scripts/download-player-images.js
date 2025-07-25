const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

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
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'players');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const filePath = path.join(imagesDir, filename);
      const fileStream = fs.createWriteStream(filePath);
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filePath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Function to search for images (placeholder for Baseball Reference integration)
async function searchPlayerImage(playerName) {
  // This is where you would implement Baseball Reference search
  // For now, we'll use a placeholder approach
  
  console.log(`Searching for image of: ${playerName}`);
  
  // Example Baseball Reference URL structure (this may not work without proper access)
  // const searchUrl = `https://www.baseball-reference.com/search/search.fcgi?search=${encodeURIComponent(playerName)}`;
  
  // For now, return null to use fallback
  return null;
}

// Main function to process all players
async function downloadAllPlayerImages() {
  console.log('Starting image download process...');
  
  for (const player of players) {
    const filename = `${player.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    const filePath = path.join(imagesDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${filename} - already exists`);
      continue;
    }
    
    try {
      // Try to find image from Baseball Reference or other sources
      const imageUrl = await searchPlayerImage(player.searchTerm);
      
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
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Image download process completed!');
}

// Run the script
if (require.main === module) {
  downloadAllPlayerImages().catch(console.error);
}

module.exports = { downloadAllPlayerImages, searchPlayerImage }; 