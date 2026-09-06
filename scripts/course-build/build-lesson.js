/*
 * Lesson assembler — RRC-style measured-audio sync, tightened per-segment:
 * 1. TTS each segment  2. ffprobe the REAL duration  3. each slide runs
 * exactly its narration length + PAUSE  4. mux each slide+audio as its own
 * chunk (apad so streams end together)  5. concat chunks.
 * Sync is structural: slide N's first frame == its narration's first sample.
 */
const { execFileSync } = require("child_process");
const https = require("https");
const fs = require("fs");
const path = require("path");

const FFMPEG = "C:\\Users\\willi\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0-full_build\\bin\\ffmpeg.exe";
const FFPROBE = FFMPEG.replace("ffmpeg.exe", "ffprobe.exe");
const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.LTV_VOICE_ID;
const LESSON = process.argv[2];
const PAUSE = 0.7; // breathing gap after each narration segment

const segs = JSON.parse(fs.readFileSync(path.join(__dirname, "segments.json"), "utf8"));
const AUD = path.join(LESSON, "audio");
const CHUNKS = path.join(LESSON, "chunks");
fs.mkdirSync(AUD, { recursive: true });
fs.mkdirSync(CHUNKS, { recursive: true });

function tts(text, out) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`,
      { method: "POST", headers: { "xi-api-key": KEY, "Content-Type": "application/json" } },
      (res) => {
        if (res.statusCode !== 200) { let d = ""; res.on("data", c => d += c); res.on("end", () => reject(new Error("TTS " + res.statusCode + ": " + d.slice(0, 200)))); return; }
        const ws = fs.createWriteStream(out);
        res.pipe(ws); ws.on("finish", resolve); ws.on("error", reject);
      });
    req.on("error", reject);
    req.write(JSON.stringify({ text, model_id: "eleven_v3" }));
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
    }
    const vo = probe(mp3);
    const dur = vo + PAUSE; // slide runs exactly its narration + pause
    total += dur;
    console.log(`${slide}: narration ${vo.toFixed(2)}s -> slide ${dur.toFixed(2)}s`);
    const chunk = path.join(CHUNKS, slide + ".mp4");
    // apad pads narration to fill the pause so a/v streams end together (RRC technique)
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
  const out = path.join(LESSON, "lesson.mp4");
  execFileSync(FFMPEG, ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", "-movflags", "+faststart", out]);
  console.log("DONE total " + total.toFixed(1) + "s -> " + out + " (" + Math.round(fs.statSync(out).size / 1024) + " KB)");
})().catch((e) => { console.error(e.message); process.exit(1); });
