# Lesson 35 — Handling Late-Arriving Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Real pipelines face a real complication — data that arrives late.

## S2 · CODE CARD (what late means)

A trip that happened January 15th, but whose record doesn't reach
bronze until January 17th. Its real event time and its ingestion
time being different is the entire definition of late.

## S3 · CODE CARD (why gold breaks)

And that breaks a naive gold aggregate. If January 15th's revenue
was already published on January 16th — before this late record
even arrived — that published number is now wrong. A pipeline that
only ever processes today's new rows never notices.

## S4 · CODE CARD (reprocessing window)

The fix is reprocessing a window — recomputing gold for a few
recent days, not just today, and merging the corrected numbers
back in. Same merge tool from Lesson 22, doing genuinely different
work: correction, not deduplication.

## S5 · OUTRO CARD

And none of this requires redesigning bronze — it's append-only,
never filtering, so a late row is still just another row landing
on its own schedule. Next lesson: data quality checks, catching
bad data before it spreads.
