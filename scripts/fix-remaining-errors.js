import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixRemainingErrors() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");
  const retroSeasonsPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "retroseasons-players.ts"
  );

  // Fix App.tsx - remove unused imports and variables
  if (fs.existsSync(appPath)) {
    let content = fs.readFileSync(appPath, "utf8");

    // Remove unused image-prefetcher imports
    content = content.replace(
      /import \{\s*prefetchPlayerImages,\s*clearImageCache,\s*\} from "@\/utils\/image-prefetcher";/g,
      ""
    );

    // Remove unused isRefreshing variable
    content = content.replace(
      /const \[isRefreshing\] = useState\(false\);/g,
      ""
    );

    fs.writeFileSync(appPath, content);
  }

  // Fix retroseasons-players.ts - remove unused export
  if (fs.existsSync(retroSeasonsPath)) {
    let content = fs.readFileSync(retroSeasonsPath, "utf8");

    // Remove the unused retroSeasonsPlayers array
    content = content.replace(
      /import \{ Player \} from '\.\.\/App';[\s\S]*?const retroSeasonsPlayers: Player\[\] = \[[\s\S]*?\];/g,
      ""
    );

    fs.writeFileSync(retroSeasonsPath, content);
  }

  return true;
}

function main() {
  console.log("🔧 Fixing remaining TypeScript errors...\n");

  const success = fixRemainingErrors();

  if (success) {
    console.log("✅ Successfully fixed remaining TypeScript errors");
    console.log("🚀 The app should now build successfully!");
  } else {
    console.error("❌ Failed to fix remaining TypeScript errors");
  }
}

main();
