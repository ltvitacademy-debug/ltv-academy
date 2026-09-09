# Lesson 15 — Creating a Delta Table · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually create one — a Delta table, three different ways.

## S2 · CODE CARD (from a DataFrame)

From a DataFrame, it's exactly last lesson's write — a Delta table
addressed purely by storage path, the same way every write
throughout Foundations was addressed.

## S3 · CODE CARD (from SQL)

From SQL, create table using delta location registers a real,
persistent name in the metastore. From then on, select star from
trips works directly — no spark dot read needed. Unlike
Foundations' temp views, this persists for good, independent of any
notebook.

## S4 · CODE CARD (convert to delta)

And if a Parquet folder already exists, convert to delta adds the
transaction log right there, in place, with no rewrite of the
actual data files at all — the real migration path from plain
Parquet to Delta.

## S5 · OUTRO CARD

Path-based for quick work, named for anything real and governable.
Next lesson: reading and writing Delta tables, the everyday
operations, both ways.
