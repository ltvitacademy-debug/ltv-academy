# Lesson 88 — Clustered vs. Nonclustered Indexes: Choosing Wisely

**Chapter 10 · Performance Tuning · Lesson 6 of 12**

## What you'll learn

- Clustered index — how it defines the table's physical row order
- Nonclustered index — a separate lookup structure with pointers
- A table can have at most one clustered index, but many nonclustered
- Choosing a good clustering key

## The clustered index — physical order

A **clustered index** determines the actual **physical order** the
table's rows are stored in on disk — this is why a table can have **only
one** clustered index; the data can only be physically sorted one way.
Creating a `PRIMARY KEY` (a preview of Chapter 11) automatically creates
a clustered index on that column by default in SQL Server.

```sql
-- Illustrative: ProductID as the clustering key
-- means rows are physically stored sorted by ProductID
```

Looking up a row by its clustering key is extremely fast, because SQL
Server can navigate directly to the right physical location.

## The nonclustered index — a separate structure

A **nonclustered index** is a **separate** structure from the table's
physical storage — it holds a sorted copy of the indexed column(s) plus
a **pointer** back to the actual row. A table can have **many**
nonclustered indexes (with limits), each optimized for a different
common lookup pattern.

```sql
-- Illustrative: a nonclustered index on Color
-- lets SQL Server find "all red products" quickly,
-- without changing the table's physical row order at all
```

Looking up by a nonclustered index requires an extra step compared to
the clustered index: find the entry in the index, then **follow the
pointer** back to the actual row — slightly more work, but still far
better than a full table scan.

## Choosing a good clustering key

Since a table gets exactly one clustered index, choosing it well
matters. A good clustering key is typically:

- **Narrow** — a small data type, since every nonclustered index
  secretly includes the clustering key as its "pointer"
- **Unique** — avoiding ambiguity about row order
- **Ever-increasing** — like an identity column, so new rows append at
  the end rather than forcing existing rows to shuffle

This is exactly why an auto-incrementing integer primary key (Chapter 11)
is such a common, effective default clustering key.

## Why this ties back to Lesson 87

`SARGable` predicates matter **because** they let SQL Server actually
**use** these index structures — a non-SARGable predicate forces a scan
that ignores whatever clustered or nonclustered indexes exist, no matter
how well-designed they are.

## Key terms

| Term | Meaning |
|---|---|
| Clustered index | Defines physical row order; at most one per table |
| Nonclustered index | A separate lookup structure with pointers back to rows; many allowed |

## Lab

In AdventureWorks2012, check `Production.Product`'s indexes via Object
Explorer → table → Indexes, and identify which one is clustered.

## Check yourself

You're ready for Lesson 89 when you can answer, without looking: how
many clustered indexes can one table have, and what extra step does
looking up a row via a nonclustered index require?
