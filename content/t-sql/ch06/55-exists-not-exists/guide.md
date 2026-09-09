# Lesson 55 — EXISTS and NOT EXISTS

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 4 of 10**

## What you'll learn

- `EXISTS` — testing whether a subquery returns **any** rows at all
- Why `EXISTS` doesn't care **what** the subquery returns, only **whether**
- `NOT EXISTS` as the safe fix for Lesson 53's `NOT IN` NULL trap
- Why `EXISTS` typically outperforms `IN`

## EXISTS — does anything match?

```sql
USE AdventureWorks2012;
GO

SELECT p.Name
FROM Production.Product AS p
WHERE EXISTS (
    SELECT 1
    FROM Sales.SalesOrderDetail AS sod
    WHERE sod.ProductID = p.ProductID
);
```

`EXISTS (subquery)` returns `TRUE` if the subquery returns **at least one
row**, and `FALSE` if it returns **none**. Notice the subquery selects a
meaningless literal, `1` — this is a T-SQL convention, because `EXISTS`
never actually looks at **what columns** the subquery returns, only
**whether any row comes back at all**. `SELECT 1`, `SELECT *`, and
`SELECT ProductID` are all functionally identical inside an `EXISTS`
subquery.

## NOT EXISTS — the safe alternative to NOT IN

Recall Lesson 53's `NOT IN` `NULL` trap — a single `NULL` in the
subquery's results silently breaks the whole comparison. `NOT EXISTS`
doesn't have this problem, because it never compares individual values at
all — it only asks "did **any** row match?":

```sql
SELECT p.Name
FROM Production.Product AS p
WHERE NOT EXISTS (
    SELECT 1
    FROM Sales.SalesOrderDetail AS sod
    WHERE sod.ProductID = p.ProductID
);
```

This finds every product that has **never** appeared in a sales order —
safely, regardless of any `NULL`s that might exist in either table. **This
course's rule: prefer `NOT EXISTS` over `NOT IN` whenever the subquery's
column might contain `NULL`** (which is most of the time, unless you've
specifically verified otherwise).

## Why EXISTS often performs better

Because `EXISTS` can stop scanning the moment it finds **one** matching
row — it doesn't need to enumerate every match like `IN` effectively does
— it's often the faster choice for large tables, on top of being safer
around `NULL`. We'll measure this properly in the Performance Tuning
chapter.

## Key terms

| Term | Meaning |
|---|---|
| `EXISTS` | `TRUE` if the subquery returns at least one row, regardless of its columns |
| `NOT EXISTS` | The safe alternative to `NOT IN` — no `NULL` trap |

## Lab

Run this against AdventureWorks2012 and compare it to Lesson 53's
`NOT IN` example (also finding unsold products):

```sql
SELECT p.Name
FROM Production.Product AS p
WHERE NOT EXISTS (
    SELECT 1 FROM Sales.SalesOrderDetail AS sod
    WHERE sod.ProductID = p.ProductID
);
```

## Check yourself

You're ready for Lesson 56 when you can answer, without looking: does
`EXISTS` care what columns the subquery returns, and why is `NOT EXISTS`
safer than `NOT IN`?
