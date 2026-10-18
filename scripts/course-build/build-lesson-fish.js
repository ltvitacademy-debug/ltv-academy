/*
 * Fish Audio variant of build-lesson.js — same RRC-style measured-audio sync,
 * swapping the TTS provider. Requires FISH_API_KEY and FISH_REFERENCE_ID env vars.
 * Usage: node build-lesson-fish.js <abs lesson dir>
 */
const { execFileSync } = require("child_process");
const https = require("https");
const fs = require("fs");
const path = require("path");

const FFMPEG = process.env.FFMPEG_PATH || "C:\\Users\\subze\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-full_build\\bin\\ffmpeg.exe";
const FFPROBE = FFMPEG.replace("ffmpeg.exe", "ffprobe.exe");
const KEY = process.env.FISH_API_KEY;
const REFERENCE_ID = process.env.FISH_REFERENCE_ID;
const LESSON = process.argv[2];
const PAUSE = 0.7;

if (!KEY || !REFERENCE_ID) {
  console.error("Set FISH_API_KEY and FISH_REFERENCE_ID env vars first.");
  process.exit(1);
}

const segs = JSON.parse(fs.readFileSync(path.join(LESSON, "segments.json"), "utf8"));
const AUD = path.join(LESSON, "audio-fish");
const CHUNKS = path.join(LESSON, "chunks-fish");
fs.mkdirSync(AUD, { recursive: true });
fs.mkdirSync(CHUNKS, { recursive: true });

function tts(text, out) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      "https://api.fish.audio/v1/tts",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${KEY}`,
          "Content-Type": "application/json",
          "model": "s2-pro",
        },
      },
      (res) => {
        if (res.statusCode !== 200) { let d = ""; res.on("data", c => d += c); res.on("end", () => reject(new Error("TTS " + res.statusCode + ": " + d.slice(0, 300)))); return; }
        const ws = fs.createWriteStream(out);
        res.pipe(ws); ws.on("finish", resolve); ws.on("error", reject);
      });
    req.on("error", reject);
    req.write(JSON.stringify({ text, reference_id: REFERENCE_ID, format: "mp3" }));
    req.end();
  });
}

const probe = (f) => parseFloat(execFileSync(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());

(async () => {
  const list = [];
  let total = 0;
  for (const { slide, text } of segs) {
    const mp3 = path.join(AUD, slide + ".mp3");
    if (!fs.existsSync(mp3)) {
      process.stdout.write("tts " + slide + "... ");
      await tts(text, mp3);
      console.log("done");
    }
    const vo = probe(mp3);
    const dur = vo + PAUSE;
    total += dur;
    console.log(`${slide}: narration ${vo.toFixed(2)}s -> slide ${dur.toFixed(2)}s`);
    const chunk = path.join(CHUNKS, slide + ".mp4");
    execFileSync(FFMPEG, ["-v", "error", "-y",
      "-loop", "1", "-t", dur.toFixed(3), "-i", path.join(LESSON, "slides", slide + ".png"),
      "-i", mp3,
      "-af", "apad", "-shortest",
      "-vf", "scale=1920:1080,setsar=1,fps=30,format=yuv420p",
      "-c:v", "libx264", "-preset", "medium", "-crf", "22",
      "-c:a", "aac", "-b:a", "160k",
      "-movflags", "+faststart", chunk]);
    list.push("file '" + chunk.replace(/\\/g, "/") + "'");
  }
  const listFile = path.join(CHUNKS, "list.txt");
  fs.writeFileSync(listFile, list.join("\n") + "\n");
  const out = path.join(LESSON, "lesson-fish.mp4");
  execFileSync(FFMPEG, ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", "-movflags", "+faststart", out]);
  console.log("DONE total " + total.toFixed(1) + "s -> " + out + " (" + Math.round(fs.statSync(out).size / 1024) + " KB)");
})().catch((e) => { console.error(e.message); process.exit(1); });
