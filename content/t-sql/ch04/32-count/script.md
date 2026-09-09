# Lesson 32 — COUNT · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 4. Every function you've used so far — ISNULL, string
functions, CASE — works on one row at a time. This chapter introduces a
different kind: aggregate functions, which take an entire set of rows and
collapse them down into a single value. We'll start with the simplest and
most common one: COUNT.

## S2 · CODE CARD (COUNT(*) example)

Count, star, as total products. Star inside COUNT means count every
single row, full stop, regardless of what's NULL in any column. This is
the version to reach for whenever the question is simply "how many rows."

## S3 · CODE CARD (COUNT(Color) example)

Now compare that to count of a specific column. Count of Color only
counts rows where Color itself isn't NULL. If two hundred products have
no color recorded, count of color comes back two hundred less than count
star, on that exact same table. NULL means unknown, from Lesson 16, and
aggregate functions consistently skip it rather than counting it as some
kind of value.

## S4 · CODE CARD (COUNT(DISTINCT Color) example)

And combine COUNT with DISTINCT from Lesson 9, and you get something
different again: unique values instead of every occurrence. If twenty
products are red, count of color counts all twenty. Count DISTINCT of
color counts red exactly once.

## S5 · OUTRO CARD

Three flavors of COUNT, three different answers to three different
questions: every row, non-NULL values in one column, or unique values in
one column. Next lesson: SUM and AVG, two more aggregate functions built
on the exact same set-based idea. See you there.
