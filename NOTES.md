# NOTES — decisions and open questions

## Decisions

- 2026-09-02 — GitHub repo created **private** (`wagreen3629/ltv-academy`) since it will hold
  paid course scaffolding; matches oracle-guides precedent.
- 2026-09-02 — Netlify site `ltv-academy` created via MCP connector before any build, per
  Bill's instruction, so database/member-area env vars and deploys have a home from day one.

- 2026-09-02 — Real copy scraped from live Wix site into `.firecrawl/home.txt` (git-ignored);
  structured into `lib/copy.ts`. Classroom photo (DSC08163) downloaded full-res from Wix CDN →
  `public/photos/classroom.jpg`. A stock laptop/code photo from the live site reused as the
  "The Work" chapter plate.
- 2026-09-02 — Testimonials on the source site do not state which track each graduate took,
  so pull-quotes are attributed "name, graduate" only (spec asked for name + track; not
  inventing tracks per the no-invention rule).
- 2026-09-02 — Booker T. quote 1 in hero, quote 2 opens the final CTA panel.
- 2026-09-02 — FAQ accordion uses native `<details>` (no JS); mobile nav is the only client
  component besides nothing else on the page.

## Open questions

- [x] **Netlify ↔ GitHub link** — Bill linked the repo in the Netlify UI 2026-09-02;
  auto-deploy on push to `main` is live.
- [ ] Custom domain cutover (www.ltvacademy.com) — timing TBD; current site is live on Wix.
- [ ] **6-Month tier price is nowhere on the source site** — pricing card shows
  "Call for current rate" until Bill supplies the number. Needed before Stripe products (step 3).
- [x] **Bill's portrait** — resolved 2026-09-02: cropped the hero photo (DSC08163, confirmed as Bill) to a 3:4 head-and-shoulders portrait for the Instructor section.
  marked photo plate. Need a real portrait from Bill (deliberately NOT AI-generating a fake
  portrait of a real person).
- 2026-09-02 — Chapter photos 1/3/4/5 generated with fal.ai flux/dev at 1440px (warm editorial
  prompts, no readable text); Bill approved using AI imagery for scene photos. Seal now loops
  continuously per Bill (overrides the original play-once spec). Header nav label is "Tracks".
- [ ] **DSC08163 is not a classroom photo** — the Wix site's DSC08163.JPG is a portrait of a
  man (Bill?) in front of a storefront. Used in the hero (aspirational, real site asset), but
  "The Class" chapter renders a marked plate instead. Need a real classroom photo from Bill —
  and confirm whether DSC08163 is actually Bill (if so it can also serve the portrait section).
- [ ] **Seal vs. copy founding year** — the seal artwork reads "Founded in MMXVIII" (2018) but
  all site copy (and the spec) says Est. 2017. Ask Bill which is right.
