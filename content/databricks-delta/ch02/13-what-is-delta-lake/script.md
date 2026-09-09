# Lesson 13 — What Is Delta Lake? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (chapter opener).

---

## S1 · TITLE CARD

Chapter 2 starts here — what is Delta Lake, actually?

## S2 · CODE CARD (built on Parquet)

Foundations Lesson 42 covered why Parquet is the analytics
default. Delta Lake starts from exactly that — every Delta table's
actual data files are Parquet files, unchanged. Delta doesn't
replace Parquet, it wraps it.

## S3 · CODE CARD (the problem)

Here's the real problem it solves: writing a batch of Parquet files
isn't atomic. If a write job fails halfway through, you can be left
with a partial set of files, and no record of which set is the
real, complete version. Foundations never had to worry about this,
because every write there ran once, uninterrupted.

## S4 · CODE CARD (the transaction log)

What Delta adds is a folder called underscore delta underscore
log — a sequential, append-only record of every change ever made.
This one log is the actual mechanism behind everything else this
chapter covers: atomic writes, time travel, safe concurrent
updates.

## S5 · OUTRO CARD

Same Parquet files, plus a log that makes them trustworthy — that's
why Delta is the real-world default now, not the exception. Next
lesson: Delta tables versus Parquet tables, made concrete.
