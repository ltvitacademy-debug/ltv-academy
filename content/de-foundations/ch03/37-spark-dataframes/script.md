# Lesson 37 — Spark DataFrames · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Same word as Lesson 21's Pandas DataFrame. Genuinely different
underneath. Three real differences worth knowing before Chapter 4.

## S2 · STEPS CARD (three differences)

Distributed — it's spread across partitions on many executors, never
required to sit in one place. Lazy — you already know this one, it
just builds a plan. And immutable — a transformation never modifies
the thing it's called on.

## S3 · CODE CARD (immutability)

Here's that last one, made concrete. Filter a DataFrame, and the
original is completely untouched. The filtered version is a
genuinely separate, new DataFrame. In Pandas, this kind of line can
FEEL like it's modifying something in place. Spark makes it
explicit: it never does.

## S4 · CODE CARD (what carries over)

But here's the reassuring part. Rows, columns, schema, filtering,
grouping — every concept you built in Chapter 2 transfers directly.
Chapter 4 is mostly new syntax for ideas you already genuinely
understand, not new ideas from scratch.

## S5 · OUTRO CARD

Distributed, lazy, immutable — three real differences, and
everything else carries over. Next lesson: Spark SQL — writing real
SQL directly against a Spark DataFrame. See you there.
