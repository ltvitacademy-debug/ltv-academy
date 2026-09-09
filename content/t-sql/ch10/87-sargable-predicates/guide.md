# Lesson 87 — SARGable vs. Non-SARGable WHERE Clauses

**Chapter 10 · Performance Tuning · Lesson 5 of 12**

## What you'll learn

- What "SARGable" means — a predicate that can actually use an index
- The classic mistake: wrapping a column in a function
- Rewriting a non-SARGable predicate into a SARGable one
- Why this matters more as tables grow

## What does "SARGable" mean?

**SARGable** ("Search ARGument-able") describes a `WHERE` condition
**SQL Server can use an index to satisfy directly**, without having to
check **every row** in the table one by one. A non-SARGable predicate
forces a full **table scan** even when a perfectly good index exists on
that column.

## The classic mistake: functions on the column

```sql
-- NON-SARGABLE: the function wraps the COLUMN
SELECT Name, ListPrice
FROM Production.Product
WHERE YEAR(SellStartDate) = 2013;
```

Even if `SellStartDate` has an index, wrapping it in `YEAR(...)` forces
SQL Server to compute `YEAR(SellStartDate)` for **every single row**
before it can compare against `2013` — the index on the raw column
becomes useless, because the index stores actual dates, not
year-extracted values.

## The SARGable rewrite

```sql
-- SARGABLE: the column itself is untouched
SELECT Name, ListPrice
FROM Production.Product
WHERE SellStartDate >= '2013-01-01' AND SellStartDate < '2014-01-01';
```

This asks the **exact same** logical question — "was this in 2013?" —
but leaves `SellStartDate` itself untouched in the comparison. Now SQL
Server **can** use an index on `SellStartDate` to jump directly to the
matching range, instead of scanning everything.

## Other common non-SARGable patterns

```sql
-- NON-SARGABLE: function on the column
WHERE UPPER(LastName) = 'SMITH';

-- SARGABLE alternative: compare against the literal instead
WHERE LastName = 'Smith'; -- relying on case-insensitive collation, Lesson 11

-- NON-SARGABLE: leading wildcard
WHERE LastName LIKE '%son';

-- Often unavoidable for a genuine "contains" or "ends with" search —
-- a leading % prevents an efficient index range scan.
```

The common thread: **anything that transforms the column itself** before
comparing it (a function call, a leading wildcard) blocks the index from
being used efficiently. Transforming the **comparison value** instead
(like the date-range rewrite) keeps the column SARGable.

## Why this matters more as tables grow

On a small table, a non-SARGable predicate is barely noticeable — a full
scan of 500 rows is instant either way. On a table with millions of
rows, the same non-SARGable predicate can turn a sub-second query into
one that takes minutes, purely from that one wrapped column.

## Key terms

| Term | Meaning |
|---|---|
| SARGable | A predicate that can use an index directly |
| Non-SARGable | A predicate that forces a full scan, even with an index present |

## Lab

Run both versions of the date-range example against AdventureWorks2012
and compare their execution plans (Lesson 90 covers reading these
properly) if you're able to view them.

## Check yourself

You're ready for Lesson 88 when you can answer, without looking: what
makes a predicate non-SARGable, and how do you rewrite
`WHERE YEAR(SellStartDate) = 2013` into a SARGable equivalent?
