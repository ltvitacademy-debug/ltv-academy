# Course video build pipeline

Produces one lesson video from slides + per-segment ElevenLabs narration.
Proven on Power BI Lesson 1 (see `content/powerbi/ch01/01-what-is-power-bi/`).

## Prerequisites

- Node 18+ (`npm install sharp` in this folder before first run)
- ffmpeg/ffprobe on disk — set the `FFMPEG` path at the top of both scripts
  (currently the winget Gyan build path on the original machine)
- `ELEVENLABS_API_KEY` env var, and `LTV_VOICE_ID` (the "Bill Green" cloned
  voice lives on Bill's ElevenLabs account: `XGWwpWvcCCZaFwBliPC2`)

## The flow per lesson

1. Research the topic; write `guide.md`, `quiz.json`, `script.md`, and
   `sources.json` in the lesson folder (`content/powerbi/chNN/NN-slug/`).
2. Download real Microsoft Learn screenshots into `source-images/`.
   The docs GitHub repos are private now and the live pages are JS-rendered;
   get media filenames from a 2024 Wayback snapshot of the article, then
   download the current file from
   `https://learn.microsoft.com/en-us/power-bi/<area>/media/<article>/<file>.png`.
   Record every URL in `sources.json` (see `content/powerbi/ATTRIBUTION.md`).
3. Edit `gen-slides.js` slide config; run:
   `node gen-slides.js <abs lesson dir> <abs path to public/brand/ltv-logo-still.png>`
   → writes `slides/s1..sN.png` (1920x1080, LTV brand).
4. Put the narration segments (1:1 with slides) in `segments.json`; run:
   `node build-lesson.js <abs lesson dir>`
   → TTS each segment, measures real duration with ffprobe, muxes each
   slide+audio chunk (apad), concats to `lesson.mp4`. Sync is structural —
   a slide's first frame IS its narration's first sample.
5. Upload `lesson.mp4` to Cloudinary (folder `ltv-powerbi/`), then add the
   `videoUrl`, `contentDir`, and `durationLabel` to `lib/powerbi-outline.ts`.

Videos/audio are git-ignored; Cloudinary is the distribution copy.
