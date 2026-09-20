# Plan Operator Cost Analysis

Lessons 6 and 7 gave you the vocabulary and the estimate-vs-actual signal. This lesson is
a field guide to the specific operators that show up disproportionately often in slow
plans, and what each one usually — not always — indicates when you find it dominating a
plan's cost.

## What you'll learn

- Four operators to watch for: Key Lookup, Sort, Hash Match, and Table/Index Scan on a large table
- What each one usually indicates when it's expensive
- Why "usually" matters — none of these are automatically wrong

## Key Lookup: the tax of a non-covering index

A Key Lookup fires once per row matched by a nonclustered index seek, to fetch columns
the index doesn't include. For a handful of rows, this is trivial. For tens of thousands
of matching rows, it's tens of thousands of extra random-access reads against the
clustered index — and SSMS often pairs a Key Lookup with a Nested Loops join, which makes
the pattern visually recognizable. The usual fix is a **covering index** — adding the
missing columns as included columns so the engine never has to leave the nonclustered
index at all (Chapter 3 covers this in depth).

```sql
-- Seek + Key Lookup pattern: index has ProductID, but not UnitPrice
SELECT ProductID, UnitPrice FROM Sales.SalesOrderDetail
WHERE ProductID = 776;
-- Fix: CREATE INDEX IX_Detail_ProductID ON Sales.SalesOrderDetail(ProductID)
--      INCLUDE (UnitPrice);
```

## Sort: expensive, and worse when it spills

A Sort operator explicitly reorders rows — for an `ORDER BY`, a `DISTINCT`, or to feed a
Merge Join or a Stream Aggregate that needs sorted input. Sorting is inherently
memory- and CPU-intensive, and it gets dramatically worse if the sort doesn't fit in its
memory grant and **spills to tempdb** (visible as a warning icon on the operator, and in
`sys.dm_exec_query_stats` as physical writes). The best fix is usually to avoid needing
the sort at all — an index whose key order already matches the required `ORDER BY`
means the engine can walk it in order and skip the Sort operator entirely.

## Hash Match: fine at the right size, painful at the wrong one

Hash Match builds an in-memory hash table from one input (the "build" side, ideally the
smaller one) and probes it with the other. It's the optimizer's default choice for joining
or aggregating large, unsorted inputs where a Nested Loops join would be far too slow.
The problem case is a Hash Match given a bad memory grant estimate — usually from the same
estimated-row-count problem as Lesson 7 — that then spills to tempdb in multiple passes,
turning an in-memory operation into a disk-bound one.

## Table/Index Scan on a large table: work proportional to size, not to what you need

A Scan reads the entire structure. On a small lookup table, that's nothing. On a
40-million-row fact table for a query that only needed 200 rows, it means the engine did
200,000x more work than necessary — and it's usually a sign that either no useful index
exists for the predicate, or the predicate isn't **seekable** (a leading wildcard `LIKE
'%value'`, a function wrapped around the indexed column, or an implicit data type
conversion can all silently disable a seek even when the "right" index exists).

```sql
-- Not seekable: function wraps the indexed column
WHERE YEAR(OrderDate) = 2026
-- Seekable rewrite:
WHERE OrderDate >= '2026-01-01' AND OrderDate < '2027-01-01';
```

## Key terms

| Term | Meaning |
|---|---|
| Covering index | A nonclustered index that includes every column a query needs, avoiding Key Lookups |
| Spill to tempdb | When a Sort or Hash Match exceeds its memory grant and finishes work on disk instead |
| Build side | The input Hash Match uses to construct its in-memory hash table |
| Seekable predicate | A WHERE condition the optimizer can satisfy with an index seek rather than a scan |

## Check yourself

A plan shows a Hash Match with a "spill to tempdb" warning, feeding into a Sort that also
spills. What does the presence of spills, specifically, tell you about the memory grant
this query received — and what's the likely upstream cause?
