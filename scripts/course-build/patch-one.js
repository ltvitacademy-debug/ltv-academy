// One-off helper: manually patch a single outline entry given an already-obtained
// secureUrl + duration (used when build/upload already succeeded but the automated
// outline patch step needs to be (re)applied).
// Usage: node patch-one.js <n> <slug> <secureUrl> <durationSeconds>
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");
const outlineFile = path.join(ROOT, "lib", "t-sql-outline.ts");

const n = process.argv[2];
const slug = process.argv[3];
const secureUrl = process.argv[4];
const duration = parseFloat(process.argv[5]);
const mins = Math.floor(duration / 60);
const secs = Math.round(duration % 60);
const durationLabel = mins > 0 ? `${mins} min ${secs} s` : `${secs} s`;

let outline = fs.readFileSync(outlineFile, "utf8");
const anyShapeRe = new RegExp("(L\\(" + n + ', "' + slug + '", "[^"]*", \\{)([\\s\\S]*?)(\\}\\),)');
const m = anyShapeRe.exec(outline);
if (!m) {
  console.error("no match for n=" + n + " slug=" + slug);
  process.exit(1);
}
const contentDirMatch = m[2].match(/contentDir:\s*"([^"]+)"/);
if (!contentDirMatch) {
  console.error("no contentDir found for n=" + n + " slug=" + slug);
  process.exit(1);
}
const rebuilt = ' contentDir: "' + contentDirMatch[1] + '", videoUrl: "' + secureUrl + '", durationLabel: "' + durationLabel + '" ';
outline = outline.replace(anyShapeRe, "$1" + rebuilt + "$3");
fs.writeFileSync(outlineFile, outline);
console.log("patched n=" + n + " slug=" + slug + " durationLabel=" + durationLabel);
