# Lesson 36 — Routing Events to Multiple Destinations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Routing events to multiple destinations — one stream, fanning out
to several places at once.

## S2 · CODE CARD (conditional split)

A conditional split routes events down different branches based on
a condition, using the same filter node from last lesson, just
applied multiple times in parallel.

## S3 · CODE CARD (a design for this course's data)

Here's a concrete design — all events go to the KQL database,
high-value trips also go to a lakehouse table, and anything
failing a sequence check goes to a needs-review table. Every
branch reads the source once.

## S4 · STEPS CARD (one stream vs. three pipelines)

Three separate eventstreams would mean paying for the source
connection three times, with three definitions to keep in sync.
One eventstream with three branches reads the source once.

## S5 · OUTRO CARD

Routing is the mechanism — next up is what you actually do with
what got routed there. Lesson 37: activator, real-time alerting.
