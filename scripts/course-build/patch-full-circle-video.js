/*
 * Patches videoUrl/durationLabel onto one lesson inside a Full-Circle series JSON file.
 * Usage: node patch-full-circle-video.js <pathSlug> <lessonSlug> <videoUrl> <durationLabel>
 */
const fs = require("fs");
const path = require("path");

const [, , pathSlug, lessonSlug, videoUrl, durationLabel] = process.argv;
if (!pathSlug || !lessonSlug || !videoUrl || !durationLabel) {
  console.error("Usage: node patch-full-circle-video.js <pathSlug> <lessonSlug> <videoUrl> <durationLabel>");
  process.exit(1);
}

const file = path.join(__dirname, "..", "..", "content", "full-circle-series", `${pathSlug}.json`);
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const lesson = data.lessons.find((l) => l.slug === lessonSlug);
if (!lesson) {
  console.error(`Lesson not found: ${lessonSlug} in ${file}`);
  process.exit(1);
}
lesson.videoUrl = videoUrl;
lesson.durationLabel = durationLabel;
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(`PATCHED ${pathSlug}/${lessonSlug}: videoUrl=${videoUrl} durationLabel=${durationLabel}`);
