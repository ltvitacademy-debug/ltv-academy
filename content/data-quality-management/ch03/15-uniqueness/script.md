# Lesson 15 — Uniqueness · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Uniqueness asks a question the other dimensions don't: not whether a
record is right, but whether there's exactly one of it.

## S2 · STEPS — What uniqueness means

A duplicate customer record isn't inaccurate or invalid by itself —
each copy might be perfectly correct on its own. The problem is purely
that there are two of them when there should be one. And duplicates
get expensive fast: double marketing emails, double-counted revenue,
two records nobody can tell apart.

## S3 · CODE — GROUP BY and HAVING

The classic duplicate finder. Group by the column that should
uniquely identify a real-world entity — here, email — and keep only
the groups where more than one row shares that value.

## S4 · SCREENSHOT — A results grid

This is what that output looks like once it comes back — a plain
SSMS results grid. A duplicate-finder query's result set lands in a
grid shaped exactly like this one.

## S5 · STEPS — Exact vs. fuzzy

Exact duplicates match character for character — solvable with plain
GROUP BY. Fuzzy duplicates are close but not identical — "Jon Smith"
versus "John Smith" — and need cleansing and standardization first,
which is Lesson 24's job, not this one.

## S6 · CODE — ROW_NUMBER for de-duplication

A second pattern, especially useful when you want to keep exactly one
row per group. Partition by email, number each row within the
partition, and everything numbered greater than one is a duplicate
beyond the first occurrence.

## S7 · OUTRO

Uniqueness finds the extras. Next up: timeliness — the dimension about
whether the data you have is still worth trusting right now.
