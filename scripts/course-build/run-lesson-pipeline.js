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

// Two known entry shapes in this outline:
//  (a) single-line, newly-inserted lessons: L(n, "slug", "title", { contentDir: "..." }),
//  (b) multi-line legacy lessons that already carry videoUrl/durationLabel:
//      L(n, "slug", "title", {\n  contentDir: "...",\n  videoUrl: "...",\n  durationLabel: "...",\n}),
// Both shapes only ever contain contentDir/videoUrl/durationLabel and no nested braces,
// so a non-greedy dotall match from the opening "{" to the next "}" is safe for either.
// Titles can contain escaped quotes (e.g. \"Production Ready\"), so the title
// string must be matched as a proper JS string literal: (?:[^"\\]|\\.)*
const singleLineRe = new RegExp(`(L\\(${n}, "${slug}", "(?:[^"\\\\]|\\\\.)*", \\{ contentDir: "[^"]+")( \\})(\\),)`);
const anyShapeRe = new RegExp(`(L\\(${n}, "${slug}", "(?:[^"\\\\]|\\\\.)*", \\{)([\\s\\S]*?)(\\}\\),)`);

let testResult = singleLineRe.test(outline);
console.log("DEBUG singleLine testResult=" + testResult);
if (testResult) {
  outline = outline.replace(singleLineRe, `$1, videoUrl: "${secureUrl}", durationLabel: "${durationLabel}" }$3`);
} else {
  const anyMatch = anyShapeRe.exec(outline);
  console.log("DEBUG anyShape testResult=" + !!anyMatch);
  if (!anyMatch) {
    console.error("Could not find outline line to patch for n=" + n + " slug=" + slug);
    process.exit(1);
  }
  const contentDirMatch = anyMatch[2].match(/contentDir:\s*"([^"]+)"/);
  if (!contentDirMatch) {
    console.error("Found entry but could not extract contentDir for n=" + n + " slug=" + slug);
    process.exit(1);
  }
  const rebuiltBody = ` contentDir: "${contentDirMatch[1]}", videoUrl: "${secureUrl}", durationLabel: "${durationLabel}" `;
  outline = outline.replace(anyShapeRe, `$1${rebuiltBody}$3`);
}
console.log("DEBUG about to replace+write");
fs.writeFileSync(outlineFile, outline);
console.log(`PATCHED outline: n=${n} slug=${slug} videoUrl=${secureUrl} durationLabel=${durationLabel}`);
console.log("DEBUG write complete, about to exit normally");
