# Lesson 9 — DISTINCT

**Chapter 1 · T-SQL Foundations · Lesson 9 of 10**

## What you'll learn

- What `DISTINCT` does and where it goes in a `SELECT`
- `DISTINCT` on one column vs. multiple columns
- Why `DISTINCT` considers the *whole row*, not each column separately
- `DISTINCT` vs. `GROUP BY` — a preview of Chapter 4

## What DISTINCT does

`SELECT` normally returns every matching row, duplicates included.
`DISTINCT` removes duplicate rows from the result set:

```sql
USE AdventureWorks2012;
GO

SELECT Color
FROM Production.Product;
```

Run this and you'll see the same color repeated many times — once per
product. Add `DISTINCT`, right after `SELECT`:

```sql
SELECT DISTINCT Color
FROM Production.Product;
```

Now each color appears exactly once, no matter how many products share it.

## DISTINCT on multiple columns

`DISTINCT` applies to the **entire combination** of columns you select, not
each column independently:

```sql
SELECT DISTINCT Color, Size
FROM Production.Product;
```

This doesn't return every distinct color and every distinct size separately
— it returns every distinct *color-and-size pairing* that actually exists in
the table. `Red, Large` and `Red, Small` are two different rows here, even
though both share the color `Red`.

## A common mistake

`DISTINCT` only removes rows that are **completely identical** across every
selected column. Adding a column that varies row-to-row — like a primary key
— defeats `DISTINCT` entirely, because now every row is unique again:

```sql
-- This returns EVERY row, because ProductID makes every row unique
SELECT DISTINCT ProductID, Color
FROM Production.Product;
```

If your goal is genuinely unique colors, don't select any column that varies
per row alongside it.

## DISTINCT vs. GROUP BY

`DISTINCT` and `GROUP BY` (Chapter 4) can sometimes produce the same result,
but they answer different questions. `DISTINCT` says "remove duplicate rows."
`GROUP BY` says "collapse rows into groups so I can *aggregate* them" —
counting, summing, averaging within each group. We'll draw this line clearly
once you've seen `GROUP BY` in action.

## Key terms

| Term | Meaning |
|---|---|
| `DISTINCT` | Removes duplicate rows from the result set |
| Row-level uniqueness | `DISTINCT` compares the full combination of selected columns, not each column alone |

## Lab

Run all three of these against AdventureWorks2012 and compare row counts:

```sql
SELECT Color FROM Production.Product;
SELECT DISTINCT Color FROM Production.Product;
SELECT DISTINCT Color, Size FROM Production.Product;
```

## Check yourself

You're ready for Lesson 10 when you can answer, without looking: does
`DISTINCT` remove duplicates per column or per whole row, and what happens
if you add a primary key column to a `DISTINCT` query?
