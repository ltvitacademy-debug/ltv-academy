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
- [x] **Bill's portrait** — resolved 2026-09-02: cropped the hero photo (DSC08163, confirmed
  as Bill) to a 3:4 head-and-shoulders portrait for the Instructor section. (Policy note: we
  deliberately did not AI-generate a portrait of a real person.)
- 2026-09-02 — Chapter photos 1/3/4/5 generated with fal.ai flux/dev at 1440px (warm editorial
  prompts, no readable text); Bill approved using AI imagery for scene photos. Seal now loops
  continuously per Bill (overrides the original play-once spec). Header nav label is "Tracks".
- [x] **DSC08163** — is a portrait of Bill outside a storefront (not a classroom shot). It
  serves the hero and (cropped) the Instructor portrait; "The Class" chapter uses a fal.ai
  generated classroom image.
- [ ] **Seal vs. copy founding year** — the seal artwork reads "Founded in MMXVIII" (2018) but
  all site copy (and the spec) says Est. 2017. Ask Bill which is right.

## Professional Mock Interview — Postgres migration process (Phase D)

Production uses `prisma/schema.production.prisma` (generated, datasource = postgresql) while
local dev keeps using `prisma/schema.prisma` (sqlite) with plain `prisma db push` — that's fine
for throwaway local data with no migration history. Production must NEVER use `db push`: it
diffs and applies schema changes on the fly with no reviewable history and no safety rails
against an accidental destructive change landing in the middle of a deploy.

**One-time setup** (before the first production deploy, once a real Postgres `DATABASE_URL` exists):
1. `npm run prisma:migrate:new` — pointed at a real (ideally staging, not live) Postgres
   instance. This generates the first migration's SQL under `prisma/migrations/` and applies it
   to whatever `DATABASE_URL` is active when you run it. **Review the generated SQL before
   committing it** — this is the whole point of migrations over `db push`: a human reads the
   diff before it ever touches real data.
2. Commit the resulting `prisma/migrations/<timestamp>_init/migration.sql`.

**Every production build after that**: `npm run prisma:migrate:deploy` — applies only
already-committed, already-reviewed migrations in order; never generates new ones, never guesses,
never drops/recreates a column on its own interpretation of "what changed." This is the command
that belongs in the production build pipeline, not `db push`.

**Every future schema change**: edit `prisma/schema.prisma` (the dev/sqlite source of truth) →
run `npm run prisma:migrate:new` again (regenerates the production schema, then generates a NEW
migration against it) → review the generated SQL → commit it → it ships on the next
`prisma:migrate:deploy` run.
