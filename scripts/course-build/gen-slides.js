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
 * "title" and "outro" both render the full-bleed brand bookend card (with the
 * seal composited on) — "title" uses the larger opening-card type scale,
 * "outro" the slightly smaller closing-card scale.
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

// ---- full-card bookend (title / outro) --------------------------------------
function bookendCard(spec, big) {
  const ebY = big ? 320 : 350;
  const titleY = big ? 440 : 470;
  const titleSize = big ? 104 : 88;
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
function stepsCard(spec) {
  const steps = spec.steps || [];
  const n = steps.length;
  const gap = 36;
  let bw = 300;
  if (bw * n + gap * (n - 1) > W - 160) {
    bw = Math.floor((W - 160 - gap * (n - 1)) / n);
  }
  const x0 = (W - (bw * n + gap * (n - 1))) / 2, y0 = 470;
  let nodes = "";
  steps.forEach((s, i) => {
    const x = x0 + i * (bw + gap);
    nodes += `<rect x="${x}" y="${y0}" width="${bw}" height="150" fill="none" stroke="${C.gold}" stroke-width="2"/>
    <text x="${x + bw / 2}" y="${y0 + 62}" text-anchor="middle" font-family="${SERIF}" font-size="40" fill="${C.parchment}">${esc(s.label)}</text>
    <text x="${x + bw / 2}" y="${y0 + 108}" text-anchor="middle" font-family="${SANS}" font-size="22" fill="${C.goldPale}">${esc(s.sub || "")}</text>
    <text x="${x + bw / 2}" y="${y0 - 30}" text-anchor="middle" font-family="${SERIF}" font-size="34" fill="${C.gold}">0${i + 1}</text>`;
    if (i < n - 1) nodes += `<text x="${x + bw + gap / 2}" y="${y0 + 88}" text-anchor="middle" font-family="${SANS}" font-size="40" fill="${C.gold}">→</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.deep}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 250, spec.eyebrow)}
  ${headline(160, 360, 76, spec.titlePlain, spec.titleEmphasis, spec.titleSuffix)}
  ${nodes}
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
    } else if (spec.type === "screenshot") {
      const s = await screenshotSlide(spec, badge);
      await s.toFile(outFile);
    } else {
      throw new Error(`Unknown slide type "${spec.type}" at index ${i}`);
    }
  }
  console.log("SLIDES_DONE", fs.readdirSync(OUT).join(","));
})().catch((e) => { console.error(e); process.exit(1); });
