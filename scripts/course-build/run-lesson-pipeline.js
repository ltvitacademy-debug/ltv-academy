/*
 * Orchestrates build -> upload -> outline update for one lesson.
 * Usage: node run-lesson-pipeline.js <course> <contentDir e.g. ch01/01-slug> <slug> <n>
 * Requires FISH_API_KEY, FISH_REFERENCE_ID, CLOUDINARY_* env vars already set.
 * Does NOT modify gen-slides.js or build-lesson-fish.js.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const course = process.argv[2];
const contentDir = process.argv[3];
const slug = process.argv[4];
const n = process.argv[5];

const lessonDir = path.join(ROOT, "content", course, contentDir);
const outlineFile = path.join(ROOT, "lib", `${course}-outline.ts`);
const mp4 = path.join(lessonDir, "lesson-fish.mp4");

function runBuildWithRetry() {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const out = execFileSync(
        process.execPath,
        [path.join(ROOT, "scripts", "course-build", "build-lesson-fish.js"), lessonDir],
        { env: process.env, encoding: "utf8" }
      );
      console.log(out);
      return;
    } catch (e) {
      const msg = (e.stdout || "") + (e.stderr || "") + (e.message || "");
      if (/429/.test(msg) && attempt < 6) {
        console.log(`429 rate limit, waiting 15s (attempt ${attempt})...`);
        execFileSync(process.platform === "win32" ? "powershell" : "sleep", process.platform === "win32" ? ["-Command", "Start-Sleep -Seconds 15"] : ["15"]);
        continue;
      }
      throw e;
    }
  }
}

runBuildWithRetry();

if (!fs.existsSync(mp4)) {
  console.error("lesson-fish.mp4 not produced for " + lessonDir);
  process.exit(1);
}

const publicId = `ltv-${course}/${slug}`;
const uploadOut = execFileSync(
  process.execPath,
  [path.join(ROOT, "scripts", "course-build", "upload-to-bunny.js"), mp4, publicId],
  { env: process.env, encoding: "utf8" }
);
console.log(uploadOut);
const result = JSON.parse(uploadOut);
const secureUrl = result.secure_url;
const duration = result.duration;
const mins = Math.floor(duration / 60);
const secs = Math.round(duration % 60);
const durationLabel = mins > 0 ? `${mins} min ${secs} s` : `${secs} s`;

let outline = fs.readFileSync(outlineFile, "utf8");
console.log("DEBUG about to test regex for n=" + n + " slug=" + slug);
const lineRe = new RegExp(`(L\\(${n}, "${slug}", "[^"]*", \\{ contentDir: "[^"]+")( \\})(\\),)`);
const testResult = lineRe.test(outline);
console.log("DEBUG testResult=" + testResult);
if (!testResult) {
  console.error("Could not find outline line to patch for n=" + n + " slug=" + slug);
  process.exit(1);
}
console.log("DEBUG about to replace+write");
outline = outline.replace(lineRe, `$1, videoUrl: "${secureUrl}", durationLabel: "${durationLabel}" }$3`);
fs.writeFileSync(outlineFile, outline);
console.log(`PATCHED outline: n=${n} slug=${slug} videoUrl=${secureUrl} durationLabel=${durationLabel}`);
console.log("DEBUG write complete, about to exit normally");
