# Lesson 24 — KQL: summarize and Aggregations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's actually aggregate real events — summarize.

## S2 · CODE CARD (summarize by)

Summarize by combines group by and agg into one operator — by
vendor I-D is the grouping, and named aggregate expressions
compute per group, the exact same idea as Foundations' agg, just
KQL's own naming order.

## S3 · CODE CARD (aggregate functions)

Count, sum, average, max — genuinely the same aggregate functions
from Foundations, just called with KQL's own syntax instead of
Python's.

## S4 · CODE CARD (bin)

And bin is a genuinely new idea — it rounds a timestamp down to
the nearest interval, so summarize by bin groups events into real
time buckets. This is the real mechanism behind every time-series
aggregation this chapter builds toward.

## S5 · OUTRO CARD

Group, aggregate, and now bucket by time — as the stream arrives,
not after it's already loaded. Next lesson: KQL joins, combining
tables, KQL's own way.
