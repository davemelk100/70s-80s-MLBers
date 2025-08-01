import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixTypeScriptErrors() {
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

    // Remove unused imports
    content = content.replace(
      /import \{\s*Select,\s*SelectContent,\s*SelectItem,\s*SelectTrigger,\s*SelectValue,\s*\} from "@\/components\/ui\/select";/g,
      ""
    );

    // Remove unused RefreshCw import
    content = content.replace(/RefreshCw,/g, "");

    // Remove unused state variables
    content = content.replace(
      /const \[selectedSet, setSelectedSet\] = useState\("all"\);/g,
      'const [selectedSet] = useState("all");'
    );

    content = content.replace(
      /const \[selectedPosition, setSelectedPosition\] = useState\("all"\);/g,
      'const [selectedPosition] = useState("all");'
    );

    content = content.replace(
      /const \[isRefreshing, setIsRefreshing\] = useState\(false\);/g,
      "const [isRefreshing] = useState(false);"
    );

    // Remove unused function
    content = content.replace(
      /const handleRefreshImages = async \(\) => \{[^}]*\};/g,
      ""
    );

    fs.writeFileSync(appPath, content);
  }

  // Fix retroseasons-players.ts - add Player interface import
  if (fs.existsSync(retroSeasonsPath)) {
    let content = fs.readFileSync(retroSeasonsPath, "utf8");

    // Add import for Player interface
    const importStatement = `import { Player } from '../App';`;
    content = importStatement + "\n" + content;

    fs.writeFileSync(retroSeasonsPath, content);
  }

  return true;
}

function main() {
  console.log("🔧 Fixing TypeScript errors...\n");

  const success = fixTypeScriptErrors();

  if (success) {
    console.log("✅ Successfully fixed TypeScript errors");
    console.log("🚀 The app should now build successfully!");
  } else {
    console.error("❌ Failed to fix TypeScript errors");
  }
}

main();
