// One-off remediation: several course-build agents wrote every quiz question's
// correct answer at the same option index (almost always index 0) across an
// entire lesson -- a real defect, since a student could pass by always picking
// the first option without reading. This script finds every quiz.json under
// content/ where all 5 answers share one index, and reshuffles each question's
// options (remapping the answer index to match) so the position varies.
// Text content is untouched -- only option ORDER and the answer index change.
const fs = require("fs");
const path = require("path");

const CONTENT_ROOT = path.join(__dirname, "..", "..", "content");
let fixedLessons = 0;
let fixedQuestions = 0;
let scannedQuizzes = 0;

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deterministic per-question PRNG seeded from lesson+question text, so re-running
// this script is idempotent (won't keep re-shuffling already-fixed files since
// those no longer match the "all answers identical" trigger condition).
function seededRng(seedStr) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0;
  return function () {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === "quiz.json") {
      scannedQuizzes++;
      const raw = fs.readFileSync(full, "utf8");
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.log(`SKIP (invalid JSON): ${full}`);
        continue;
      }
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) continue;
      const answers = data.questions.map((q) => q.answer);
      const allSame = answers.every((a) => a === answers[0]);
      if (!allSame) continue;

      let changedAny = false;
      data.questions.forEach((q, qi) => {
        if (!Array.isArray(q.options) || typeof q.answer !== "number") return;
        const correctText = q.options[q.answer];
        const rng = seededRng(`${full}::${qi}::${q.q || ""}`);
        const newOptions = shuffle(q.options, rng);
        const newAnswer = newOptions.indexOf(correctText);
        if (newAnswer === -1) return; // safety: shouldn't happen, text is preserved verbatim
        q.options = newOptions;
        q.answer = newAnswer;
        changedAny = true;
        fixedQuestions++;
      });

      if (changedAny) {
        fs.writeFileSync(full, JSON.stringify(data, null, 2) + "\n");
        fixedLessons++;
        console.log(`FIXED: ${full} -> ${data.questions.map((q) => q.answer).join(",")}`);
      }
    }
  }
}

walk(CONTENT_ROOT);
console.log(`\nScanned ${scannedQuizzes} quiz.json files.`);
console.log(`Fixed ${fixedLessons} lessons (${fixedQuestions} questions reshuffled).`);
