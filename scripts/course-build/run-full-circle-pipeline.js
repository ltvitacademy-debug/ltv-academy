/*
 * Orchestrates build -> upload -> patch for one Full-Circle Implementation Series lesson.
 * Usage: node run-full-circle-pipeline.js <pathSlug> <lessonSlug>
 * Requires FISH_API_KEY, FISH_REFERENCE_ID, CLOUDINARY_* env vars already set.
 * Does NOT modify gen-slides.js, build-lesson-fish.js, or patch-full-circle-video.js.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const pathSlug = process.argv[2];
const lessonSlug = process.argv[3];

const lessonDir = path.join(ROOT, "content", "full-circle-series", pathSlug, lessonSlug);
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

const publicId = `ltv-full-circle-${pathSlug}/${lessonSlug}`;
const uploadOut = execFileSync(
  process.execPath,
  [path.join(ROOT, "scripts", "course-build", "upload-to-cloudinary.js"), mp4, publicId],
  { env: process.env, encoding: "utf8" }
);
console.log(uploadOut);
const result = JSON.parse(uploadOut);
const secureUrl = result.secure_url;
const duration = result.duration;
const mins = Math.floor(duration / 60);
const secs = Math.round(duration % 60);
const durationLabel = mins > 0 ? `${mins} min ${secs} s` : `${secs} s`;

const patchOut = execFileSync(
  process.execPath,
  [path.join(ROOT, "scripts", "course-build", "patch-full-circle-video.js"), pathSlug, lessonSlug, secureUrl, durationLabel],
  { env: process.env, encoding: "utf8" }
);
console.log(patchOut);
