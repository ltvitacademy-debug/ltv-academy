# Lesson 30 — Designing a Silver-to-Gold Pipeline · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's connect silver to gold — the second half of the
pipeline.

## S2 · CODE CARD (simpler than expected)

Bronze to silver deals with real messiness — casting,
deduplication, nulls. Silver to gold, by the time it runs, is
already reading clean data. Its job is aggregation, not cleaning.
Fewer steps here is expected, not a sign something's missing.

## S3 · CODE CARD (overwrite default)

And unlike silver's merge, many gold tables are small enough to
just fully recompute and overwrite every run — simpler than merge,
and just as correct, since the whole table gets rebuilt from all
of silver each time.

## S4 · CODE CARD (when incremental is needed)

For a genuinely huge gold aggregate, recomputing everything gets
expensive — that's when gold reaches for the same merge-based
pattern silver used, updating only what could have actually
changed.

## S5 · OUTRO CARD

And both pipelines chain into one job, two tasks — silver to gold
only starts once bronze to silver finishes successfully. Next
lesson: incremental processing patterns, beyond reprocessing
everything every time.
