---
name: LessonBuilder
description: Builds one complete Power BI course lesson for the LTV Academy site — real Microsoft Learn screenshots, a written guide, a quiz, an ElevenLabs-narrated video, uploaded to Cloudinary and wired into the course outline. Use this whenever the user asks to build, produce, create, or finish a lesson for the Power BI course (e.g. "build lesson 6", "do chapter 2 lesson 3", "make the next lesson"), asks what's needed to make a lesson, or wants to continue the course-build pipeline. Also use it if they ask about the lesson production process itself. Don't use it for edits to a lesson that already has a video (that's a manual edit, not a fresh build), and don't use it for the marketing site's imagery — that's Fal.ai's job, never this skill's.
---

# LessonBuilder

Produces one lesson end-to-end: research → screenshots → guide/quiz/script →
slides → video → Cloudinary → outline. This process is proven — it built
Lessons 1-5 successfully. Follow it as documented rather than improvising a
different approach; the gotchas below were each discovered the hard way.

**Canonical references, don't duplicate their content here:**
- `scripts/course-build/README.md` — the authoritative pipeline reference.
  If it and this skill ever disagree, the README wins; update this skill to
  match.
- `lib/powerbi-outline.ts` — the full 12-chapter, 93-lesson outline. Find the
  lesson's chapter number, slug, and title here before starting. If a chapter
  turns out to need more granular lessons than originally planned (this
  happened to Chapter 5, DAX Fundamentals — expanded from 8 to 15), renumber
  every subsequent `L(n, ...)` by the same offset in one pass (see git history
  for the sed-like Node script used) rather than leaving gaps or reusing
  numbers.
- `CLAUDE.md` (repo root) — overall site/course design. Don't re-derive it.
- Any existing `content/powerbi/chNN/*/` folder — the best style reference
  for guide.md/script.md tone and structure is always the most recently
  built lesson, not this document.

## Before starting: figure out scope

A full build is a lot of tool calls and spends real ElevenLabs credits on
narration. Ask (or infer from the user's phrasing) which phase they want:

- **Content only** — steps 1-6 below. Produces guide.md, quiz.json,
  script.md, and slides.json for review. No TTS calls yet, so nothing costs
  money. This is the right default if the user hasn't built this lesson
  before and might want to tweak the script's wording first.
- **Full build** — steps 1-11. Content + video + Cloudinary + outline wiring.
- **Full build + commit** — adds step 13. Only do this if the user asked to
  commit/push, or said so up front.

If content changes are needed *after* the video is already built, the video
has to be rebuilt from scratch (new TTS + remux) — so it's worth pausing
after step 6 to let the user glance at guide.md/script.md before spending
the ElevenLabs credits, unless they've explicitly asked for the full build.

## The steps

**1. Research.** WebSearch/WebFetch the topic on `learn.microsoft.com/en-us/power-bi/...`.
Confirm the article's `ms.date` or `updated_at` is current (Microsoft rewrites
these regularly — an old cached description of the UI will mislead the
lesson). Note every `media/<article>/<file>.png` path it references.

**2. Source the screenshots — real ones only, no exceptions.**
This is a hard content policy, not a style preference: the course is sold on
"actual Power BI screenshot images, nothing made up." Never generate, or
run through an image-to-image "cleanup" model, any image that ends up in a
lesson — not Fal.ai, not anything else. Fal.ai is used elsewhere in this
project for the public marketing pages (hero photos, chapter imagery) and
must stay scoped to that; it has no role in lesson content. If a real
screenshot you find is low-quality, keep searching for a better real source
rather than reaching for enhancement.

Download with curl from the exact URL
(`https://learn.microsoft.com/en-us/power-bi/<area>/media/<article>/<file>.png`)
into `content/powerbi/chNN/NN-slug/source-images/`. Verify each with `file`
and spot-check at least two or three with Read before trusting them — a
caption written against the wrong screenshot is worse than no screenshot.

**Sample data downloads — self-host them, don't link out.** If the lesson
has students practice on a Microsoft-provided dataset (a sample Excel
workbook, CSV, or `.pbix`), download it too and serve it from this site
instead of sending students to Microsoft's site to get it: save it under
`public/downloads/power-bi/<descriptive-name>.<ext>`, record the original
Microsoft URL in `sources.json` under a `downloads` key (see
`content/powerbi/ATTRIBUTION.md` for the reasoning), and link to the
self-hosted copy (`/downloads/power-bi/<file>`) in `guide.md` — never the
Microsoft URL. The rule for every lesson, not just this one: don't send a
student to an outside site for something the course can just hand them
directly. A link to Microsoft's own product pages (the Power BI Desktop
download/install page, for instance) is the kind of exception where leaving
the site is genuinely unavoidable — installing the actual product has to
happen on Microsoft's site. Everything else, prefer hosting it here.

