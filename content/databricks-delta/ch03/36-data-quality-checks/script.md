# Lesson 36 — Data Quality Checks in the Medallion Flow · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's make sure bad data doesn't quietly spread — data quality
checks.

## S2 · CODE CARD (quarantine)

Rather than Lesson 51's binary choice of dropping a bad row or
guessing a fill value, a quarantine table keeps it somewhere real
and inspectable. Nothing gets silently discarded, and nothing bad
reaches gold either — someone can review the quarantine table
later.

## S3 · CODE CARD (quality metrics)

And it's worth tracking quality over time, in its own small gold
table — total rows, bad fare counts, per day. A sudden spike is an
early warning that something changed upstream, worth investigating
before it becomes a bigger problem.

## S4 · CODE CARD (two different claims)

Because a job's run history showing succeeded only means the code
executed without an exception — it says nothing about whether the
data itself was actually good. Quarantine counts and quality
metrics are what actually answer that separate question.

## S5 · OUTRO CARD

Quarantine what's bad, track quality over time, and never confuse
a successful run with trustworthy data. Next lesson: building a
full medallion pipeline, the chapter finale, all together.
