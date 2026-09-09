# Lesson 32 — COUNT

**Chapter 4 · Grouping and Aggregating · Lesson 1 of 9**

## What you'll learn

- What an aggregate function is
- `COUNT(*)` vs. `COUNT(column)`
- Why `COUNT(column)` ignores `NULL`
- `COUNT(DISTINCT column)`

## What is an aggregate function?

Every function you've used so far (`ISNULL`, string functions) operates on
**one row at a time**. An **aggregate function** is different: it takes an
**entire set of rows** and collapses them into a **single value** —
a count, a sum, an average. `COUNT` is the simplest and most common one.

## COUNT(*) — count every row

```sql
USE AdventureWorks2012;
GO

SELECT COUNT(*) AS TotalProducts
FROM Production.Product;
```

`COUNT(*)` counts **every row**, regardless of any `NULL` values in any
column. This is the version to reach for when you just want "how many
rows."

## COUNT(column) — count non-NULL values

```sql
SELECT COUNT(Color) AS ProductsWithColor
FROM Production.Product;
```

This is different from `COUNT(*)`: `COUNT(column)` only counts rows where
**that specific column** is **not** `NULL`. If 200 products have no color
recorded, `COUNT(Color)` will be 200 less than `COUNT(*)` on the same
table. This ties directly back to Lesson 16 — `NULL` means "unknown," and
aggregate functions consistently skip it rather than treating it as a
value to count.

## COUNT(DISTINCT column)

Combine `COUNT` with `DISTINCT` (Lesson 9) to count **unique** non-`NULL`
values instead of every occurrence:

```sql
SELECT COUNT(DISTINCT Color) AS UniqueColors
FROM Production.Product;
```

If 20 products are red, `COUNT(Color)` counts all 20, but
`COUNT(DISTINCT Color)` counts `'Red'` only once.

## Key terms

| Term | Meaning |
|---|---|
| Aggregate function | A function collapsing a set of rows into a single value |
| `COUNT(*)` | Counts every row, `NULL`s included |
| `COUNT(column)` | Counts only non-`NULL` values in that column |
| `COUNT(DISTINCT column)` | Counts unique non-`NULL` values |

## Lab

Run each of these against AdventureWorks2012 and compare the three
numbers:

```sql
SELECT COUNT(*) AS AllRows FROM Production.Product;
SELECT COUNT(Color) AS NonNullColors FROM Production.Product;
SELECT COUNT(DISTINCT Color) AS UniqueColors FROM Production.Product;
```

## Check yourself

You're ready for Lesson 33 when you can answer, without looking: why is
`COUNT(*)` usually a different number than `COUNT(column)` on the same
table, and what does `COUNT(DISTINCT column)` add on top of that?
