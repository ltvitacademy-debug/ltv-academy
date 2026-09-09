# Lesson 53 — Multi-Value Subqueries

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 2 of 10**

## What you'll learn

- Multi-value subqueries — returning a list, not a single value
- Using `IN` with a subquery instead of a hard-coded list
- Why this reads naturally: "value IN (this query's results)"
- `NOT IN` with a subquery, and its `NULL` trap

## The problem: a hard-coded list goes stale

Recall `IN` from Lesson 15 — a hard-coded list of values:

```sql
SELECT Name FROM Production.Product WHERE ProductSubcategoryID IN (1, 2, 3);
```

This works, but `1, 2, 3` is frozen at the moment you wrote it. If
subcategories are added or removed, this query silently goes stale.

## The fix: a subquery in place of the list

```sql
USE AdventureWorks2012;
GO

SELECT Name, ProductSubcategoryID
FROM Production.Product
WHERE ProductSubcategoryID IN (
    SELECT ProductSubcategoryID
    FROM Production.ProductSubcategory
    WHERE Name LIKE 'Mountain%'
);
```

Instead of a fixed list, the inner query **generates** the list dynamically
— every subcategory ID whose name starts with `'Mountain'`. As the data
changes, this query automatically stays correct, no hard-coded numbers to
maintain.

## Reading it naturally

Read `IN (subquery)` as plain English: "where `ProductSubcategoryID` is
**in** the set of values this inner query returns." Unlike the scalar
subquery from Lesson 52, this one can return **any number of rows** — `IN`
is built to handle a list.

## NOT IN and its NULL trap

`NOT IN` works the same way, with one serious gotcha: if the subquery's
result set contains **even one `NULL`**, the entire `NOT IN` comparison
returns **no rows** — silently, with no error:

```sql
-- DANGEROUS if ProductSubcategoryID can be NULL in Product
SELECT Name
FROM Production.Product
WHERE ProductSubcategoryID NOT IN (
    SELECT ProductSubcategoryID FROM Production.ProductSubcategory
);
```

This traces back to Lesson 16: `NULL` means unknown, and "is this value
NOT equal to unknown?" can never be resolved to `TRUE`. The safe fix
(preview of Lesson 55) is `NOT EXISTS` instead of `NOT IN` whenever `NULL`
is a possibility.

## Key terms

| Term | Meaning |
|---|---|
| Multi-value subquery | A subquery that can return any number of rows |
| `IN (subquery)` | Matches any row where the column equals one of the subquery's results |
| `NOT IN` NULL trap | A single `NULL` in the subquery's results silently makes `NOT IN` match nothing |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Name
FROM Production.Product
WHERE ProductSubcategoryID IN (
    SELECT ProductSubcategoryID
    FROM Production.ProductSubcategory
    WHERE Name LIKE 'Road%'
);
```

## Check yourself

You're ready for Lesson 54 when you can answer, without looking: how many
rows can a multi-value subquery return, and why is `NOT IN` risky when the
subquery's results might contain `NULL`?
