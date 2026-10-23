/*
 * Reads every per-lesson result file written by build-full-circle-video-result.js and patches
 * videoUrl/durationLabel onto the matching lessons inside <pathSlug>.json in ONE read-modify-write
 * pass -- this is the step that makes parallel video building safe: no two processes ever write to
 * the shared course JSON at the same time, because only this script ever writes to it, and it only
 * ever runs once, after every parallel worker has already finished and saved its own result file.
 *
 * Usage: node merge-full-circle-video-results.js <pathSlug> <resultsDir>
 *
 * Does NOT modify patch-full-circle-video.js (kept as-is for the existing serial pipeline).
 * Does NOT touch any lesson whose result file reports status "failed" -- those lessons are left
 * exactly as they were (so a partial batch never corrupts already-good content), and the script
 * prints a summary of which lessons were patched vs. left alone.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const [, , pathSlug, resultsDir] = process.argv;

if (!pathSlug || !resultsDir) {
  console.error("Usage: node merge-full-circle-video-results.js <pathSlug> <resultsDir>");
  process.exit(1);
}

const courseFile = path.join(ROOT, "content", "full-circle-series", `${pathSlug}.json`);
if (!fs.existsSync(courseFile)) {
  console.error(`Course file not found: ${courseFile}`);
  process.exit(1);
}

if (!fs.existsSync(resultsDir)) {
  console.error(`Results directory not found: ${resultsDir}`);
  process.exit(1);
}

const resultFiles = fs.readdirSync(resultsDir).filter((f) => f.endsWith(".json"));
if (resultFiles.length === 0) {
  console.error(`No result files found in ${resultsDir}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(courseFile, "utf8"));

let patched = 0;
let failed = 0;
let notFound = 0;
const patchedSlugs = [];
const failedSlugs = [];
const notFoundSlugs = [];

for (const file of resultFiles) {
  const result = JSON.parse(fs.readFileSync(path.join(resultsDir, file), "utf8"));
  if (result.pathSlug !== pathSlug) {
    console.error(`Skipping ${file}: belongs to pathSlug "${result.pathSlug}", not "${pathSlug}"`);
    continue;
  }
  if (result.status === "failed") {
    failed++;
    failedSlugs.push(result.lessonSlug);
    continue;
  }
  const lesson = data.lessons.find((l) => l.slug === result.lessonSlug);
  if (!lesson) {
    notFound++;
    notFoundSlugs.push(result.lessonSlug);
    continue;
  }
  lesson.videoUrl = result.videoUrl;
  lesson.durationLabel = result.durationLabel;
  patched++;
  patchedSlugs.push(result.lessonSlug);
}

fs.writeFileSync(courseFile, JSON.stringify(data, null, 2));

console.log(`MERGE_SUMMARY pathSlug=${pathSlug} patched=${patched} failed=${failed} notFound=${notFound}`);
if (patchedSlugs.length) console.log(`  patched: ${patchedSlugs.join(", ")}`);
if (failedSlugs.length) console.log(`  failed: ${failedSlugs.join(", ")}`);
if (notFoundSlugs.length) console.log(`  notFound: ${notFoundSlugs.join(", ")}`);
