/*
 * Builds one Full-Circle Implementation Series lesson's video (TTS build -> Cloudinary upload)
 * and writes the result to its OWN file in a results directory, instead of patching the shared
 * <pathSlug>.json directly. This makes it safe to run many lessons in parallel: each process only
 * ever touches its own result file, never the shared course JSON.
 *
 * Usage: node build-full-circle-video-result.js <pathSlug> <lessonSlug> <resultsDir>
 *
 * Does NOT modify gen-slides.js, build-lesson-fish.js, upload-to-cloudinary.js, or
 * patch-full-circle-video.js. Reuses build-lesson-fish.js and upload-to-cloudinary.js exactly as
 * run-full-circle-pipeline.js does; merge-full-circle-video-results.js does the actual shared-file
 * patch afterward, once, for every lesson in the results directory.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const [, , pathSlug, lessonSlug, resultsDir] = process.argv;

if (!pathSlug || !lessonSlug || !resultsDir) {
  console.error("Usage: node build-full-circle-video-result.js <pathSlug> <lessonSlug> <resultsDir>");
  process.exit(1);
}

const lessonDir = path.join(ROOT, "content", "full-circle-series", pathSlug, lessonSlug);
const mp4 = path.join(lessonDir, "lesson-fish.mp4");

fs.mkdirSync(resultsDir, { recursive: true });
const resultFile = path.join(resultsDir, `${lessonSlug}.json`);

function writeResult(result) {
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
}

function runBuildWithRetry() {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const out = execFileSync(
        process.execPath,
        [path.join(ROOT, "scripts", "course-build", "build-lesson-fish.js"), lessonDir],
        { env: process.env, encoding: "utf8" }
      );
      console.log(`[${lessonSlug}] ${out}`);
      return;
    } catch (e) {
      const msg = (e.stdout || "") + (e.stderr || "") + (e.message || "");
      if (/429/.test(msg) && attempt < 6) {
        console.log(`[${lessonSlug}] 429 rate limit, waiting 15s (attempt ${attempt})...`);
        execFileSync(
          process.platform === "win32" ? "powershell" : "sleep",
          process.platform === "win32" ? ["-Command", "Start-Sleep -Seconds 15"] : ["15"]
        );
        continue;
      }
      throw e;
    }
  }
}

try {
  runBuildWithRetry();

  if (!fs.existsSync(mp4)) {
    throw new Error("lesson-fish.mp4 not produced for " + lessonDir);
  }

  const publicId = `ltv-full-circle-${pathSlug}/${lessonSlug}`;
  const uploadOut = execFileSync(
    process.execPath,
    [path.join(ROOT, "scripts", "course-build", "upload-to-cloudinary.js"), mp4, publicId],
    { env: process.env, encoding: "utf8" }
  );
  console.log(`[${lessonSlug}] ${uploadOut}`);
  const uploadResult = JSON.parse(uploadOut);
  const secureUrl = uploadResult.secure_url;
  const duration = uploadResult.duration;
  const mins = Math.floor(duration / 60);
  const secs = Math.round(duration % 60);
  const durationLabel = mins > 0 ? `${mins} min ${secs} s` : `${secs} s`;

  writeResult({
    pathSlug,
    lessonSlug,
    status: "ok",
    videoUrl: secureUrl,
    durationLabel,
  });
  console.log(`[${lessonSlug}] RESULT_OK videoUrl=${secureUrl} durationLabel=${durationLabel}`);
} catch (e) {
  const errMsg = (e && e.message) || String(e);
  writeResult({
    pathSlug,
    lessonSlug,
    status: "failed",
    error: errMsg,
  });
  console.error(`[${lessonSlug}] RESULT_FAILED ${errMsg}`);
  process.exit(1);
}
