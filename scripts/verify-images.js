import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagesDir = path.join(__dirname, "..", "public", "images", "players")

function verifyImages() {
  console.log("🔍 Verifying baseball player images...\n")

  const expectedImages = [
    "reggie-jackson.jpg",
    "pete-rose.jpg",
    "nolan-ryan.jpg",
    "george-brett.jpg",
    "tony-gwynn.jpg",
    "mike-schmidt.jpg",
    "carlton-fisk.jpg",
    "rickey-henderson.jpg",
    "wade-boggs.jpg",
    "don-mattingly.jpg",
    "johnny-bench.jpg",
    "rod-carew.jpg",
  ]

  let foundCount = 0
  let missingCount = 0

  expectedImages.forEach((filename) => {
    const filepath = path.join(imagesDir, filename)
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath)
      console.log(`✅ ${filename} - ${(stats.size / 1024).toFixed(1)}KB`)
      foundCount++
    } else {
      console.log(`❌ ${filename} - Missing`)
      missingCount++
    }
  })

  console.log(`\n📊 Verification Summary:`)
  console.log(`✅ Found: ${foundCount}`)
  console.log(`❌ Missing: ${missingCount}`)
  console.log(`📁 Directory: ${imagesDir}`)

  if (missingCount > 0) {
    console.log(`\n💡 Run the download script to fetch missing images:`)
    console.log(`node scripts/download-images.js`)
  }
}

verifyImages()
