// One-off disk-audit helper: verifies every lesson dir referenced by an outline file
// has guide.md/quiz.json/segments.json/slides.json plus a slides/ folder whose PNG
// count matches both slides.json's length and segments.json's length.
// Usage: node scripts/course-build/audit-course.js <content/course-slug>
const fs = require("fs");
const path = require("path");

const contentRoot = process.argv[2];
if (!contentRoot) {
  console.error("Usage: node audit-course.js <content/course-slug>");
  process.exit(1);
}

let problems = 0;
let lessonCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "slides" || entry.name === "source-images") continue;
      const hasGuide = fs.existsSync(path.join(full, "guide.md"));
      const hasQuiz = fs.existsSync(path.join(full, "quiz.json"));
      const hasSeg = fs.existsSync(path.join(full, "segments.json"));
      const hasSlides = fs.existsSync(path.join(full, "slides.json"));
      if (hasGuide || hasQuiz || hasSeg || hasSlides) {
        lessonCount++;
        if (!hasGuide) { console.log(`MISSING guide.md: ${full}`); problems++; }
        if (!hasQuiz) { console.log(`MISSING quiz.json: ${full}`); problems++; }
        if (!hasSeg) { console.log(`MISSING segments.json: ${full}`); problems++; }
        if (!hasSlides) { console.log(`MISSING slides.json: ${full}`); problems++; }
        if (hasSeg && hasSlides) {
          const seg = JSON.parse(fs.readFileSync(path.join(full, "segments.json"), "utf8"));
          const sld = JSON.parse(fs.readFileSync(path.join(full, "slides.json"), "utf8"));
          const slidesDir = path.join(full, "slides");
          const pngCount = fs.existsSync(slidesDir) ? fs.readdirSync(slidesDir).filter((f) => f.endsWith(".png")).length : 0;
          if (seg.length !== sld.length || sld.length !== pngCount) {
            console.log(`MISMATCH ${full}: segments=${seg.length} slides=${sld.length} pngs=${pngCount}`);
            problems++;
          }
        }
      }
      walk(full);
    }
  }
}

walk(contentRoot);
console.log(`\nAudited ${lessonCount} lessons, ${problems} problem(s) found.`);
process.exit(problems > 0 ? 1 : 0);
