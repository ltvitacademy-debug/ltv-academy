/*
 * Generic slide generator for the LTV Power BI course.
 * Reads <lesson dir>/slides.json (an ordered list of slide specs) and
 * rasterizes each one to slides/s1..sN.png (1920x1080, LTV brand) with sharp.
 * Fonts: Georgia stands in for Fraunces, Arial for Inter (system fonts the
 * rasterizer can see). Swap when brand fonts are installed system-wide.
 *
 * Slide spec shapes (the "type" field selects one):
 *   { "type": "title", "eyebrow", "titlePlain", "titleEmphasis"?, "titleSuffix"?, "subtitle"? }
 *   { "type": "outro", "eyebrow", "titlePlain", "titleEmphasis"?, "titleSuffix"?, "subtitle"? }
 *   { "type": "screenshot", "file", "eyebrow", "caption" }
 *   { "type": "steps", "eyebrow", "titlePlain", "titleEmphasis"?, "titleSuffix"?,
 *     "steps": [{ "label", "sub" }, ...] }
 *   { "type": "code", "eyebrow", "code" (string, \n-separated lines), "caption" }
 * "title" and "outro" both render the full-bleed brand bookend card (with the
 * seal composited on) — "title" uses the larger opening-card type scale,
 * "outro" the slightly smaller closing-card scale. "code" is an original,
 * LTV-authored formula card (like "steps") — not a claimed screenshot — used
 * for DAX lessons where there's no real Power BI UI to show.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const LESSON = process.argv[2];
const SEAL = process.argv[3]; // ltv-logo-still.png
const OUT = path.join(LESSON, "slides");
const IMGS = path.join(LESSON, "source-images");
const SPEC_PATH = path.join(LESSON, "slides.json");

const C = {
  parchment: "#F4EFE4", ink: "#1E1A16", crimson: "#8E1C1C",
  deep: "#5E0F0F", gold: "#C4952E", goldPale: "#F1DFB4", stone: "#6B6259",
};
const W = 1920, H = 1080;
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, sans-serif";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function eyebrow(x, y, text, fill = C.gold) {
  return `<text x="${x}" y="${y}" font-family="${SANS}" font-size="26" font-weight="600" letter-spacing="7" fill="${fill}">${esc(text.toUpperCase())}</text>`;
}

function headline(x, y, size, plain, emphasis, suffix, fill = C.parchment) {
  const em = emphasis
    ? `<tspan font-style="italic" fill="${C.goldPale}">${esc(emphasis)}</tspan>`
    : "";
  return `<text x="${x}" y="${y}" font-family="${SERIF}" font-size="${size}" fill="${fill}">${esc(plain)}${em}${esc(suffix || "")}</text>`;
}

// Crude but effective: shrink font-size until the (mixed regular/italic serif)
// headline should fit maxWidth, rather than letting long lesson titles run
// off the canvas at a fixed size. ~0.52em average advance covers this font.
function fitHeadlineSize(text, maxWidth, startSize, minSize) {
  const avgCharWidth = 0.52;
  let size = startSize;
  while (size > minSize && text.length * size * avgCharWidth > maxWidth) {
    size -= 4;
  }
  return size;
}

// ---- full-card bookend (title / outro) --------------------------------------
function bookendCard(spec, big) {
  const ebY = big ? 320 : 350;
  const titleY = big ? 440 : 470;
  const combinedTitle = (spec.titlePlain || "") + (spec.titleEmphasis || "") + (spec.titleSuffix || "");
  const titleSize = fitHeadlineSize(combinedTitle, 1920 - 160 - 380, big ? 104 : 88, big ? 56 : 48);
  const subY = big ? 530 : 560;
  const subSize = big ? 34 : 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.deep}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, ebY, spec.eyebrow)}
  ${headline(160, titleY, titleSize, spec.titlePlain, spec.titleEmphasis, spec.titleSuffix)}
  ${spec.subtitle ? `<text x="160" y="${subY}" font-family="${SANS}" font-size="${subSize}" fill="${C.parchment}" opacity="0.85">${esc(spec.subtitle)}</text>` : ""}
  <text x="160" y="960" font-family="${SANS}" font-size="24" letter-spacing="5" fill="${C.goldPale}">LIFTING THE VEIL · INFORMATION TECHNOLOGY ACADEMY</text>
</svg>`;
}

// ---- steps / process diagram card -------------------------------------------
// Step labels are short but sometimes multi-word (e.g. "AZURE DATA FACTORY") —
// shrink the font per-label so long labels don't overflow their box and
// overlap the next one, the same fitting technique used for headlines.
function fitLabelSize(text, maxWidth, startSize, minSize) {
  const avgCharWidth = 0.58;
  let size = startSize;
  while (size > minSize && text.length * size * avgCharWidth > maxWidth) {
    size -= 2;
  }
  return size;
}

// Break `text` into lines that each fit within maxWidth at the given
// font size, shrinking the font (down to minSize) first if even a single
// word can't fit — this is what stepsCard() uses for the "sub" line so a
// long sub-label wraps inside its own box instead of overflowing into the
// neighboring step's box (the original single-line, fixed-size render did
// exactly that whenever a sub was longer than a couple of words).
function wrapToFit(text, maxWidth, startSize, minSize, avgCharWidth = 0.55) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return { size: startSize, lines: [] };

  let size = startSize;
  const longest = Math.max(...words.map((w) => w.length));
  while (size > minSize && longest * size * avgCharWidth > maxWidth) {
    size -= 2;
  }

  const lines = [];
  let cur = "";
  for (const w of words) {
    const trial = cur ? `${cur} ${w}` : w;
    if (!cur || trial.length * size * avgCharWidth <= maxWidth) {
      cur = trial;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return { size, lines };
}

function stepsCard(spec) {
  const steps = spec.steps || [];
  const n = steps.length;
  const gap = 36;
  let bw = 300;
  if (bw * n + gap * (n - 1) > W - 160) {
    bw = Math.floor((W - 160 - gap * (n - 1)) / n);
  }

  const subMaxWidth = bw - 32;
  const wrapped = steps.map((s) => wrapToFit(s.sub, subMaxWidth, 22, 15));
  const subLineH = 27;
  const maxSubLines = Math.max(1, ...wrapped.map((w) => w.lines.length));
  const boxH = Math.max(150, 92 + maxSubLines * subLineH);

  const x0 = (W - (bw * n + gap * (n - 1))) / 2, y0 = 470;
  let nodes = "";
  steps.forEach((s, i) => {
    const x = x0 + i * (bw + gap);
    const labelSize = fitLabelSize(String(s.label), bw - 32, 40, 18);
    const { size: subSize, lines: subLines } = wrapped[i];
    const subStartY = y0 + 108;
    const subTspans = subLines
      .map((line, li) => `<tspan x="${x + bw / 2}" dy="${li === 0 ? 0 : subLineH}">${esc(line)}</tspan>`)
      .join("");
    nodes += `<rect x="${x}" y="${y0}" width="${bw}" height="${boxH}" fill="none" stroke="${C.gold}" stroke-width="2"/>
    <text x="${x + bw / 2}" y="${y0 + 62}" text-anchor="middle" font-family="${SERIF}" font-size="${labelSize}" fill="${C.parchment}">${esc(s.label)}</text>
    <text x="${x + bw / 2}" y="${subStartY}" text-anchor="middle" font-family="${SANS}" font-size="${subSize}" fill="${C.goldPale}">${subTspans}</text>
    <text x="${x + bw / 2}" y="${y0 - 30}" text-anchor="middle" font-family="${SERIF}" font-size="34" fill="${C.gold}">0${i + 1}</text>`;
    if (i < n - 1) nodes += `<text x="${x + bw + gap / 2}" y="${y0 + boxH / 2 + 14}" text-anchor="middle" font-family="${SANS}" font-size="40" fill="${C.gold}">→</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.deep}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 250, spec.eyebrow)}
  ${headline(160, 360, fitHeadlineSize((spec.titlePlain || "") + (spec.titleEmphasis || "") + (spec.titleSuffix || ""), 1920 - 320, 76, 40), spec.titlePlain, spec.titleEmphasis, spec.titleSuffix)}
  ${nodes}
</svg>`;
}

// ---- code / formula card -----------------------------------------------------
// Parchment frame like a screenshot slide, but with a rendered DAX formula
// in a white "formula bar" style box instead of an image. Known DAX
// keywords/functions are highlighted crimson to loosely mirror the real
// editor's syntax coloring.
const DAX_KEYWORDS = [
  "CALCULATE", "CALCULATETABLE", "SUM", "SUMX", "AVERAGE", "AVERAGEX", "COUNT",
  "COUNTX", "COUNTROWS", "COUNTA", "DISTINCTCOUNT", "MIN", "MINX", "MAX", "MAXX",
  "RANKX", "FILTER", "ALL", "ALLEXCEPT", "ALLSELECTED", "ALLNOBLANKROW",
  "REMOVEFILTERS", "KEEPFILTERS", "USERELATIONSHIP", "CROSSFILTER", "RELATED",
  "RELATEDTABLE", "DIVIDE", "IF", "SWITCH", "VAR", "RETURN", "EARLIER",
  "CALENDAR", "CALENDARAUTO", "DATEADD", "DATESYTD", "TOTALYTD", "DATESBETWEEN",
  "SAMEPERIODLASTYEAR", "PARALLELPERIOD",
];
const KEYWORD_RE = new RegExp(`\\b(${DAX_KEYWORDS.join("|")})\\b`, "g");

function highlightDaxLine(line) {
  const parts = [];
  let last = 0;
  let m;
  const re = new RegExp(KEYWORD_RE.source, "g");
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push({ t: line.slice(last, m.index), kw: false });
    parts.push({ t: m[0], kw: true });
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push({ t: line.slice(last), kw: false });
  return parts
    .map((p) =>
      p.kw
        ? `<tspan fill="${C.crimson}" font-weight="700">${esc(p.t)}</tspan>`
        : `<tspan fill="${C.ink}">${esc(p.t)}</tspan>`
    )
    .join("");
}

function codeCard(spec, n) {
  const lines = String(spec.code).split("\n");
  const longest = Math.max(...lines.map((l) => l.length));
  let fontSize = 44;
  const boxW = 1600;
  const padX = 56;
  while (fontSize > 26 && longest * fontSize * 0.6 > boxW - padX * 2) fontSize -= 2;
  const lineH = fontSize * 1.55;
  const boxH = Math.min(640, lines.length * lineH + 80);
  const boxX = (W - boxW) / 2;
  const boxY = 200 + (640 - boxH) / 2;
  const MONO = "Consolas, 'Courier New', monospace";

  let codeLines = "";
  lines.forEach((line, i) => {
    const y = boxY + 60 + i * lineH;
    codeLines += `<text x="${boxX + padX}" y="${y}" xml:space="preserve" font-family="${MONO}" font-size="${fontSize}">${highlightDaxLine(line)}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.parchment}"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 120, spec.eyebrow)}
  <text x="${W - 160}" y="120" text-anchor="end" font-family="${SERIF}" font-size="44" fill="${C.crimson}">${n}</text>
  <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="10" fill="#ffffff" stroke="${C.ink}" stroke-opacity="0.18" stroke-width="1.5"/>
  ${codeLines}
  <line x1="160" y1="930" x2="${W - 160}" y2="930" stroke="${C.ink}" stroke-opacity="0.15"/>
  <text x="160" y="985" font-family="${SERIF}" font-size="38" fill="${C.ink}">${esc(spec.caption)}</text>
</svg>`;
}

// ---- screenshot slides ------------------------------------------------------
// Parchment frame, screenshot fitted, gold eyebrow, ink caption bottom.
async function screenshotSlide(spec, n) {
  const imgPath = path.join(IMGS, spec.file);
  const meta = await sharp(imgPath).metadata();
  const maxW = 1600, maxH = 640;
  const k = Math.min(maxW / meta.width, maxH / meta.height);
  const iw = Math.round(meta.width * k), ih = Math.round(meta.height * k);
  const ix = Math.round((W - iw) / 2), iy = 200 + Math.round((maxH - ih) / 2);
  const img = await sharp(imgPath).resize(iw, ih).png().toBuffer();

  const frame = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.parchment}"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 120, spec.eyebrow)}
  <text x="${W - 160}" y="120" text-anchor="end" font-family="${SERIF}" font-size="44" fill="${C.crimson}">${n}</text>
  <rect x="${ix - 10}" y="${iy - 10}" width="${iw + 20}" height="${ih + 20}" fill="#ffffff" stroke="${C.ink}" stroke-opacity="0.18" stroke-width="1"/>
  <line x1="160" y1="930" x2="${W - 160}" y2="930" stroke="${C.ink}" stroke-opacity="0.15"/>
  <text x="160" y="985" font-family="${SERIF}" font-size="38" fill="${C.ink}">${esc(spec.caption)}</text>
</svg>`;
  return sharp(Buffer.from(frame))
    .composite([{ input: img, left: ix, top: iy }])
    .png();
}

(async () => {
  const specs = JSON.parse(fs.readFileSync(SPEC_PATH, "utf8"));
  fs.mkdirSync(OUT, { recursive: true });
  const seal = await sharp(SEAL).resize(180, 180).png().toBuffer();

  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    const outFile = path.join(OUT, `s${i + 1}.png`);
    const badge = String(i + 1).padStart(2, "0");

    if (spec.type === "title") {
      await sharp(Buffer.from(bookendCard(spec, true)))
        .composite([{ input: seal, left: W - 340, top: 250 }]).png()
        .toFile(outFile);
    } else if (spec.type === "outro") {
      await sharp(Buffer.from(bookendCard(spec, false)))
        .composite([{ input: seal, left: W - 340, top: 250 }]).png()
        .toFile(outFile);
    } else if (spec.type === "steps") {
      await sharp(Buffer.from(stepsCard(spec))).png().toFile(outFile);
    } else if (spec.type === "code") {
      await sharp(Buffer.from(codeCard(spec, badge))).png().toFile(outFile);
    } else if (spec.type === "screenshot") {
      const s = await screenshotSlide(spec, badge);
      await s.toFile(outFile);
    } else {
      throw new Error(`Unknown slide type "${spec.type}" at index ${i}`);
    }
  }
  console.log("SLIDES_DONE", fs.readdirSync(OUT).join(","));
})().catch((e) => { console.error(e); process.exit(1); });
