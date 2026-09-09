# Lesson 89 — Filtered Indexes and Included Columns

**Chapter 10 · Performance Tuning · Lesson 7 of 12**

## What you'll learn

- Filtered indexes — indexing only a subset of a table's rows
- Included columns — adding data to a nonclustered index without indexing it
- Why both techniques trade index size for targeted speed
- Combining the two

## Filtered indexes — indexing a subset

A **filtered index** applies a `WHERE` clause to the index definition
itself, so it only covers rows matching that condition:

```sql
-- Illustrative: an index covering only products still for sale
CREATE NONCLUSTERED INDEX IX_Product_Active
ON Production.Product (Name)
WHERE SellEndDate IS NULL;
```

If most queries only care about **currently active** products (where
`SellEndDate IS NULL`), a filtered index covering just those rows is
**smaller** and **faster to scan** than a full index covering every
historical product ever sold — while a query that specifically matches
the filter condition can still use it.

## Included columns — data without indexing

A nonclustered index normally only stores the columns it's built on,
plus a pointer back to the row (Lesson 88). **Included columns** let you
attach **extra** column data directly in the index, **without** making
those columns part of the search key:

```sql
-- Illustrative: search by Color, but also retrieve ListPrice
-- without an extra lookup back to the table
CREATE NONCLUSTERED INDEX IX_Product_Color_Include_Price
ON Production.Product (Color)
INCLUDE (ListPrice);
```

If a query selects `Color` and `ListPrice` together, this index can
satisfy the **entire** query directly from the index itself — no need to
follow the pointer back to the full row at all. This is called a
**covering index**: the index alone "covers" everything the query needs.

## Why this trades size for speed

Both techniques make an index **more specifically useful**, at the cost
of **some** extra storage (a filtered index still needs metadata; an
included column duplicates that column's data inside the index). The
tradeoff is almost always worth it for a query pattern that runs
**often** — you're paying a small, one-time storage cost to avoid
repeated, larger runtime costs.

## Combining both

```sql
CREATE NONCLUSTERED INDEX IX_Product_Active_Color
ON Production.Product (Color)
INCLUDE (ListPrice)
WHERE SellEndDate IS NULL;
```

A single index can be both filtered **and** include extra columns — a
narrow, covering index for exactly one common, important query pattern.

## Key terms

| Term | Meaning |
|---|---|
| Filtered index | An index covering only rows matching a `WHERE` condition |
| Included column | Extra data stored in an index without being part of the search key |
| Covering index | An index containing every column a specific query needs |

## Lab

In AdventureWorks2012, check `Production.Product`'s existing indexes via
Object Explorer, and note whether any are filtered or include extra
columns.

## Check yourself

You're ready for Lesson 90 when you can answer, without looking: what
does a filtered index restrict, and what does an included column let you
avoid doing at query time?
