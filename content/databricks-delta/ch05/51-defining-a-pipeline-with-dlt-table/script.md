# Lesson 51 — Defining a Pipeline With @dlt.table · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's look at the real syntax, in full — defining a pipeline
with at dlt dot table.

## S2 · CODE CARD (full anatomy)

The decorator declares metadata — a comment, and table
properties, here a simple quality tag matching this course's own
bronze, silver, gold vocabulary. The function name becomes the
actual table name. And the return value is the exact same
DataFrame this course has built with the same PySpark methods all
along.

## S3 · CODE CARD (@dlt.view)

At dlt dot view defines an intermediate step used only within the
pipeline — it's part of the same dependency graph, but never
becomes its own queryable table. Useful for breaking a long
transformation into readable pieces without cluttering the
catalog.

## S4 · CODE CARD (table properties)

And table properties live right alongside the transformation logic
itself — one self-contained function, instead of Lesson 40's
separate create and alter table statements.

## S5 · OUTRO CARD

Decorator for metadata, function name for the table, return value
for the contents. Next lesson: expectations, Lesson 36's
quarantine idea, built right in.
