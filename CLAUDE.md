# LTV Academy — Lifting the Veil Information Technology Academy

Rebuild of https://www.ltvacademy.com/ (IT training bootcamp, founded by Bill Green, 2017).
Goal: a site that looks like it cost $10,000, plus a paywalled member portal with nine complete courses.
Client: Bill Green. Phone: 678-627-2796. Live domain (current): www.ltvacademy.com.
Only original asset on disk: `LiftingTheVielAnimatedLogo.mp4` (544x544, 6s, black bg, has audio) — the animated brand seal.

## CONTENT SOURCE

Fetch https://www.ltvacademy.com/ and reuse its real copy: the About story, the nine tracks with
their bullet points, the 11 FAQs, the testimonials (Anthony, Ian, Lauren, Okey, Johnny), the
Booker T. Washington quotes, phone 678-627-2796, and the classroom photo (DSC08163.JPG).
Pricing: $297/month, plus 6-month and annual packages (annual is roughly $192/mo). 48-hour refund
window, cancel with 2 weeks notice, no job guarantee, all sessions recorded, technical interview
before certificate of completion. **Do not invent testimonials or stats.**

## DESIGN DIRECTION (non-negotiable)

Study these three sites and match their language — editorial, photographic, serif, warm.
NOT a dark SaaS or generic LMS look:

- https://the-montgomery-ledger.netlify.app/ — full-bleed photo scroll "chapters": one image, small eyebrow, one serif headline, one sentence
- https://tara-green-realtor.netlify.app/ — numbered "five things" sequence, portrait with stat blocks, one italic emphasis word in headlines
- https://rulesforradicalchristians.com/ — 01–07 numbered grid, serif pull-quotes, section eyebrows

### Tokens

- parchment `#F4EFE4` (page), ink `#1E1A16` (text), crimson `#8E1C1C` (primary buttons, numerals),
  crimson-deep `#5E0F0F` (header bar, dark panels), gold `#C4952E` (eyebrows, rings, Enroll button),
  gold-pale `#F1DFB4` (italic emphasis on dark), stone `#6B6259` (secondary text)
- Type: **Fraunces** (Google Fonts) for all display/headlines, weight 400, one italic emphasis word;
  **Inter** for body and UI. Buttons: 2px radius, never pills.
- Every section opens with a letterspaced uppercase eyebrow in gold.

### Header

Sticky deep-crimson bar with a 1px gold bottom border. Left: the animated seal, then wordmark
"Lifting the Veil" in Fraunces with "Information Technology Academy · Est. 2017" beneath in
gold-pale. Right: nav (The nine tracks, Schedule, Pricing, Bill Green, Member login) and a gold
"Enroll" button. Mobile: hamburger, 44px seal.

### Animated seal (the MP4)

Process with ffmpeg into `public/brand/`:
- muted 320px header version
- muted full-size hero version
- last frame exported as circular PNG with transparent corners (`ltv-logo-still.png`) + 512px icon + favicon

Header renders it as `<video autoplay muted playsinline poster="/brand/ltv-logo-still.png">` with
no loop and no controls, clipped to a circle (border-radius 50%, overflow hidden) with a 2px gold
ring so the black corners never show; play once on load, hold the last frame. Respect
prefers-reduced-motion by showing the still instead. Use the still as the OG image.

### Hero

Full-bleed classroom photo with a dark gradient toward the bottom, eyebrow "Live classes ·
Nightly and Saturday mornings", headline "Learn the work. Get the job." (*job* italic in
gold-pale), one-sentence lede, crimson button "See the nine tracks", underlined text link
"Book a free consultation", Booker T. quote small in the bottom-right.

### Homepage order

hero → five scroll chapters (Chapter One The Veil: "Nobody told you what these jobs pay." /
The Work / The Class / The Interview / The Job) → nine tracks as a 01–09 numbered list with one
honest sentence each → testimonials as full-width serif pull-quotes with name and track →
"Who you'd be learning from": Bill's portrait with stat blocks (2017, thousands of students,
database developer) → live schedule → pricing (3 tiers, all-access) → FAQ accordion → final CTA.
Use clearly marked placeholder plates where photos are still needed.

Member portal and course player use the same parchment/serif skin: video at top, lesson guide set
like a book page beneath. It must not look like Teachable.

## DEPLOYMENT ARCHITECTURE

- **GitHub repo**: https://github.com/wagreen3629/ltv-academy (private) — origin `main`.
  Push via HTTPS; Git Credential Manager on this machine already holds working credentials.
- **Netlify site**: `ltv-academy` — https://ltv-academy.netlify.app
  - Project ID: `62272593-888b-49d5-b85e-e7d3031209fd`
  - Team: `wagreen3629` (account ID `67d594287a0d631cb98eab5d`)
  - Admin: https://app.netlify.com/projects/ltv-academy
- **Deploy flow**: connect the GitHub repo to the Netlify site for auto-deploy on push to
  `main` (the MCP connector cannot link a repo — one-time link happens in the Netlify UI:
  Project → Configuration → Build & deploy → Link repository). Until linked, deploy via the
  Netlify MCP `deploy-site` token flow per the netlify-deploy skill.
