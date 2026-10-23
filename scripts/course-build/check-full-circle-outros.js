/*
 * Reusable outro-vs-real-title consistency checker for Full-Circle Implementation
 * Series paths. Every lesson's video-script outro slide previews the next lesson's
 * title, but parallel-written lesson groups don't always see the next group's real
 * title yet when they write it — this catches the mismatch before shipping.
 * Usage: node check-full-circle-outros.js <pathSlug>
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const pathSlug = process.argv[2];
if (!pathSlug) throw new Error("Usage: node check-full-circle-outros.js <pathSlug>");

const series = JSON.parse(fs.readFileSync(path.join(ROOT, "content/full-circle-series", `${pathSlug}.json`), "utf8"));
let problems = 0;
for (const l of series.lessons) {
  if (l.n === series.lessons.length) continue;
  const next = series.lessons.find((x) => x.n === l.n + 1);
  const slidesPath = path.join(ROOT, "content/full-circle-series", pathSlug, l.slug, "slides.json");
  const slides = JSON.parse(fs.readFileSync(slidesPath, "utf8"));
  const outro = slides[slides.length - 1];
  const outroTitle = (outro.titlePlain + outro.titleEmphasis + outro.titleSuffix).toLowerCase().replace(/[^a-z]/g, "");
  const realTitle = next.title.toLowerCase().replace(/[^a-z]/g, "");
  const match = realTitle.includes(outroTitle.slice(0, 15)) || outroTitle.includes(realTitle.slice(0, 15));
  if (!match) {
    console.log(`MISMATCH lesson ${l.n} -> ${l.n + 1}: outro says "${outro.titlePlain}${outro.titleEmphasis}" but real next title is "${next.title}"`);
    problems++;
  }
}
console.log(problems === 0 ? "ALL OUTROS MATCH." : `${problems} outro mismatch(es) found — fix before shipping.`);
