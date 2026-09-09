# Lesson 43 — Row-Level and Column-Level Security · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Whole-table access isn't always enough — row and column-level
security.

## S2 · CODE CARD (column mask)

A column mask is a function, applied automatically on every
query. Is member checks the querying user's group at query time —
the data engineers group sees the real vendor I-D, everyone else
sees redacted, from the exact same select star.

## S3 · CODE CARD (row filter)

A row filter works the same way, but returns true or false per
row instead. Rows where it returns false simply don't appear, for
that user, from that same query — an admin sees everything,
everyone else only their own region.

## S4 · CODE CARD (single source of truth)

And neither mechanism copies any data anywhere. There's still
exactly one silver dot trips table — masking and filtering just
get evaluated fresh, per query, based on who's actually asking.

## S5 · OUTRO CARD

One table, one pipeline, different views per user — without ever
running Chapter 3's pipeline more than once. Next lesson: data
lineage, tracing a table back to where it came from.
