# Lesson 79 — OVER() and PARTITION BY

**Chapter 9 · Window and Ranking Functions · Lesson 1 of 4**

## What you'll learn

- The `OVER()` clause — what makes a window function different
- `PARTITION BY` — a preview you've already used, explained properly
- Why window functions **don't** collapse rows, unlike `GROUP BY`
- Setting up for `ROW_NUMBER`, `RANK`, and `NTILE`

## The key difference from GROUP BY

`GROUP BY` (Chapter 4) **collapses** many rows into one summary row per
group. A **window function** does something different: it computes a
value **using** a group of related rows, but keeps **every original row**
in the output — nothing collapses.

## The OVER() clause

```sql
USE AdventureWorks2012;
GO

SELECT Name, Color, ListPrice,
       AVG(ListPrice) OVER (PARTITION BY Color) AS AvgPriceForColor
FROM Production.Product;
```

`OVER (...)` is what turns `AVG()` — an aggregate you already know from
Chapter 4 — into a **window function** here. Every single product row
still appears individually, but each one also shows the average price
**for its own color** alongside it. Compare that to plain `GROUP BY`,
which would collapse this down to one row per color and lose the
individual product rows entirely.

## PARTITION BY — you've already seen this

Lesson 51 previewed `PARTITION BY` to solve the duplicate-rows problem —
now it's time to understand it properly. `PARTITION BY` divides the rows
into groups (**partitions**), the same way `GROUP BY` does, but purely
for the purpose of the window function's calculation — the row-level
result set is completely unaffected.

```sql
SELECT Name, Color, ListPrice,
       COUNT(*) OVER (PARTITION BY Color) AS ProductsInThisColor
FROM Production.Product;
```

Every row shows how many products share **its own** color — a number
computed across the whole partition, attached to each individual row.

## Setting up for what's next

`OVER()` and `PARTITION BY` are the foundation the rest of this chapter
builds on. `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, and `NTILE()` — all
covered in the next three lessons — are themselves window functions, and
all of them use this exact same `OVER (PARTITION BY ...)` syntax you just
learned.

## Key terms

| Term | Meaning |
|---|---|
| Window function | Computes a value across related rows without collapsing the result set |
| `OVER()` | The clause that turns an aggregate into a window function |
| `PARTITION BY` | Divides rows into groups for the window function's calculation only |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Name, Color, ListPrice,
       AVG(ListPrice) OVER (PARTITION BY Color) AS AvgPriceForColor,
       ListPrice - AVG(ListPrice) OVER (PARTITION BY Color) AS DiffFromAvg
FROM Production.Product;
```

## Check yourself

You're ready for Lesson 80 when you can answer, without looking: what's
the key difference between `GROUP BY` and a window function using
`OVER()`, and what does `PARTITION BY` do inside `OVER()`?
