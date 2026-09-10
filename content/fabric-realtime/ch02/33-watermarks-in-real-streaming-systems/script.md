# Lesson 33 — Watermarks in Real Streaming Systems · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Watermarks — how a system decides a window is actually done,
despite data arriving late.

## S2 · CODE CARD (a window has to close eventually)

Lesson 29's gap between event time and processing time resurfaces
here. A tumbling window can't wait forever for every possible
straggler before it reports a final answer.

## S3 · CODE CARD (the watermark as a deadline)

A watermark makes that decision explicit — a declared tolerance
for lateness. Close the window a fixed amount of time after its
natural end. Anything later gets dropped or routed elsewhere, by
design.

## S4 · STEPS CARD (latency vs. completeness)

Shorter tolerance means faster answers but more risk of missing
real stragglers. Longer tolerance catches more late data but
delays every result. Databricks structured streaming's
withWatermark, from lesson 35 of that course, is the exact same
idea.

## S5 · OUTRO CARD

No setting here is simply correct — it's tuned to how late your
data actually runs. Next up: what actually happens to the data
that shows up past the watermark.
