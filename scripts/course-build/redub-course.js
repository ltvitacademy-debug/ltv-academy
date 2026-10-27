// Generic version of redub-batch.js: redubs every Cloudinary (ElevenLabs) lesson in
// ANY course's outline to Fish Audio / Bunny.net, using the existing run-lesson-pipeline.js
// for each one. Intentionally sequential within a course (NOT parallel) to avoid
// concurrent-write corruption of that course's outline file. Safe to run many of these
// concurrently for DIFFERENT courses, since each only touches its own outline file.
// Resumable: re-checks the outline before each lesson and skips ones already on Bunny.
//
// Usage: node redub-course.js <outlineBasename e.g. tableau-outline.ts> <logFile>
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const outlineBasename = process.argv[2];
const logFile = process.argv[3];

const outlineFile = path.join(ROOT, "lib", outlineBasename);
const pipelineScript = path.join(__dirname, "run-lesson-pipeline.js");

function log(line) {
  const stamped = `[${new Date().toISOString()}] ${line}`;
  console.log(stamped);
  fs.appendFileSync(logFile, stamped + "\n");
}

const src0 = fs.readFileSync(outlineFile, "utf8");
const contentBaseM = src0.match(/\/\/ under content\/([a-z0-9-]+)\//);
if (!contentBaseM) {
  log(`FATAL: could not find "// under content/<base>/" comment in ${outlineBasename}`);
  process.exit(1);
}
const contentBase = contentBaseM[1];
log(`START ${outlineBasename} contentBase=${contentBase}`);

function findCloudinaryLessons() {
  const src = fs.readFileSync(outlineFile, "utf8");
  const calls = src.split(/\bL\(/).slice(1);
  const out = [];
  for (const call of calls) {
    const headM = call.match(/^(\d+),\s*"([^"]+)"/);
    const contentDirM = call.match(/contentDir:\s*"([^"]+)"/);
    const videoUrlM = call.match(/videoUrl:\s*"(https:\/\/[^"]+)"/);
    if (!headM || !contentDirM) continue;
    if (videoUrlM && videoUrlM[1].includes("res.cloudinary.com")) {
      out.push({ n: headM[1], slug: headM[2], contentDir: contentDirM[1] });
    }
  }
  return out;
}

let list = findCloudinaryLessons();
log(`Found ${list.length} lessons still on Cloudinary`);

let okCount = 0, failCount = 0, skipCount = 0;

for (const item of list) {
  const { n, slug, contentDir } = item;
  // Re-check immediately before running in case something upstream already patched it
  const current = findCloudinaryLessons().find((l) => l.n === n && l.slug === slug);
  if (!current) {
    log(`SKIP n=${n} slug=${slug} - already redubbed (not in current cloudinary list)`);
    skipCount++;
    continue;
  }
  log(`BEGIN n=${n} slug=${slug} contentDir=${contentDir}`);
  try {
    const out = execFileSync(
      process.execPath,
      [pipelineScript, contentBase, contentDir, slug, String(n)],
      { env: process.env, encoding: "utf8", timeout: 1000 * 60 * 10 }
    );
    log(`OK n=${n} slug=${slug}\n${out.split("\n").slice(-5).join("\n")}`);
    okCount++;
  } catch (e) {
    const msg = (e.stdout || "") + (e.stderr || "") + (e.message || "");
    log(`FAIL n=${n} slug=${slug} ERROR: ${msg.slice(0, 1500)}`);
    failCount++;
  }
}

log(`DONE ${outlineBasename}. ok=${okCount} fail=${failCount} skip=${skipCount}`);
