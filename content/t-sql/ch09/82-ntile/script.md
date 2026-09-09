# Lesson 82 — NTILE · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

RANK and DENSE_RANK rank rows individually, one at a time. This lesson
closes out Chapter 9 with something coarser: NTILE, for splitting all
your rows into a fixed number of roughly equal groups.

## S2 · CODE CARD (NTILE(4) example)

NTILE 4, over, order by list price descending, as price quartile. This
divides the ordered rows into four roughly equal groups, numbered 1
through 4. Because we sorted descending, group 1 holds the most
expensive quarter of all products; group 4 holds the cheapest quarter.
Swap that 4 for any number you want — NTILE 10 gives you deciles, NTILE
100 gives you percentiles.

## S3 · CODE CARD (uneven division)

And what happens when the row count doesn't divide evenly? Say 22 rows
into four groups — SQL Server hands the extra rows to the earliest
groups first, one extra row each, so you end up with 6, 6, 5, 5. No
group ever differs from another by more than a single row, and you
don't get to choose which groups get the extras.

## S4 · CODE CARD (NTILE with PARTITION BY)

And just like every function this chapter, NTILE can be partitioned.
Partition by color, order by list price descending — this computes
price quartiles separately WITHIN each individual color, instead of
lumping everything together across the whole table.

## S5 · OUTRO CARD

That closes out Chapter 9. You now have the full ranking toolkit: OVER
and PARTITION BY as the foundation, ROW_NUMBER for unique sequencing,
RANK and DENSE_RANK for two different ways of handling ties, and NTILE
for splitting data into equal buckets. Chapter 10 moves into Performance
Tuning — execution plans, indexes, and the comparative topics, like
joins versus subqueries, that tie everything together from a speed
perspective. See you there.
