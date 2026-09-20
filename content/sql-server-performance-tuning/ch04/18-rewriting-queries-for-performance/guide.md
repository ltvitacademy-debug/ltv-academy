# Rewriting Queries for Performance

Chapter 3 tuned the indexes underneath your queries. This chapter tunes the queries
themselves — starting with the most common, highest-payoff rewrite category: making a
predicate **sargable**, so the optimizer can actually use the indexes you just built.

## What you'll learn

- What "sargable" means and why it's the single most important query-shape concept here
- Why wrapping a column in a function silently blocks an index seek
- Why `SELECT *` costs more than it looks like, beyond just readability

## Sargable: can the optimizer use an index to satisfy this predicate?

**Sargable** (from "Search ARGument ABLE") describes a predicate the optimizer can use
directly against an index — a seek, not a scan. The moment you wrap an indexed column in
a function, cast, or expression, you usually make that predicate non-sargable: SQL Server
can no longer compute the function's result per-row *before* deciding which rows to
touch, so it has to evaluate every row first, which means a scan.

```sql
-- NON-sargable: OrderDate is wrapped in a function.
-- SQL Server must compute YEAR(OrderDate) for every row to check the filter —
-- the index on OrderDate can't be seeked.
SELECT OrderId
FROM dbo.Orders
WHERE YEAR(OrderDate) = 2026;

-- Sargable: an equivalent range predicate on the raw column.
-- The optimizer can seek directly into the index.
SELECT OrderId
FROM dbo.Orders
WHERE OrderDate >= '2026-01-01' AND OrderDate < '2027-01-01';
```

Same result set, same underlying data — a completely different plan. This exact pattern
(date-part functions, `LEFT()`/`SUBSTRING()` on strings, arithmetic on a numeric column)
is the single most common self-inflicted performance problem in real T-SQL codebases.

## Implicit conversions do the same damage silently

A closely related trap: comparing columns of different data types forces SQL Server to
convert one side, and depending on data type precedence rules, that conversion sometimes
has to happen *per row on the indexed column* rather than once on the literal — silently
turning a seek into a scan with no function visibly wrapping anything.

```sql
-- OrderNumber is nvarchar; comparing it to an int literal can force
-- a conversion on the column side depending on type precedence
SELECT OrderId
FROM dbo.Orders
WHERE OrderNumber = 100245;       -- risky: implicit conversion

SELECT OrderId
FROM dbo.Orders
WHERE OrderNumber = '100245';     -- matches the column's actual type
```

Lesson 20 covers implicit conversions as an anti-pattern in more depth; the fix here is the
same principle as sargability: keep the indexed column bare, and put any type-matching
work on the literal or parameter side instead.

## SELECT * costs more than readability

`SELECT *` isn't just a style complaint. It pulls every column regardless of whether the
query needs them, which (a) very often defeats a covering index built for the query's real
column list, forcing a Key Lookup or a wider scan, and (b) moves more data across the
network and into the client than necessary, on every single execution. Naming exact
columns lets a covering index (Lesson 13) actually cover the query, and it lets you *know*
what a query depends on when the table's schema changes later.

```sql
-- Defeats a covering index that only includes OrderDate, TotalDue
SELECT * FROM dbo.Orders WHERE CustomerId = 4210;

-- Matches the covering index exactly
SELECT OrderId, OrderDate, TotalDue FROM dbo.Orders WHERE CustomerId = 4210;
```

## Key terms

| Term | Meaning |
|---|---|
| Sargable | A predicate shaped so the optimizer can use an index seek directly, without evaluating a function per row |
| Non-sargable | A predicate wrapping an indexed column in a function/expression, typically forcing a scan |
| Implicit conversion | An automatic data-type conversion SQL Server performs during comparison, sometimes applied per-row on the indexed column |
| SELECT * | Selecting every column regardless of need, which can defeat covering indexes and increase data transfer |

## Check yourself

A query filters `WHERE CAST(CustomerId AS varchar(10)) = '4210'` on a table with an index
on `CustomerId` (an int column). Is this predicate sargable? Rewrite it so the index can be
seeked.
