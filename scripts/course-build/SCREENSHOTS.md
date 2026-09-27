# Screenshot policy — applies to every course, not just Power BI

`gen-slides.js` is shared, generic infrastructure: every course in the
catalog (Power BI, SSIS, SSRS, T-SQL, Snowflake, Databricks, Tableau,
Salesforce, Oracle Fusion, Azure/AWS/GCP-flavored courses, PowerShell, Git,
DevOps, and everything built after this doc exists) renders its lesson
slides through it. This policy is not Power-BI-specific and isn't scoped to
any one skill — it applies whenever a lesson is being built or rebuilt for
any course, regardless of which agent, skill, or prompt is doing the work.

## Real screenshots only — no exceptions

Every screenshot that ends up in a lesson has to be a real, unaltered
capture of the actual product UI, sourced from official
documentation/quickstarts, the vendor's own site, or (where the pipeline
supports it) a live run against the real product. Never generate an image
of software UI, and never run a real screenshot through an image-to-image
"cleanup" or enhancement model — not Fal.ai, not anything else. Fal.ai stays
scoped to the public marketing site's own imagery (hero photos, chapter
art); it has no role in lesson content, in any course. If a real screenshot
you find is low-quality, keep searching for a better real source rather
than reaching for enhancement.

Verify every downloaded image is actually an image before trusting it
(`curl -sI` for `Content-Type: image/png|jpeg`, not `text/html` — some
sites 200 an HTML page for a bad path) and view at least a couple with the
Read tool before writing captions against them, so a caption never gets
written against the wrong screenshot. Record every source URL, plus a
`research` array of the docs/pages used and a `verified` date, in the
lesson's `sources.json` — this is the paper trail if a fact needs
rechecking later.

## Minimum of 3 real screenshots per lesson — for any lesson with UI to show

One screenshot tells a student a screen exists. Three lets you walk them
through it: the setup, the moment something changes, and the result. Treat
3 as the floor, not the ceiling, for any lesson whose topic is a real
product screen, dialog, console, or workflow — which is most lessons in
most courses (SSIS/SSRS designer screens, Power BI, Snowsight, Databricks
notebooks, Tableau, Salesforce Lightning, Oracle Fusion Cloud, Azure/AWS/GCP
consoles, PowerShell/Cloud Shell, Purview, Fabric, and so on).

**The exception, not the rule:** lessons that are genuinely non-visual —
pure SQL/query syntax, Python/statistics/math, architecture theory,
interview prep, career advice — don't have real UI to screenshot, and
padding them with an unrelated or repeated image just to hit the number is
worse than having none. For those, stay on the existing fallback: a `code`
slide (an honest, brand-styled formula/snippet card, never a claimed
screenshot), or a chart the lesson's own code actually produced and shows,
captioned "output of the code above." See `gen-slides.js`'s header comment
for the `code` slide shape.

If a first search only turns up one relevant image, that's a signal to
keep looking — a companion page, an adjacent step in the same doc, the
feature's own reference page, or (for several courses now confirmed to
work this way) a vendor quickstart/tutorial site rather than the bare docs
reference page. Product docs are usually screenshot-dense once you look at
the whole flow, not just the first article that comes up. Some sites now
block plain `curl` on the HTML page itself (Cloudflare, etc.) while leaving
the image assets on their CDN unblocked — if `curl` on the doc page comes
back empty or blocked, open it in the browser tool instead and pull image
URLs from the rendered DOM; the images themselves are usually still
fetchable directly with `curl` afterward.

## Point at what matters — use `annotations`

A `screenshot` slide's `annotations` field (documented in `gen-slides.js`'s
header comment) draws a box, circle, or arrow with a short label directly
on top of the screenshot — composited over the image at render time, never
editing the underlying file — to call out the one button, field, or result
the student should actually look at. Use it on at least one of the three
screenshots per lesson, more if the screen is busy. Keep labels short (a
few words) and position them over empty space in the screenshot, not on
top of other UI text; check the rendered slide before moving on, since a
label placed by estimate can land slightly off — nudge the coordinates and
re-render rather than leaving it imprecise.

## Applying this to an already-built course

Most of the catalog was built before this policy existed, so most existing
lessons are below the 3-screenshot floor (many at 0 or 1). That's a backlog
to work through deliberately, course by course and chapter by chapter —
not something to silently "fix" as a side effect of an unrelated task. When
asked to build or rebuild a chapter, apply this policy to it; don't assume
the rest of that course has already been brought up to the same standard
unless it's been done and documented (check the course's lesson `sources.json`
files and this repo's memory notes for what's already been upgraded).
