# Lesson 88 — Clustered vs. Nonclustered Indexes: Choosing Wisely · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson showed you why a good predicate matters — it lets SQL
Server actually use an index. This lesson is about the indexes
themselves, starting with the two fundamental types: clustered and
nonclustered.

## S2 · CODE CARD (clustered index)

A clustered index determines the actual physical order rows are stored
in, on disk. That's exactly why a table can have only ONE clustered
index — the data can only be physically sorted one single way.
Creating a primary key, which we'll cover properly in Chapter 11,
automatically creates a clustered index by default.

## S3 · CODE CARD (nonclustered index)

A nonclustered index is a completely separate structure. It holds a
sorted copy of the indexed column, plus a pointer back to where the
actual row lives. A table can have many nonclustered indexes, each one
tuned for a different common lookup. The tradeoff: looking something up
this way takes one extra step — find the entry in the index, then
follow that pointer back to the real row. Slightly more work, but still
dramatically better than scanning the whole table.

## S4 · STEPS CARD (NARROW / UNIQUE / EVER-INCREASING)

And since a table only gets one clustered index, choosing it well
really matters. A good clustering key is narrow — a small data type,
since every single nonclustered index secretly carries a copy of it as
its pointer. It's unique, so there's no ambiguity about row order. And
it's ever-increasing, like an identity column, so new rows just append
at the end instead of forcing everything else to shuffle around.

## S5 · OUTRO CARD

That's exactly why an auto-incrementing integer primary key is such a
common, effective default. Next lesson: filtered indexes and included
columns, for making a nonclustered index even more precisely targeted.
See you there.