- Supabase/Stripe/Mux/Resend secrets go in Netlify env vars (manage-env-vars via MCP), never
  in the repo. `.env.example` documents the keys.
- Custom domain (www.ltvacademy.com) comes later — attach in Netlify UI first, then flip DNS.
  Order: deploy → attach domain → DNS.

## STACK

Next.js App Router + TypeScript + Tailwind, deployed to Netlify. Supabase (auth, Postgres,
storage) with RLS. Stripe subscriptions (Monthly $297; 6-Month and Annual as env-driven prices).
Mux for video. Resend for transactional email. Course content lives in the database, not the code.

## ROUTES

Public: `/`, `/courses`, `/courses/[slug]` (outcomes, syllabus accordion, free preview lesson,
enroll), `/pricing`, `/about`, `/schedule`, `/faq`, `/contact` (form → Resend; consult booking
link), `/login`, `/signup`.

Member (`/app`, paywalled): dashboard (continue where you left off, next live session),
`/app/courses/[slug]` (module/lesson tree + progress), `/app/courses/[slug]/[lesson]` (video,
guide, lab download, quiz, notes, mark complete), `/app/archive` (recorded sessions),
`/app/account` (Stripe customer portal).

Admin (`/admin`, Bill only): CRUD courses, modules, lessons; upload video to Mux; view students
and progress.

## PAYWALL

Lesson 1 of every track is free to the public. Everything else requires a subscription with status
`active` or `trialing` (any tier — tiers differ only by billing period). Stripe webhook writes to a
`subscriptions` table; middleware checks it on every `/app/*` route.

## DATA MODEL

- `profiles(id, full_name, avatar_url, role student|admin)`
- `courses(id, slug, title, tagline, description, level, hours, cover_url, is_published, sort)`
- `modules(id, course_id, title, sort)`
- `lessons(id, module_id, title, slug, sort, video_asset_id, duration_sec, guide_md, lab_url, is_free_preview, recording_status has_video|needs_video)`
- `quizzes(id, lesson_id, questions jsonb)`
- `lesson_progress(user_id, lesson_id, completed_at, seconds_watched, quiz_score)`
- `live_sessions(id, course_id, starts_at, zoom_url, recording_asset_id)`
- `subscriptions(user_id, stripe_customer_id, stripe_sub_id, plan, status, current_period_end)`

## THE NINE TRACKS (build all nine)

Each: 6–8 modules, 35–50 lessons; every lesson = video slot + written guide (Markdown) + lab +
5-question quiz; every lesson starts as `needs_video`.

1. **SQL Server Database Development and BI** (flagship): T-SQL → advanced queries → database design → SSIS → SSRS → warehousing/dimensional modeling → visualization → capstone + mock interview
2. **Oracle Financial Applications**: EBS architecture → GL → AP → AR → subledger accounting → period close → reporting → cert prep
3. **Salesforce Administration**: platform → objects/fields → security → Flow automation → reports/dashboards → data management → Admin cert prep
4. **Salesforce Solutions Architect**: architecture principles → data modeling at scale → integration patterns → security architecture → governance → CTA-style review boards
5. **Data Science**: statistics → Python/R → cleaning/feature engineering → supervised ML → unsupervised ML → visualization → portfolio
6. **Data Engineering**: architecture → modeling → pipelines → Hadoop/Spark/Kafka → AWS/GCP → warehouse optimization
7. **Data Analytics**: descriptive/diagnostic → EDA → hypothesis testing → forecasting → visualization → business cases
8. **DevOps Engineering**: principles → Docker → Kubernetes → CI/CD → Ansible/Puppet → monitoring/logging
9. **Blockchain Development**: fundamentals → Ethereum → Solidity → DApps → consensus/security → non-crypto use cases

Bill has recordings and slides for these. Create `/content/intake/<track>/` folders and a script
that maps his files to lessons by filename and slide titles, then exports a needs_video gap list.

## BUILD ORDER (commit after each step; STOP for review where marked)

1. Scaffold app, tokens, process the logo with ffmpeg, Header/Footer.
2. Full public homepage. Run locally, give the URL. **STOP.**
3. Supabase schema + RLS, Stripe products + webhook, auth pages, paywall middleware.
4. Member portal and lesson player. **STOP.**
5. `/admin` CMS.
6. Nine syllabi as seed JSON in `/content/syllabi` with guides, labs, quizzes; intake mapping script.
7. Netlify config, `.env.example`, README with deploy steps.

Keep `NOTES.md` with decisions and open questions. Ask before choosing anything not specified here.

## DONE MEANS

- Lighthouse 90+ mobile on public pages.
- A visitor can watch a free lesson, subscribe, and land in the player in under 2 minutes.
- Bill can add a lesson with video from `/admin` without a deploy.
- Every lesson in all nine tracks exists with at least a guide and quiz, and the needs_video list is exported.
