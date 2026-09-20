# Covering Indexes

Lesson 12 introduced the Key Lookup: the extra trip back to the clustered index whenever
a nonclustered index doesn't hold every column a query needs. This lesson names the fix
directly — a **covering index** — and shows how to spot one in a plan and design one on
purpose.

## What you'll learn

- What makes an index "covering" for a specific query
- How to spot a Key Lookup in an execution plan and read what it's costing you
- The tradeoff a covering index always makes: faster reads, heavier writes

## A covering index holds everything the query asks for

An index **covers** a query when every column referenced anywhere in that query — in the
`SELECT` list, the `WHERE` clause, `JOIN` conditions, `ORDER BY`, everywhere — is available
directly from the index itself, whether as a key column or an included column (Lesson 14
covers included columns specifically). When that's true, SQL Server never needs to touch
the clustered index at all; the nonclustered index alone answers the whole query.

```sql
-- Query
SELECT OrderId, OrderDate, TotalDue
FROM dbo.Orders
WHERE CustomerId = 4210;

-- This index does NOT cover the query — TotalDue isn't in it,
-- so every matching row triggers a Key Lookup
CREATE INDEX IX_Orders_CustomerId
    ON dbo.Orders (CustomerId);

-- This index DOES cover it — every referenced column is present
CREATE INDEX IX_Orders_CustomerId_Covering
    ON dbo.Orders (CustomerId)
    INCLUDE (OrderDate, TotalDue);
```

## Spotting the difference in a plan

In Chapter 2 you learned to read operators by their relative cost. A plan for the
non-covering version shows an **Index Seek** feeding into a **Key Lookup**, joined by a
**Nested Loops** operator — one lookup per row the seek returns. For a handful of rows
that's negligible; for a report scanning thousands of customers, the Key Lookups can
dominate the plan's total cost far more than the seek itself did. The covering version's
plan is simpler: a single Index Seek, no lookup, no nested loop joining them back together.
That structural difference — one operator instead of three — is the visible signature of
"covering" in a plan.

## The tradeoff: every included column has a cost

A covering index isn't free. Every key or included column widens the index, which means:

- More disk space, since the index leaf pages carry more data per row.
- More write cost, because every `INSERT`, `UPDATE` on a covered column, or `DELETE`
  has to maintain this wider structure too.
- Slower index maintenance operations (rebuilds, reorganizes) on a larger structure.

The right call is query-driven, not reflexive: cover the handful of queries that run
constantly and matter for performance — a dashboard query hit every few seconds, not a
one-off report run monthly. Widening an index to cover a rarely-run query is spending real,
ongoing write cost for savings you'll almost never collect.

## Key terms

| Term | Meaning |
|---|---|
| Covering index | An index containing every column a specific query needs, avoiding a Key Lookup entirely |
| Key Lookup | The plan operator representing a trip back to the clustered index for missing columns |
| Nested Loops | The join operator typically pairing an Index Seek with its per-row Key Lookup |
| Write amplification | The added cost to INSERT/UPDATE/DELETE from maintaining a wider covering index |

## Check yourself

A report query runs once a month and currently triggers a Key Lookup for every row. A
dashboard query runs every five seconds and also triggers one. You can only widen one
index to make it covering without blowing past your storage budget. Which do you cover,
and why?
