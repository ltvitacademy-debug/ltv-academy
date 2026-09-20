# Filtered Indexes

Every index built so far in this chapter has indexed every row in the table. But most
tables have a subset of rows that get queried constantly and a much larger set that almost
never do — active orders vs. years of archived ones, open tickets vs. closed ones. A
**filtered index** lets you index just the subset that matters, and it's smaller, cheaper,
and often more useful than a full-table index ever could be.

## What you'll learn

- The real `CREATE INDEX ... WHERE ...` syntax and what it actually stores
- The classic use case: indexing only active or non-NULL rows in a large table
- Why the optimizer can only use a filtered index when the query's filter matches

## The syntax: WHERE on the index, not just the query

```sql
-- A large orders table where 95% of rows are years-old and archived,
-- but every dashboard query only cares about open orders
CREATE INDEX IX_Orders_Active
    ON dbo.Orders (CustomerId, OrderDate)
    WHERE Status = 'Open';
```

This index contains **only** the rows where `Status = 'Open'` — if 95% of the table is
archived, this index might be a tiny fraction of the size of a full-table index on the
same columns. A smaller index means less disk space, faster maintenance, and — because
the whole thing is more likely to fit in the buffer pool — faster reads for the rows that
are actually indexed.

## The classic case: indexing non-NULL or "interesting" rows

Filtered indexes shine on columns where most rows share one uninteresting value and a
small minority hold the value you actually query for:

```sql
-- Only a small fraction of orders are ever cancelled;
-- reporting on cancellations shouldn't need to scan the whole table
CREATE INDEX IX_Orders_CancelledReason
    ON dbo.Orders (CancelledDate)
    INCLUDE (CancelledReason)
    WHERE CancelledReason IS NOT NULL;
```

A full-table index here would carry millions of rows where `CancelledReason` is `NULL` and
contributes nothing to any query that actually cares about cancellations. The filtered
index carries only the rows worth indexing — smaller, and more selective by construction
than an unfiltered index on the same column could ever be.

## The optimizer only uses it when the filter matches

A filtered index can only satisfy a query whose `WHERE` clause is *provably* a subset of
the index's filter. SQL Server has to be able to guarantee, from the query text itself,
that every row the query could match is also covered by the index's `WHERE`.

```sql
-- Uses the filtered index above: Status = 'Open' matches exactly
SELECT OrderId, OrderDate
FROM dbo.Orders
WHERE CustomerId = 4210 AND Status = 'Open';

-- Cannot use it: 'Open' isn't provably the only status this query wants
SELECT OrderId, OrderDate
FROM dbo.Orders
WHERE CustomerId = 4210;
```

This is also why filtered indexes pair awkwardly with parameterized queries in some cases —
if a stored procedure passes `@Status` as a parameter rather than the literal `'Open'`, the
optimizer often can't prove the match at compile time and may not use the filtered index at
all. Know your actual query shapes before designing around this.

## Key terms

| Term | Meaning |
|---|---|
| Filtered index | A nonclustered index built over only the rows matching a WHERE predicate |
| Filter predicate | The WHERE condition on the index itself, evaluated at index build/maintenance time |
| Provable subset | The requirement that a query's WHERE clause be guaranteed a subset of the index's filter for the optimizer to use it |

## Check yourself

A table has a `IsDeleted` bit column where 99% of rows are `0` (active) and 1% are `1`
(soft-deleted). Every application query filters `WHERE IsDeleted = 0`. Design a filtered
index that helps, and explain why it beats an unfiltered index on the same columns.
