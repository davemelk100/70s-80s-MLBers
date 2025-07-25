import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, "..", "public", "images", "players")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Baseball player image sources (using publicly available images)
const playerImages = [
  {
    name: "reggie-jackson",
    url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=500&fit=crop&crop=face",
    filename: "reggie-jackson.jpg",
  },
  {
    name: "pete-rose",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face",
    filename: "pete-rose.jpg",
  },
  {
    name: "nolan-ryan",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face",
    filename: "nolan-ryan.jpg",
  },
  {
    name: "george-brett",
    url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=500&fit=crop&crop=face",
    filename: "george-brett.jpg",
  },
  {
    name: "tony-gwynn",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face",
    filename: "tony-gwynn.jpg",
  },
  {
    name: "mike-schmidt",
    url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=500&fit=crop&crop=face",
    filename: "mike-schmidt.jpg",
  },
  {
    name: "carlton-fisk",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face",
    filename: "carlton-fisk.jpg",
  },
  {
    name: "rickey-henderson",
    url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=500&fit=crop&crop=face",
    filename: "rickey-henderson.jpg",
  },
  {
    name: "wade-boggs",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face",
    filename: "wade-boggs.jpg",
  },
  {
    name: "don-mattingly",
    url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=500&fit=crop&crop=face",
    filename: "don-mattingly.jpg",
  },
  {
    name: "johnny-bench",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face",
    filename: "johnny-bench.jpg",
  },
  {
    name: "rod-carew",
    url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=500&fit=crop&crop=face",
    filename: "rod-carew.jpg",
  },
]

async function downloadImage(url, filepath) {
  try {
    console.log(`Downloading ${url}...`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(buffer))
    console.log(`✅ Downloaded: ${path.basename(filepath)}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to download ${url}:`, error.message)
    return false
  }
}

async function downloadAllImages() {
  console.log("🏈 Starting baseball player image downloads...\n")

  let successCount = 0
  let failCount = 0

  for (const image of playerImages) {
    const filepath = path.join(imagesDir, image.filename)

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping ${image.filename} (already exists)`)
      successCount++
      continue
    }

    const success = await downloadImage(image.url, filepath)
    if (success) {
      successCount++
    } else {
      failCount++
    }

    // Add delay between downloads to be respectful
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  console.log(`\n📊 Download Summary:`)
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Failed: ${failCount}`)
  console.log(`📁 Images saved to: ${imagesDir}`)
}

// Run the download script
downloadAllImages().catch(console.error)
