# Lesson 39 — CALCULATE Explained · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

One function, one sentence: CALCULATE evaluates an expression inside a
modified filter context. Nearly everything advanced in DAX is built on
top of it.

## S2 · CODE: CALCULATE(<expression>, <filter1>, <filter2>, ...)

An expression to calculate — almost always a measure or a SUM. Then any
number of filters, each one narrowing or changing the filter context
that expression sees. Call it with no filters, and it just behaves like
the expression alone.

## S3 · CODE: Blue Revenue = CALCULATE(SUM(Sales[SalesAmount]), 'Product'[Color] = "Blue")

Here it is doing real work: summing sales, but only for rows where the
product color is blue. Same underlying SUM, one added filter — layered
on top of whatever the report is already filtering by.

## S4 · CODE: New filter on unfiltered column -> added. New filter on already-filtered column -> overwrites.

And here's the default behavior worth knowing cold: if the column isn't
already filtered, CALCULATE's filter gets added. If it already is —
say, by a slicer — CALCULATE's filter overwrites it. That overwrite is
what makes the function so powerful.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: what happens when CALCULATE runs inside row context instead of
filter context — a bridge called context transition.
