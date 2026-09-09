# Lesson 16 — Reading and Writing Delta Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's cover the everyday operations — reading and writing
Delta tables.

## S2 · CODE CARD (reading)

Spark dot table reads a registered table by name, no path or
format delta needed — Spark already knows what it is from the
metastore. All three ways here return an ordinary DataFrame, and
everything from Foundations' Chapter 4 works on it immediately.

## S3 · CODE CARD (write modes)

Overwrite and append are exactly Foundations Lesson 60's mode
pattern, unchanged — they behave the same way they did for plain
Parquet. Delta's real edge shows up later, in Lesson 22's merge,
which updates and inserts in one atomic operation.

## S4 · CODE CARD (saveAsTable)

And save as table does two things at once: writes the data as
Delta, and registers it under that name in the metastore
immediately — the shortest real path from having a DataFrame to
having a named table.

## S5 · OUTRO CARD

Read by path or name, write with overwrite or append, and save as
table skips a step. Next lesson: the Delta transaction log, opened
up directly.
