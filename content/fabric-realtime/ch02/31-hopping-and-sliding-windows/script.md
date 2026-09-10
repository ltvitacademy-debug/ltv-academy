# Lesson 31 — Hopping and Sliding Windows · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Hopping and sliding windows — fixed-size, but overlapping, on
purpose.

## S2 · CODE CARD (overlap, on purpose)

A 5-minute window hopping every 1 minute produces a new result
every minute, each covering the trailing 5 minutes. Any single
event can now land in several windows at once — that never happens
with tumbling.

## S3 · CODE CARD (Eventstream Sliding type)

The same eventstream window node from last lesson offers a sliding
type alongside tumbling. Set a window size and a hop size, and
fabric computes the overlapping aggregate for you.

## S4 · STEPS CARD (hopping vs. tumbling)

Tumbling has no overlap and is cheapest to compute. Hopping has
overlap and a smoother output. That overlap costs more per event —
worth it for a dashboard tile, wasteful for a nightly report.

## S5 · OUTRO CARD

Fixed-size, overlapping, smoother. Next up: session windows —
variable-size, closed by a gap instead of a fixed clock.
