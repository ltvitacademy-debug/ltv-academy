# Lesson 13 — Building Aging Buckets with CASE · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Aging buckets — current, 1 to 30, 31 to 60, 61 to 90, 90 plus — are the
single most common report structure in all of Finance. This lesson builds
them with CASE.

## S2 · CODE CARD (CASE WHEN for aging buckets)

CASE evaluates each WHEN condition in order, top to bottom, and returns the
first one that's true. Days overdue less than or equal to zero, current.
One through thirty, 1-30 days. Thirty one through sixty, 31-60. And so on,
with ELSE catching everything past ninety. This exact five-bucket
structure runs underneath essentially every AP and AR aging report in the
industry.

## S3 · STEPS CARD (order matters)

Because CASE stops at the first match, your ranges have to be mutually
exclusive and gapless — no overlaps, no holes — or some rows will quietly
land in the wrong bucket.

## S4 · CODE CARD (totaling by bucket with GROUP BY)

A label by itself isn't a report — Finance wants a dollar total per
bucket. Group by the exact same CASE expression, sum amount remaining.
Notice GROUP BY repeats the whole CASE, word for word — Oracle groups by
what the expression evaluates to, so the expression has to appear in full
again.

## S5 · STEPS CARD (preview of a cleaner way)

Repeating that whole CASE expression twice is clunky, and it only gets
worse as buckets get more complex. Common Table Expressions, two lessons
from now, give you a much cleaner way to compute it once and reuse it —
keep that in mind as you write this pattern by hand for now.

## S6 · OUTRO CARD

CASE for the bucket, GROUP BY for the total per bucket — that's a real
aging report. Next lesson: balances by supplier, customer, and period, all
in one query.
