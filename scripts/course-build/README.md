# Course video build pipeline

Produces one lesson video from slides + per-segment ElevenLabs narration.
Proven on Power BI Lessons 1 and 2 (see `content/powerbi/ch01/`).

## Prerequisites

- Node 18+ (`npm install sharp` in this folder before first run)
- ffmpeg/ffprobe on disk — `build-lesson.js` reads the path from the `FFMPEG_PATH`
  env var, falling back to the winget Gyan build path on this machine
- `ELEVENLABS_API_KEY` env var, and `LTV_VOICE_ID` (currently `XGWwpWvcCCZaFwBliPC2`,
  "Bill Narrator For Book" — a placeholder/testing voice on Bill's ElevenLabs
  account. Bill is recording his own cloned voice separately; swap `LTV_VOICE_ID`
  when he provides it.)

## The flow per lesson

1. Research the topic; write `guide.md`, `quiz.json`, `script.md`, and
   `sources.json` in the lesson folder (`content/powerbi/chNN/NN-slug/`).
2. Download real Microsoft Learn screenshots into `source-images/`.
   The docs GitHub repos are private now and the live pages are JS-rendered;
   get media filenames from a 2024 Wayback snapshot of the article, then
   download the current file from
   `https://learn.microsoft.com/en-us/power-bi/<area>/media/<article>/<file>.png`.
   Record every URL in `sources.json` (see `content/powerbi/ATTRIBUTION.md`).
3. Write `slides.json` in the lesson folder — an ordered list of slide specs
   (`title`, `screenshot`, `steps`, or `outro`; see the header comment in
   `gen-slides.js` for each shape). Run:
   `node gen-slides.js <abs lesson dir> <abs path to public/brand/ltv-logo-still.png>`
   → writes `slides/s1..sN.png` (1920x1080, LTV brand). The renderer itself is
   generic and shared across lessons — only `slides.json` changes per lesson.
4. Embed the pertinent screenshots in `guide.md` too, not just the video, so the
   written guide stands on its own. Run:
   `node copy-guide-images.js <abs lesson dir> <contentDir, e.g. ch01/02-slug>`
   → copies every screenshot referenced in `slides.json` into
   `public/courses/power-bi/<contentDir>/` (the only images that need to be
   web-servable — everything else stays under `content/`, which the app never
   serves directly). Then reference them in `guide.md` at the matching point in
   the text: `![alt text](/courses/power-bi/<contentDir>/<file>.png)` followed
   by an italic one-line caption.
5. Put the narration segments (1:1 with slides) in `segments.json` **inside the
   lesson folder** (next to `guide.md`); run:
   `node build-lesson.js <abs lesson dir>`
   → TTS each segment, measures real duration with ffprobe, muxes each
   slide+audio chunk (apad), concats to `lesson.mp4`. Sync is structural —
   a slide's first frame IS its narration's first sample.
6. Upload `lesson.mp4` to Cloudinary (folder `ltv-powerbi/`), then add the
   `videoUrl`, `contentDir`, and `durationLabel` to `lib/powerbi-outline.ts`.

Videos/audio are git-ignored; Cloudinary is the distribution copy.
