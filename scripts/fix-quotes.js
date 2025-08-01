import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixQuotesInAppTsx() {
  const appPath = path.join(__dirname, "..", "src", "App.tsx");

  if (!fs.existsSync(appPath)) {
    console.error("App.tsx not found");
    return false;
  }

  let content = fs.readFileSync(appPath, "utf8");

  // Fix the specific problematic line
  content = content.replace(
    /description: "Known as "Mr\. October" for his clutch postseason performances"/,
    'description: "Known as \\"Mr. October\\" for his clutch postseason performances"'
  );

  // Fix other potential quote issues
  content = content.replace(
    /description: "Hall of Fame third baseman known as 'The Human Vacuum Cleaner'"/,
    "description: \"Hall of Fame third baseman known as 'The Human Vacuum Cleaner'\""
  );

  // Write the fixed content back
  fs.writeFileSync(appPath, content);
  return true;
}

function main() {
  console.log("🔧 Fixing quote escaping issues in App.tsx...\n");

  const success = fixQuotesInAppTsx();

  if (success) {
    console.log("✅ Successfully fixed quote escaping issues");
    console.log("🚀 The app should now build without errors!");
  } else {
    console.error("❌ Failed to fix quote issues");
  }
}

main();
