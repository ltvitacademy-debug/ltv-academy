# Lesson 46 — Index Seeks, Scans, Lookups & Common Plan Operators

**Chapter 8 · Query Performance Tuning · Lesson 46 of 95**

## What you'll learn

- The real difference between an Index Seek and an Index Scan, and why one is usually good and the other usually isn't
- What a Key Lookup (or RID Lookup) is, and why it's an extra trip the optimizer would rather avoid
- The other operators you'll see constantly: Nested Loops, Hash Match, Sort, and Compute Scalar
- How to tell, from the plan alone, whether an index is actually being used well

## Seek vs. Scan: targeted vs. everything

You built clustered and nonclustered indexes back in T-SQL
Development Lessons 88–89. This lesson is about what the optimizer
actually *does* with them once a query runs, which shows up in the
plan as one of two very different operators:

- **Index Seek** — the optimizer used the index's B-tree structure to
  navigate directly to the rows that matched, the way you'd flip
  straight to a page using a book's index instead of reading every
  page. This is what you want for a selective query returning a small
  slice of a large table.
- **Index Scan** — the optimizer read the *entire* index, top to
  bottom, checking every row against the filter. This isn't always
  bad — for a query that legitimately needs most of the table
  (a report over an entire month, say), a scan can be the cheapest
  plan available. But an unexpected scan on a large table for a query
  that should only touch a handful of rows is a strong signal that
  the right index doesn't exist, or the existing index's leading
  column doesn't match the query's filter.

```sql
-- Likely a Seek: filters on the leading column of an index
SELECT OrderID, OrderDate FROM Sales.SalesOrderHeader
WHERE CustomerID = 29825;

-- Likely a Scan: filters on a column that isn't a leading index key,
-- or the optimizer decided most of the table qualifies anyway
SELECT OrderID, OrderDate FROM Sales.SalesOrderHeader
WHERE YEAR(OrderDate) = 2013;
```

The second query is a classic scan-forcer: wrapping `OrderDate` in
`YEAR()` makes the predicate non-**SARGable** — the optimizer can't
use an index seek against a function applied to the column, even if
an index on `OrderDate` exists, because it would have to evaluate the
function for every row first.

## Key Lookup (and RID Lookup): the extra trip

A nonclustered index only stores its key columns plus a pointer back
to the full row. If a query asks for columns the index doesn't cover,
SQL Server has to make a **second** trip — a **Key Lookup** — back to
the clustered index (or a **RID Lookup** back to a heap with no
clustered index) to fetch the rest:

```sql
-- Index on (CustomerID) covers the seek, but not TotalDue --
-- expect an Index Seek followed by a Key Lookup for TotalDue
SELECT OrderID, TotalDue FROM Sales.SalesOrderHeader
WHERE CustomerID = 29825;
```

One lookup per matching row sounds cheap, but at scale — thousands of
matching rows — that's thousands of extra random-I/O trips back to
the clustered index, and SSMS will often flag exactly this with a
"missing index" suggestion (Lesson 47) that includes `TotalDue` as an
**included column**, turning the index into a covering index and
eliminating the lookup entirely.

## Other operators you'll see constantly

- **Nested Loops** — for each row on one side, scan/seek the other
  side once per row. Cheap when the outer side is small.
- **Hash Match** — builds an in-memory hash table from one input,
  then probes it with the other. Common for joins on large,
  unsorted inputs without a useful index; can spill to `tempdb` if
  the hash table doesn't fit in memory.
- **Sort** — an explicit sort operator, often for `ORDER BY` or to
  feed a downstream Merge Join; an expensive Sort is a common target
  for an index that already stores data in the needed order.
- **Compute Scalar** — evaluates an expression (a calculation, a
  function, a cast) — usually cheap on its own, but worth noting
  when it sits right before a Filter, since that's often where a
  non-SARGable predicate like `YEAR(OrderDate)` gets evaluated.

## Reading operators together

No single operator tells the whole story — it's the combination.
An Index Seek followed immediately by a Key Lookup on a query
returning thousands of rows is the single most common "add this
index" fix in real DBA work: it means the seek itself is fine, but
the index doesn't cover enough columns to avoid the second trip.

## Key terms

| Term | Meaning |
|---|---|
| Index Seek | Optimizer navigates directly to matching rows via the B-tree — targeted, usually good |
| Index Scan | Optimizer reads the entire index — sometimes correct, often a sign of a missing/wrong index |
| Key Lookup | A second trip back to the clustered index to fetch columns the nonclustered index doesn't cover |
| SARGable | A predicate the optimizer can satisfy with an index seek (vs. wrapping a column in a function) |

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: what
does an Index Seek immediately followed by a Key Lookup usually mean,
and why does wrapping a column in a function like `YEAR()` in a
`WHERE` clause often force a scan instead of a seek?
