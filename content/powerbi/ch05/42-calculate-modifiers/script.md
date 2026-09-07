# Lesson 42 — CALCULATE Filter Modifiers · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Beyond simple conditions, CALCULATE accepts functions that change how
filtering itself behaves. Three worth knowing well.

## S2 · CODE: %Sales = DIVIDE([TotalSales], CALCULATE([TotalSales], REMOVEFILTERS()))

REMOVEFILTERS clears filters — from one column, or everywhere. Here it
strips every filter for the denominator, giving you the grand total no
matter what's selected. Divide the filtered total by that, and you get
percent of total — a pattern you'll use constantly.

## S3 · CODE: CALCULATE(..., KEEPFILTERS('Geography'[State] = "WA" || ... = "OR"))

Remember: CALCULATE normally overwrites an existing filter on the same
column. KEEPFILTERS changes that — the new filter intersects with what's
already active instead of replacing it. Reach for it when you want to
add a constraint, not swap one out.

## S4 · CODE: CALCULATE(SUM(Sales[SalesAmount]), USERELATIONSHIP(Sales[ShipDateKey], 'Date'[DateKey]))

And USERELATIONSHIP reaches an inactive relationship for one
calculation — the exact mechanism behind a single Date table filtering a
fact table three different ways, with only one relationship active by
default.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: FILTER itself — the function that builds the table expressions
CALCULATE and SUMX both rely on.
