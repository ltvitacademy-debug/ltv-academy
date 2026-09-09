# Lesson 64 — IF/ELSE

**Chapter 7 · Programming with T-SQL · Lesson 3 of 10**

## What you'll learn

- `IF`/`ELSE` — real control-flow branching, not a `SELECT`-level value
- How `IF`/`ELSE` differs from `CASE` (Chapter 1)
- Chaining multiple conditions with `ELSE IF`
- A practical example: conditional logic around a variable

## IF/ELSE vs. CASE — a crucial distinction

Recall from Lesson 7 that `CASE` is an **expression** — it evaluates to a
**value**, used inside a `SELECT`. `IF`/`ELSE` is completely different: it's
a **statement** that controls **which block of code actually runs**. You
can't put `IF` inside a `SELECT` list the way you can `CASE`; `IF` decides
between running one chunk of T-SQL or another entirely.

## Basic IF/ELSE

```sql
USE AdventureWorks2012;
GO

DECLARE @ProductCount INT;
SELECT @ProductCount = COUNT(*) FROM Production.Product;

IF @ProductCount > 500
    PRINT 'Large catalog';
ELSE
    PRINT 'Small catalog';
```

`IF` evaluates a condition — a predicate, exactly like `WHERE` (Lesson 20)
— and runs the statement immediately after it **only if** that condition
is `TRUE`. `ELSE` runs its statement **only if** the `IF` condition was
`FALSE`. `PRINT` (used here for the first time) simply outputs a message
to the Messages tab in SSMS — useful for this kind of demonstration and
for debugging scripts.

## Chaining conditions with ELSE IF

```sql
IF @ProductCount > 1000
    PRINT 'Very large catalog';
ELSE IF @ProductCount > 500
    PRINT 'Large catalog';
ELSE IF @ProductCount > 100
    PRINT 'Medium catalog';
ELSE
    PRINT 'Small catalog';
```

Each `ELSE IF` is checked **only if** every condition above it was false —
same top-to-bottom evaluation order you learned with searched `CASE`
(Lesson 8), just applied to control flow instead of a value.

## Where IF/ELSE really matters

`IF`/`ELSE` becomes essential once you start writing stored procedures
(Chapter 7's later lessons) and scripts that need to make real decisions —
"does this table already exist?", "did the previous step succeed?" —
rather than just shaping a result set.

## Key terms

| Term | Meaning |
|---|---|
| `IF`/`ELSE` | Statement-level branching — controls which code runs, not a value |
| `PRINT` | Outputs a message to the Messages tab |

## Lab

Run this against AdventureWorks2012:

```sql
DECLARE @AveragePrice MONEY;
SELECT @AveragePrice = AVG(ListPrice) FROM Production.Product;

IF @AveragePrice > 500
    PRINT 'Products are expensive on average';
ELSE
    PRINT 'Products are affordable on average';
```

## Check yourself

You're ready for Lesson 65 when you can answer, without looking: what's
the difference between `CASE` and `IF`/`ELSE`, and can `IF` be used inside
a `SELECT` list?
