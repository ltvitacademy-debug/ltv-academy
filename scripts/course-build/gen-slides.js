/*
 * Slide generator for the LTV Power BI course, Lesson 1 pilot.
 * SVG-authored 1920x1080 frames in the LTV brand, rasterized with sharp.
 * Fonts: Georgia stands in for Fraunces, Arial for Inter (system fonts the
 * rasterizer can see). Swap when brand fonts are installed system-wide.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const LESSON = process.argv[2];
const SEAL = process.argv[3]; // ltv-logo-still.png
const OUT = path.join(LESSON, "slides");
const IMGS = path.join(LESSON, "source-images");

const C = {
  parchment: "#F4EFE4", ink: "#1E1A16", crimson: "#8E1C1C",
  deep: "#5E0F0F", gold: "#C4952E", goldPale: "#F1DFB4", stone: "#6B6259",
};
const W = 1920, H = 1080;
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function eyebrow(x, y, text, fill = C.gold) {
  return `<text x="${x}" y="${y}" font-family="${SANS}" font-size="26" font-weight="600" letter-spacing="7" fill="${fill}">${esc(text.toUpperCase())}</text>`;
}

// ---- full-card slides -------------------------------------------------------
function titleCard() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.deep}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 320, "The Power BI Course · Chapter One")}
  <text x="160" y="440" font-family="${SERIF}" font-size="104" fill="${C.parchment}">What Is <tspan font-style="italic" fill="${C.goldPale}">Power BI</tspan>?</text>
  <text x="160" y="530" font-family="${SANS}" font-size="34" fill="${C.parchment}" opacity="0.85">Lesson 1 · Power BI Fundamentals</text>
  <text x="160" y="960" font-family="${SANS}" font-size="24" letter-spacing="5" fill="${C.goldPale}">LIFTING THE VEIL · INFORMATION TECHNOLOGY ACADEMY</text>
</svg>`;
}

function workflowCard() {
  const steps = ["GET", "TRANSFORM", "MODEL", "VISUALIZE", "PUBLISH"];
  const subs = ["connect to data", "clean with Power Query", "relate & calculate", "build the story", "share to the service"];
  const bw = 300, gap = 36, x0 = (W - (bw * 5 + gap * 4)) / 2, y0 = 470;
  let nodes = "";
  steps.forEach((s, i) => {
    const x = x0 + i * (bw + gap);
    nodes += `<rect x="${x}" y="${y0}" width="${bw}" height="150" fill="none" stroke="${C.gold}" stroke-width="2"/>
    <text x="${x + bw / 2}" y="${y0 + 62}" text-anchor="middle" font-family="${SERIF}" font-size="40" fill="${C.parchment}">${s}</text>
    <text x="${x + bw / 2}" y="${y0 + 108}" text-anchor="middle" font-family="${SANS}" font-size="22" fill="${C.goldPale}">${esc(subs[i])}</text>
    <text x="${x + bw / 2}" y="${y0 - 30}" text-anchor="middle" font-family="${SERIF}" font-size="34" fill="${C.gold}">0${i + 1}</text>`;
    if (i < 4) nodes += `<text x="${x + bw + gap / 2}" y="${y0 + 88}" text-anchor="middle" font-family="${SANS}" font-size="40" fill="${C.gold}">→</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.deep}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 250, "The whole job, five words")}
  <text x="160" y="360" font-family="${SERIF}" font-size="76" fill="${C.parchment}">The Power BI <tspan font-style="italic" fill="${C.goldPale}">workflow</tspan>.</text>
  ${nodes}
</svg>`;
}

function outroCard() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.deep}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 350, "Up next · Lesson 2")}
  <text x="160" y="470" font-family="${SERIF}" font-size="88" fill="${C.parchment}">Installing Power BI <tspan font-style="italic" fill="${C.goldPale}">Desktop</tspan>.</text>
  <text x="160" y="560" font-family="${SANS}" font-size="32" fill="${C.parchment}" opacity="0.85">We download, install, and take the interface apart — together.</text>
  <text x="160" y="960" font-family="${SANS}" font-size="24" letter-spacing="5" fill="${C.goldPale}">LIFTING THE VEIL · INFORMATION TECHNOLOGY ACADEMY</text>
</svg>`;
}

// ---- screenshot slides ------------------------------------------------------
// Parchment frame, screenshot fitted, gold eyebrow, ink caption bottom.
async function screenshotSlide(file, eyebrowText, caption, n) {
  const imgPath = path.join(IMGS, file);
  const meta = await sharp(imgPath).metadata();
  const maxW = 1600, maxH = 640;
  const k = Math.min(maxW / meta.width, maxH / meta.height);
  const iw = Math.round(meta.width * k), ih = Math.round(meta.height * k);
  const ix = Math.round((W - iw) / 2), iy = 200 + Math.round((maxH - ih) / 2);
  const img = await sharp(imgPath).resize(iw, ih).png().toBuffer();

  const frame = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.parchment}"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${C.gold}"/>
  ${eyebrow(160, 120, eyebrowText)}
  <text x="${W - 160}" y="120" text-anchor="end" font-family="${SERIF}" font-size="44" fill="${C.crimson}">${n}</text>
  <rect x="${ix - 10}" y="${iy - 10}" width="${iw + 20}" height="${ih + 20}" fill="#ffffff" stroke="${C.ink}" stroke-opacity="0.18" stroke-width="1"/>
  <line x1="160" y1="930" x2="${W - 160}" y2="930" stroke="${C.ink}" stroke-opacity="0.15"/>
  <text x="160" y="985" font-family="${SERIF}" font-size="38" fill="${C.ink}">${esc(caption)}</text>
</svg>`;
  return sharp(Buffer.from(frame))
    .composite([{ input: img, left: ix, top: iy }])
    .png();
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const seal = await sharp(SEAL).resize(180, 180).png().toBuffer();

  // S1 title (with seal), S8 workflow, S9 outro (with seal)
  await sharp(Buffer.from(titleCard()))
    .composite([{ input: seal, left: W - 340, top: 250 }]).png()
    .toFile(path.join(OUT, "s1.png"));
  await sharp(Buffer.from(workflowCard())).png().toFile(path.join(OUT, "s8.png"));
  await sharp(Buffer.from(outroCard()))
    .composite([{ input: seal, left: W - 340, top: 250 }]).png()
    .toFile(path.join(OUT, "s9.png"));

  const shots = [
    ["s2", "overview-blocks.png", "One platform, three parts", "Build in Desktop. Publish to the service. Read it anywhere."],
    ["s3", "desktop-splash.png", "Power BI Desktop", "Free, fully featured, and where every report begins."],
    ["s4", "desktop-report-view.png", "The workspace", "Ribbon on top, canvas in the middle, three panes on the right."],
    ["s5", "viz-types.png", "Visuals, drag and drop", "Thirty-plus visuals in the box; hundreds more in the marketplace."],
    ["s6", "service-dashboard.png", "The Power BI service", "Where reports meet their audience — live, shared, secure."],
    ["s7", "service-content.png", "Three building blocks", "Semantic model → report → dashboard. Learn these three words."],
  ];
  for (const [id, file, eb, cap] of shots) {
    const s = await screenshotSlide(file, eb, cap, id.toUpperCase().replace("S", "0"));
    await s.toFile(path.join(OUT, id + ".png"));
  }
  console.log("SLIDES_DONE", fs.readdirSync(OUT).join(","));
})().catch((e) => { console.error(e); process.exit(1); });
