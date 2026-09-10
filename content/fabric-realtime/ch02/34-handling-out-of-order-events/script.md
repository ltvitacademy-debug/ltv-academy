# Lesson 34 — Handling Out-of-Order Events · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Handling out-of-order events — a real problem, and a different one
from lateness.

## S2 · CODE CARD (two different problems)

Last lesson's watermark deals with events arriving too late
entirely. Out-of-order is different — events arrive within
tolerance, just not in the sequence they actually happened in.

## S3 · CODE CARD (spotting it in KQL)

Ingestion time minus event time shows exactly how stale each event
was on arrival. It doesn't fix anything by itself — it just makes
the gap visible so you can decide if it matters.

## S4 · STEPS CARD (three practical options)

Most aggregations like count and sum genuinely don't care about
order — tolerate it. If order does matter, widen the watermark.
And genuinely problematic events can be routed elsewhere for
review.

## S5 · OUTRO CARD

Sorting a finished window's output doesn't fix how it was computed
— that's a display fix, not a computation fix. Next up: eventstream
transformations, shaping data as it flows.
