# Lesson 36 — SparkSession · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every single line of PySpark code in Chapter 4 starts from the same
place. Today, that place: SparkSession.

## S2 · CODE CARD (creating it)

This builder pattern creates it. Get or create either makes a brand
new session, or safely reuses one that already exists — call it more
than once, and you won't accidentally end up with duplicates.

## S3 · CODE CARD (what it gives you)

And here's what it actually gives you. Spark dot read loads files as
DataFrames. Spark dot S-Q-L lets you write real SQL against a
registered view. Both come from the exact same spark object — this
really is the one thing everything else hangs off of.

## S4 · CODE CARD (brief history)

A brief bit of honest history. Early Spark had three separate entry
points — Spark Context for core work, S-Q-L Context for SQL, Hive
Context for Hive. Modern Spark unified all three into this one
SparkSession. The old Spark Context still exists underneath,
accessible if you genuinely need it — but for everything in this
course, SparkSession is the only entry point you'll actually reach
for.

## S5 · OUTRO CARD

One object, everything hangs off it. Next lesson: Spark DataFrames —
and exactly how this differs from Chapter 2's Pandas DataFrame. See
you there.
