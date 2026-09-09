# Lesson 38 — UNION vs. UNION ALL

**Chapter 4 · Grouping and Aggregating · Lesson 7 of 9**

## What you'll learn

- `UNION` — stacking the results of two queries into one result set
- The rules: same number of columns, compatible types
- `UNION` removes duplicates; `UNION ALL` doesn't
- Why `UNION ALL` is faster, and when that matters

## Stacking two queries

`JOIN` combines tables **side by side** (more columns). `UNION` combines
query results **top to bottom** (more rows):

```sql
USE AdventureWorks2012;
GO

SELECT FirstName, LastName FROM Person.Person WHERE LastName LIKE 'A%'
UNION
SELECT FirstName, LastName FROM Person.Person WHERE LastName LIKE 'Z%';
```

Both queries return `FirstName, LastName` — `UNION` stacks their rows into
one combined result set.

## The rules

Every query combined with `UNION` must return:
- **The same number of columns**
- Columns in **compatible data types**, in the same position

Column **names** in the final result come from the **first** query — the
second query's column aliases are ignored.

## UNION removes duplicates; UNION ALL doesn't

This is the entire distinction between the two:

```sql
-- UNION: removes any duplicate rows across both result sets
SELECT Color FROM Production.Product
UNION
SELECT Color FROM Production.ProductCategory;

-- UNION ALL: keeps every row, duplicates included
SELECT Color FROM Production.Product
UNION ALL
SELECT Color FROM Production.ProductCategory;
```

`UNION` behaves like adding an implicit `DISTINCT` (Lesson 9) across the
combined result. `UNION ALL` skips that step entirely and just
concatenates everything.

## Why this matters for performance

Removing duplicates means SQL Server has to **compare every row against
every other row** to find matches — real, non-trivial work. `UNION ALL`
skips that comparison entirely, so it's **always at least as fast**, often
significantly faster on large result sets. **Default to `UNION ALL`**
unless you specifically need duplicates removed — don't pay for
deduplication you don't actually need.

## Key terms

| Term | Meaning |
|---|---|
| `UNION` | Stacks two result sets, removing duplicate rows |
| `UNION ALL` | Stacks two result sets, keeping every row including duplicates |

## Lab

Run both queries below against AdventureWorks2012 and compare their row
counts:

```sql
SELECT Color FROM Production.Product WHERE Color IS NOT NULL
UNION
SELECT 'Red' AS Color;

SELECT Color FROM Production.Product WHERE Color IS NOT NULL
UNION ALL
SELECT 'Red' AS Color;
```

## Check yourself

You're ready for Lesson 39 when you can answer, without looking: what's
the one functional difference between `UNION` and `UNION ALL`, and which
one should you default to for performance?
