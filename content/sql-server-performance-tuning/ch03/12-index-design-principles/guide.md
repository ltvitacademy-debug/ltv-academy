# Index Design Principles

Chapter 2 went deep on reading execution plans — the diagnostic half of index tuning.
This chapter is the other half: actually designing indexes that make those plans fast.
We start with the fundamentals every other technique in this chapter builds on: what a
clustered index really is, why key column order isn't arbitrary, and how to judge whether
a column is even worth indexing in the first place.

## What you'll learn

- The real difference between a clustered and a nonclustered index
- Why key column order follows the leftmost-prefix rule — and why getting it backwards
  quietly breaks an index
- How to judge selectivity before you ever write `CREATE INDEX`

## Clustered vs. nonclustered: one is the table, one points at it

A **clustered index** determines the physical order the table's rows are stored in on
disk — there can only be one per table, because a table can only be sorted one way at
once. In SQL Server, the clustered index *is* the table; every column lives at each leaf
row. A **nonclustered index** is a separate structure: a compact, ordered copy of just its
key columns, plus a pointer back to the full row (the clustered index key, if one exists,
or a row identifier if the table is a heap). A table can have hundreds of nonclustered
indexes but only one clustered index.

That pointer-back matters constantly. If a query needs columns that aren't in the
nonclustered index's key or included columns, SQL Server has to follow the pointer back to
the clustered index to fetch them — a **Key Lookup**. One Key Lookup per matching row is
cheap for ten rows and ruinous for ten million. Lesson 13 builds directly on this idea.

## The leftmost-prefix rule: column order is not a suggestion

A composite (multi-column) index is sorted first by its first key column, then by its
second within each value of the first, and so on — exactly like a phone book sorted by
last name, then first name. SQL Server can use that structure efficiently to seek on the
first column alone, or on the first-and-second together, but **not** to seek on the second
column alone, because within the index the second column's values aren't sorted globally —
only sorted within each first-column value.

```sql
CREATE INDEX IX_Orders_CustomerId_OrderDate
    ON dbo.Orders (CustomerId, OrderDate);

-- Uses the index for a seek: filters on the leading column
SELECT OrderId, OrderDate
FROM dbo.Orders
WHERE CustomerId = 4210;

-- Also seeks: filters on both columns, in order
SELECT OrderId
FROM dbo.Orders
WHERE CustomerId = 4210 AND OrderDate >= '2026-01-01';

-- Cannot seek this index: OrderDate alone isn't a usable prefix
SELECT OrderId
FROM dbo.Orders
WHERE OrderDate >= '2026-01-01';
```

Put your most selective, most frequently filtered-alone column first. An index built
`(OrderDate, CustomerId)` would serve that last query well but force a scan for a
`CustomerId`-only filter — the same columns, the wrong order, a different result.

## Selectivity: is this column even worth indexing?

**Selectivity** is the fraction of distinct values a column has relative to the table's row
count. A column like `CustomerId` on an orders table, where nearly every value is unique
or near-unique, is *highly selective* — an index on it can jump straight to a handful of
matching rows. A column like `OrderStatus` with only four possible values across ten
million rows is *poorly selective* — an index seek would still return millions of rows,
and the optimizer will often prefer a scan anyway. Indexing a low-selectivity column as the
leading key rarely pays for itself; it costs write overhead on every insert/update without
meaningfully speeding up reads.

This is exactly where the systematic loop from Lesson 1 applies: don't index because a
column "seems important" — measure how selective it actually is, and how the queries that
filter on it are shaped, before you commit to a design.

## Key terms

| Term | Meaning |
|---|---|
| Clustered index | Determines the physical row order; the table itself, one per table |
| Nonclustered index | A separate, ordered structure of key columns plus a pointer back to the full row |
| Key Lookup | The extra trip back to the clustered index to fetch columns not in a nonclustered index |
| Leftmost-prefix rule | A composite index can be seeked on its leading column(s), not on a trailing column alone |
| Selectivity | The fraction of distinct values in a column; higher selectivity makes a better index candidate |

## Check yourself

You have a composite index `(Status, CreatedDate)` on a table with only three possible
`Status` values. A query filters only on `CreatedDate >= @cutoff`. Will this index be
seeked efficiently? Why or why not, and what would you change?
