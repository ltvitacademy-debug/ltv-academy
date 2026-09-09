# Lesson 54 — Aggregations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Group by states the intent — now let's compute real statistics per
group, with aggregations.

## S2 · CODE CARD (agg with multiple stats)

Agg is the real payoff over last lesson's plain count. Pass it as
many aggregate functions as you want in one call — count, sum,
average, max — each wrapped in alias so the result gets sensible
column names instead of Spark's default naming.

## S3 · CODE CARD (agg without groupBy)

Skip group by entirely, and agg still works — it just treats the
whole DataFrame as one single group, returning exactly one row.
That's the PySpark version of Lesson 23's direct Pandas mean call,
just phrased as an aggregate expression.

## S4 · CODE CARD (count star vs column)

And watch the difference between count star and count of a
specific column: count star counts every row, nulls included.
Count of a column only counts the rows where that column isn't
null — a genuinely different number whenever null handling left
gaps.

## S5 · OUTRO CARD

Agg for multiple statistics at once, and always check whether you
mean count star or a specific column. Next lesson: PySpark joins,
for combining two DataFrames.
