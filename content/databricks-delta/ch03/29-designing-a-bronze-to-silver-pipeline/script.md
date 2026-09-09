# Lesson 29 — Designing a Bronze-to-Silver Pipeline · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's turn last lesson's transformation into a real, repeatable
pipeline.

## S2 · CODE CARD (widgets + jobs)

A widget supplies which date to process, and a job runs the whole
thing on a schedule — Lesson 9 and Lesson 11, put to work together,
instead of typing a date in by hand every time.

## S3 · CODE CARD (idempotency)

And the property that matters most here is idempotency — running
the pipeline twice on the same input should produce the same
result as running it once. Real jobs get retried, and a pipeline
that isn't idempotent silently corrupts data on that second run.

## S4 · CODE CARD (MERGE for silver)

That's exactly why silver uses merge instead of append. Plain
append would duplicate rows if the same bronze batch got processed
twice. Merge, matching on the same key used for deduplication, only
inserts genuinely new rows and updates existing ones.

## S5 · OUTRO CARD

Widget-driven date, read bronze, transform, merge into silver,
wrapped as a scheduled job — that's the complete pattern. Next
lesson: silver to gold, the same pattern, one layer further.
