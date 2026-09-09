# Lesson 89 — Filtered Indexes and Included Columns · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two ways to make an index even more precisely targeted than the basics
from last lesson: filtered indexes, and included columns.

## S2 · CODE CARD (filtered index example)

A filtered index applies a WHERE clause right inside the index
definition itself, so it only covers rows matching that condition. If
most of your queries only care about currently active products — where
sell end date is null — a filtered index covering just those rows is
smaller and faster to scan than one covering every historical product
ever sold.

## S3 · CODE CARD (included columns example)

Included columns solve a different problem. Normally, a nonclustered
index only stores the columns it's built on, plus a pointer back to the
row. INCLUDE lets you attach extra column data directly inside the
index, without making those columns part of the actual search key. If a
query selects color and list price together, this index can answer the
ENTIRE query straight from the index itself — no need to follow the
pointer back to the full row at all. That's called a covering index:
the index alone covers everything the query needs.

## S4 · CODE CARD (combining both)

And you can combine both in a single index — filtered down to active
products, AND including list price. A narrow, covering index built for
exactly one common, important query pattern. Yes, this costs a little
extra storage — a filtered index needs metadata, an included column
duplicates data. But for a query pattern that runs often, that's almost
always a trade worth making.

## S5 · OUTRO CARD

Filtered indexes narrow WHAT gets indexed; included columns widen WHAT
the index can answer without a lookup. Next lesson: actually reading an
execution plan, scans versus seeks. See you there.
