# Lesson 40 — Reading CSV · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's read a real file — the actual NYC Taxi trip data, in
PySpark.

## S2 · CODE CARD (read.csv)

This is the same file format Lesson 22 read with Pandas' read
underscore csv. The call shape looks almost identical, and that's
deliberate — Spark wants the jump from Pandas to feel familiar.

## S3 · CODE CARD (header=True)

Header equals true tells Spark to use the file's real first row as
column names — VendorID, pickup time, fare amount — instead of
naming every column underscore c-zero, underscore c-one, and so on.

## S4 · CODE CARD (inferSchema=True)

And infer schema equals true has a real cost: Spark reads the file
twice — once just to guess the types, once to actually load it. On a
large file, that's measurable, which is why production pipelines
often pass an explicit schema instead — that's exactly what Lesson
43 covers.

## S5 · OUTRO CARD

Header for real column names, infer schema for real types — at a
real cost. Next lesson: reading JSON, the same API, a different
format.