You don't need to hand-write `target="_blank"` on any link — `lib/courses.ts`
already rewrites every absolute `http(s)` link in a rendered guide to open in
a new tab automatically, so a student never loses their place in the lesson.
Just write normal markdown links; a same-origin `/downloads/...` link doesn't
get (or need) that treatment since it triggers a file download rather than a
navigation. All links in a guide render underlined and colored so they're
never mistaken for plain text (students missed this before it was styled),
and `/downloads/...` links additionally render bold to stand out as the
thing they need to grab before doing the lab — also automatic, from the same
renderer in `lib/courses.ts` plus `.book-page a` / `.book-page a.download-link`
in `app/globals.css`. Nothing to do per-lesson here either; just use the
`/downloads/power-bi/...` path convention and the styling follows.

**Labs, from Chapter 4 onward: use real SQL Server databases, not invented
data.** Students already have SSMS access to `AdventureWorks2012`,
`AdventureWorksDW2014`, and `Northwind` on their own SQL Server instance,
and have been writing T-SQL against them in a parallel course. Write each
lesson's Lab section against these — connect via the SQL Server connector
(Chapter 2, Lesson 9) and name specific real tables/columns, not a
hypothetical "your table" placeholder. Rough guide to which fits which
topic: `AdventureWorksDW2014` (already a real star schema — `Fact*`/`Dim*`
tables) for anything about fact/dimension tables, relationships, star
schema, or DAX measures; `AdventureWorks2012` (normalized OLTP) for
calculated-column/row-context examples and for demonstrating the
"no-relationship" problem before it's fixed; `Northwind` when a small,
simple schema teaches the point more clearly than AdventureWorks' scale.
`FactInternetSales`'s three `Dim*Date` keys (Order/Due/Ship) are the
textbook real-world example for active/inactive relationships and
`USERELATIONSHIP` — use them there specifically.

**3. Write the content**, in `content/powerbi/chNN/NN-slug/`:
- `sources.json` — every image's exact source URL, a `research` array of the
  doc URLs used, and a `verified` date.
- `guide.md` — match the house style of the most recent existing lesson:
  "What you'll learn" bullets, sections with real screenshots embedded at
  the point in the text they illustrate (each followed by a one-line italic
  caption), a "Key terms" table, a "Lab," a "Check yourself" closer.
- `quiz.json` — 5 questions, each `{q, options[4], answer (index), explain}`.
  The site already shows `explain` in crimson/bold next to the correct
  answer when a student grades a wrong pick (`components/app/Quiz.tsx`) —
  nothing extra to do per-lesson for that.
- `script.md` — voiceover, segments numbered to match the slides you'll
  define next, ~3-4 minutes of narration total, same warm-direct teaching
  voice as existing lessons (read one to calibrate tone before writing).

**4. Write `slides.json`** in the lesson folder: one `title` slide, a
`screenshot` slide per embedded image, optionally a `steps` diagram, one
`outro` slide teasing the next lesson. Exact field shapes are documented in
the header comment of `scripts/course-build/gen-slides.js` — read it rather
than guessing the schema.

