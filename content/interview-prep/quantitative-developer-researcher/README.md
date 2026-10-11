This directory exists only so `hasInterviewBank("quantitative-developer-researcher")` returns
true, which makes the "Practice interview questions" link render on this destination's career
page (see `components/careers/PathDetailRedesign.tsx`).

The Quantitative Developer / Researcher destination's real Interview Prep content is split into
3 separate role-specific banks instead of one combined bank:

- `../quant-researcher/` — Quantitative Researcher / Quant ML Researcher
- `../quant-developer/` — Quantitative Developer / Low-Latency HFT Engineer
- `../quant-analyst/` — Quantitative Analyst

The route `/app/interview-prep/quantitative-developer-researcher` is a dedicated static picker
page (`app/app/interview-prep/quantitative-developer-researcher/page.tsx`) that links to the 3
role sub-routes — it intentionally overrides the generic `[path]/page.tsx` route for this one
slug (Next.js prefers the static sibling route), so `loadInterviewBank` is never actually called
on this directory itself.
