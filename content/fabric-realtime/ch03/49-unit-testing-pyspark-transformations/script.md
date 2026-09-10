# Lesson 49 — Unit Testing PySpark Transformations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Unit testing PySpark transformations — the first kind of test from
last lesson, in full depth.

## S2 · CODE CARD (separating logic from I/O)

A function that reads a file and transforms it is hard to test. A
function that just takes a dataframe in and returns one out is
easy — you hand it exactly the test data you want.

## S3 · CODE CARD (a local SparkSession fixture)

A local spark session runs on a single thread — no cluster, no
fabric workspace, no network call. That's what makes it fast
enough to run dozens of times, every single commit.

## S4 · STEPS CARD (what this catches)

A full pipeline test tells you the whole thing worked or didn't. A
unit test isolates one function — when it fails, you already know
exactly where the bug is.

## S5 · OUTRO CARD

Fast, precise, and cheap to run constantly. Next up: data
contracts — a promise about shape, enforced automatically.
