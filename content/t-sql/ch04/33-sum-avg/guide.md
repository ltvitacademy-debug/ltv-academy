# Lesson 33 — SUM and AVG

**Chapter 4 · Grouping and Aggregating · Lesson 2 of 9**

## What you'll learn

- `SUM()` — totaling a numeric column
- `AVG()` — averaging a numeric column
- Both ignore `NULL`, just like `COUNT`
- Combining `SUM`/`AVG` with `WHERE`

## SUM — totaling a column

```sql
USE AdventureWorks2012;
GO

SELECT SUM(ListPrice) AS TotalListPrice
FROM Production.Product;
```

`SUM()` adds up every value in the specified column across all matching
rows, returning one total number.

## AVG — averaging a column

```sql
SELECT AVG(ListPrice) AS AverageListPrice
FROM Production.Product;
```

`AVG()` computes the mean — the sum divided by the count. It's not a
shortcut for writing `SUM(...) / COUNT(...)` yourself, though the math is
equivalent; `AVG()` is simply the direct, built-in way to get there.

## Both ignore NULL

Same behavior as `COUNT(column)` from Lesson 32: `SUM()` and `AVG()` skip
`NULL` values entirely rather than treating them as zero. This matters a
lot for `AVG()` specifically — if `AVG()` treated `NULL` as `0`, it would
pull the average down artificially. Skipping `NULL` means `AVG()` reflects
the true average of the values that actually **exist**.

```sql
-- If 50 products have a NULL Weight, AVG only averages the other rows
SELECT AVG(Weight) AS AverageWeight
FROM Production.Product;
```

## Combining with WHERE

`SUM` and `AVG` work on whatever rows survive filtering — `WHERE` still
runs first (Lesson 11), and the aggregate operates only on what's left:

```sql
SELECT AVG(ListPrice) AS AverageRedPrice
FROM Production.Product
WHERE Color = 'Red';
```

This computes the average price of **red** products only, not the whole
table.

## Key terms

| Term | Meaning |
|---|---|
| `SUM()` | Total of all non-`NULL` values in a column |
| `AVG()` | Mean of all non-`NULL` values in a column |

## Lab

Run each of these against AdventureWorks2012:

```sql
SELECT SUM(ListPrice) AS Total FROM Production.Product;
SELECT AVG(ListPrice) AS Average FROM Production.Product;
SELECT AVG(ListPrice) AS AverageRed FROM Production.Product WHERE Color = 'Red';
```

## Check yourself

You're ready for Lesson 34 when you can answer, without looking: do `SUM()`
and `AVG()` include `NULL` values as zero, and why does that matter
specifically for `AVG()`?
