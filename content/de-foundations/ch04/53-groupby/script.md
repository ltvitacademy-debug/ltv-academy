# Lesson 53 — groupBy() · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's actually group rows together — group by.

## S2 · CODE CARD (groupBy alone)

This is the PySpark version of Pandas' group by from Lesson 26 —
same idea, almost the same name. But try showing it directly and it
fails: group by alone returns a grouped data object, not a
DataFrame. It's a statement of intent, waiting for you to say what
to actually calculate.

## S3 · CODE CARD (count)

Count is the simplest way to complete that thought — how many rows
landed in each group. Chaining it directly onto group by turns the
intent into an actual, showable DataFrame — vendor I-D, and a
count.

## S4 · CODE CARD (multiple columns)

And you can group by more than one column at once — every distinct
combination becomes its own group, with its own row and count.

## S5 · OUTRO CARD

Group by states the intent, count completes it. Next lesson:
aggregations — sums, averages, and more, per group.
