/*
 * Builds every lesson's video for a Full-Circle Implementation Series path IN PARALLEL (bounded
 * concurrency), safely: each worker writes its own result file via
 * build-full-circle-video-result.js, and only after every worker has finished does
 * merge-full-circle-video-results.js patch them all into <pathSlug>.json in one pass. No two
 * processes ever write to the shared course JSON at the same time.
 *
 * Usage: node run-full-circle-pipeline-parallel.js <pathSlug> <lessonsListFile> [concurrency]
 *   <lessonsListFile>: lines of "lessonSlug|n", one lesson per line (same format the existing
 *   serial build-fc-<pathSlug>-videos.sh scripts generate).
 *   [concurrency]: how many lessons to build at once. Defaults to 4 -- kept modest since this
 *   calls a real paid TTS API (Fish Audio) per lesson and a burst of concurrent requests risks
 *   429 rate-limit responses; build-full-circle-video-result.js already retries those with backoff.
 *
 * Does NOT modify gen-slides.js, build-lesson-fish.js, upload-to-cloudinary.js, or
 * patch-full-circle-video.js -- the existing serial pipeline (run-full-circle-pipeline.js) is left
 * exactly as it was and still works for single-lesson or small-batch use.
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.resolve(__dirname, "..", "..");
const [, , pathSlug, lessonsListFile, concurrencyArg] = process.argv;

if (!pathSlug || !lessonsListFile) {
  console.error("Usage: node run-full-circle-pipeline-parallel.js <pathSlug> <lessonsListFile> [concurrency]");
  process.exit(1);
}

const concurrency = Math.max(1, parseInt(concurrencyArg, 10) || 4);

const lines = fs
  .readFileSync(lessonsListFile, "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

const lessons = lines.map((line) => {
  const [slug, n] = line.split("|");
  return { slug, n };
});

if (lessons.length === 0) {
  console.error(`No lessons found in ${lessonsListFile}`);
  process.exit(1);
}

const resultsDir = path.join(
  os.tmpdir(),
  "ltv-full-circle-video-results",
  pathSlug,
  String(Date.now())
);
fs.mkdirSync(resultsDir, { recursive: true });

console.log(`Building ${lessons.length} lesson videos for "${pathSlug}" with concurrency=${concurrency}`);
console.log(`Results dir: ${resultsDir}`);

function runOne(lesson) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [path.join(ROOT, "scripts", "course-build", "build-full-circle-video-result.js"), pathSlug, lesson.slug, resultsDir],
      { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] }
    );
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("close", (code) => {
      process.stdout.write(out);
      resolve({ lesson, code });
    });
  });
}

async function runPool() {
  const queue = lessons.slice();
  const results = [];
  let active = 0;

  return new Promise((resolve) => {
    function pump() {
      if (queue.length === 0 && active === 0) {
        resolve(results);
        return;
      }
      while (active < concurrency && queue.length > 0) {
        const lesson = queue.shift();
        active++;
        console.log(`=== [${lesson.n}] ${lesson.slug} === (starting, ${active} active)`);
        runOne(lesson).then((r) => {
          active--;
          results.push(r);
          console.log(`=== [${r.lesson.n}] ${r.lesson.slug} === ${r.code === 0 ? "OK" : "FAILED"}`);
          pump();
        });
      }
    }
    pump();
  });
}

(async () => {
  const results = await runPool();
  const okCount = results.filter((r) => r.code === 0).length;
  const failedCount = results.filter((r) => r.code !== 0).length;
  console.log(`\nBUILD_PHASE_DONE ok=${okCount} failed=${failedCount}`);

  const mergeOut = await new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [path.join(ROOT, "scripts", "course-build", "merge-full-circle-video-results.js"), pathSlug, resultsDir],
      { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] }
    );
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("close", () => resolve(out));
  });
  console.log(mergeOut);

  if (failedCount > 0) {
    const failedSlugs = results.filter((r) => r.code !== 0).map((r) => r.lesson.slug);
    console.log(`FAILED_LESSONS: ${failedSlugs.join(", ")}`);
    process.exit(1);
  }
})();
