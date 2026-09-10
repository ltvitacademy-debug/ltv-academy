# Lesson 35 — Eventstream Transformations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Eventstream transformations — the rest of the canvas's nodes,
beyond window.

## S2 · CODE CARD (Filter and Manage Fields)

Filter is functionally identical to a KQL where clause, but runs
on the stream itself. Manage fields is the visual equivalent of
project and extend — keep, rename, or cast fields before anything
lands.

## S3 · CODE CARD (Group By, Union, Join)

Group by computes an aggregate directly on the canvas, the same
idea as summarize by. Union merges multiple streams into one.
Join combines two streams on a matching key, within a time window
— all before landing.

## S4 · STEPS CARD (why shape it in-stream)

Filtering noisy events out in-stream means they're never written
at all — no storage, no downstream compute wasted. Filtering after
landing still pays to store and scan the noise first.

## S5 · OUTRO CARD

Shape it early, and every query written afterward gets simpler.
Next up: routing events to multiple destinations — one stream,
several places to go.
