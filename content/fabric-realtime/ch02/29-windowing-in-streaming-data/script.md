# Lesson 29 — Windowing in Streaming Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Windowing — how you aggregate a stream that never ends.

## S2 · CODE CARD (why summarize needs a boundary)

A finite table's summarize runs once and finishes. A live stream,
with no boundary at all, would just keep growing forever and
never actually finish. Lesson 26's bin function was the first
taste of the fix.

## S3 · CODE CARD (event time vs. processing time)

A window is a time-bounded slice of a stream. And which clock you
use matters — event time is when something actually happened,
processing time is when the system received it. Delays mean these
rarely match exactly.

## S4 · STEPS CARD (four window types ahead)

Four window shapes ahead. Tumbling — fixed, back to back. Hopping
and sliding — fixed but overlapping. Session — closes after a gap
of inactivity. And watermarks — deciding a window is done despite
late data.

## S5 · OUTRO CARD

Every streaming engine needs some version of this, because the
problem — infinite input, finite output — never changes. Next up:
tumbling windows, the simplest shape, built first.
