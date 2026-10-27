// Sequentially redubs every Cloudinary (ElevenLabs) lesson in t-sql-outline.ts to
// Fish Audio / Bunny.net, using the existing run-lesson-pipeline.js for each one.
// Intentionally sequential (NOT parallel) to avoid concurrent-write corruption of
// lib/t-sql-outline.ts (documented gotcha from prior course batches in this repo).
// Resumable: re-checks the outline before each lesson and skips ones already on Bunny.
//
// Usage: node redub-batch.js <listFile.json> <logFile>
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const outlineFile = path.join(ROOT, "lib", "t-sql-outline.ts");
const pipelineScript = path.join(__dirname, "run-lesson-pipeline.js");

const listFile = process.argv[2];
const logFile = process.argv[3];

const list = JSON.parse(fs.readFileSync(listFile, "utf8"));

function log(line) {
  const stamped = `[${new Date().toISOString()}] ${line}`;
  console.log(stamped);
  fs.appendFileSync(logFile, stamped + "\n");
}

function isAlreadyBunny(n, slug) {
  const outline = fs.readFileSync(outlineFile, "utf8");
  const re = new RegExp(`L\\(${n}, "${slug}", "[^"]*", \\{([\\s\\S]*?)\\}\\),`);
  const m = re.exec(outline);
  if (!m) return { found: false };
  return { found: true, bunny: /ltvacademyvideos\.b-cdn\.net/.test(m[0]), cloud: /res\.cloudinary\.com/.test(m[0]) };
}

log(`START batch of ${list.length} lessons`);
let okCount = 0, failCount = 0, skipCount = 0;

for (const item of list) {
  const { n, slug, contentDir } = item;
  const status = isAlreadyBunny(n, slug);
  if (!status.found) {
    log(`SKIP n=${n} slug=${slug} - not found in outline anymore`);
    skipCount++;
    continue;
  }
  if (status.bunny) {
    log(`SKIP n=${n} slug=${slug} - already on bunny.net`);
    skipCount++;
    continue;
  }
  log(`BEGIN n=${n} slug=${slug} contentDir=${contentDir}`);
  try {
    const out = execFileSync(process.execPath, [pipelineScript, "t-sql", contentDir, slug, String(n)], {
      env: process.env,
      encoding: "utf8",
      timeout: 1000 * 60 * 10, // 10 min hard cap per lesson
    });
    log(`OK n=${n} slug=${slug}\n${out.split("\n").slice(-5).join("\n")}`);
    okCount++;
  } catch (e) {
    const msg = (e.stdout || "") + (e.stderr || "") + (e.message || "");
    log(`FAIL n=${n} slug=${slug} ERROR: ${msg.slice(0, 2000)}`);
    failCount++;
  }
}

log(`DONE batch. ok=${okCount} fail=${failCount} skip=${skipCount}`);