**No real screenshot for this slide? Use a `code` slide, don't fake one.**
Some topics (most of DAX) have no Power BI UI to screenshot — the content
*is* a formula. For those, use `{ "type": "code", "eyebrow", "code"
(\n-separated lines), "caption" }`, a brand-styled formula card (same
category as `steps` — an original LTV-authored graphic, never a claimed
screenshot). It auto-highlights known DAX keywords/functions in crimson and
auto-shrinks font size to fit long lines; multi-line code with leading
indentation renders correctly (the generator handles the `xml:space`
whitespace-collapsing gotcha for you). Never invent a fake Power BI
screenshot for a DAX-only lesson — a `code` card is the honest alternative.

**5. Copy the guide images:**
```
node scripts/course-build/copy-guide-images.js <ABSOLUTE lesson dir> <contentDir>
```
This copies whichever screenshots `slides.json` references into
`public/courses/power-bi/<contentDir>/` — the only images that need to be
web-servable. `<contentDir>` looks like `ch02/06-data-sources`.

**6. Write `segments.json`** in the lesson folder — narration text 1:1 with
`slides.json`'s slide order, matching `script.md` word-for-word (they're the
same script; segments.json is just the TTS-consumable form).

Stop here if this is a content-only pass. Otherwise, continue:

**7. Generate the slide images:**
```
node scripts/course-build/gen-slides.js <ABSOLUTE lesson dir> <ABSOLUTE path to public/brand/ltv-logo-still.png>
```
Read 2-3 of the output PNGs to confirm they look right before moving on —
a broken caption or missing image is cheap to catch here and expensive to
catch after the video is built.

**8. Build the video:**
```
node scripts/course-build/build-lesson.js <ABSOLUTE lesson dir>
```
Needs `ELEVENLABS_API_KEY` and `LTV_VOICE_ID` in the environment (source
`.env.local`); `FFMPEG_PATH` too if the default winget path isn't right for
this machine.

**The lesson dir argument must be absolute.** A relative path makes the
final ffmpeg concat step double-join the chunk paths and fail with
`Impossible to open '...chunks\content/.../chunks/s1.mp4'`. If you see that
error, just rerun with an absolute path — the per-segment TTS mp3s and mux'd
chunks are already cached on disk (the script skips TTS for files that
already exist), so nothing is wasted except a few seconds of local muxing.

**9. Verify the video** with ffprobe (valid h264/aac streams, sane duration)
before uploading — catching a broken build here is much cheaper than after
it's live on Cloudinary and wired into the outline.

**10. Upload:**
```
node scripts/course-build/upload-to-cloudinary.js <path to lesson.mp4> ltv-powerbi/<contentDir-with-dashes>
```
Needs `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
in the environment.

**11. Wire it into the outline** — add `contentDir`, `videoUrl` (the
`secure_url` the upload returned), and `durationLabel` to this lesson's
entry in `lib/powerbi-outline.ts`.

**12. Verify in the browser.** Start the dev server (Browser tool
`preview_start`) using a launch config that actually `cd`s into the
`ltv-academy` folder — e.g.
`cmd /c "cd /d <path>\ltv-academy && set PATH=...\nodejs;%PATH% && npm run dev"`.
Do **not** invoke `next`'s bin script directly with a directory argument:
`lib/courses.ts` loads lesson content via `process.cwd()`, and if the
spawned process's actual working directory isn't the `ltv-academy` folder,
every lesson silently renders with no guide, quiz, or video — and no
console error to tip you off. Navigate to `/app/courses/power-bi/<slug>`.

The Browser pane can be backgrounded by the harness, and a screenshot of a
hidden pane renders blank even when the page is perfectly fine — don't
mistake that for a bug. Prefer a `javascript_tool` DOM check (each image's
`.complete`/`.naturalWidth`, the video element's `.src`) and a
`read_network_requests` check for 200s on the asset URLs; only trust a
screenshot if you've confirmed the pane is actually visible. Separately,
this site uses `scroll-behavior: smooth`, so `scrollIntoView`/`window.scrollTo`
calls appear to no-op if you read the position back immediately — pass
`{behavior: "instant"}`, or wait, before checking.

**13. Commit and push** — only if asked. Stage the new lesson folder, the
new `public/courses/power-bi/<contentDir>/` images, and the
`lib/powerbi-outline.ts` change; write a commit message describing what the
lesson covers and which real screenshots/sources it used; push to `origin
main`.
