/*
 * Copies the screenshots a lesson's slides.json actually uses from
 * <lesson dir>/source-images/ into public/courses/power-bi/<contentDir>/,
 * so guide.md can embed the same real screenshots the video shows.
 * Usage: node copy-guide-images.js <abs lesson dir> <contentDir, e.g. ch01/02-installing-power-bi-desktop>
 */
const fs = require("fs");
const path = require("path");

const LESSON = process.argv[2];
const CONTENT_DIR = process.argv[3];

const specs = JSON.parse(fs.readFileSync(path.join(LESSON, "slides.json"), "utf8"));
const files = specs.filter((s) => s.type === "screenshot").map((s) => s.file);

const dest = path.join(__dirname, "..", "..", "public", "courses", "power-bi", CONTENT_DIR);
fs.mkdirSync(dest, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(LESSON, "source-images", file), path.join(dest, file));
  console.log("copied", file);
}
console.log(`DONE — ${files.length} screenshot(s) in public/courses/power-bi/${CONTENT_DIR}/`);
