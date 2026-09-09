# Lesson 80 — ROW_NUMBER

**Chapter 9 · Window and Ranking Functions · Lesson 2 of 4**

## What you'll learn

- `ROW_NUMBER()` — assigning a unique sequential number per row
- Why `ORDER BY` inside `OVER()` is required for `ROW_NUMBER`
- Combining `PARTITION BY` and `ORDER BY` together
- Revisiting Lesson 51's deduplication technique, now fully explained

## ROW_NUMBER — a running count

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice,
       ROW_NUMBER() OVER (ORDER BY ListPrice DESC) AS PriceRank
FROM Production.Product;
```

`ROW_NUMBER()` assigns each row a **unique**, sequential integer — `1`,
`2`, `3`, and so on — based on the order specified inside `OVER()`. Here,
the most expensive product gets `1`, the second most expensive gets `2`,
and so on. Unlike Lesson 79's `AVG()`/`COUNT()` examples, `ROW_NUMBER()`
**requires** an `ORDER BY` inside `OVER()` — without an order, "which row
is first" is undefined.

## Combining with PARTITION BY

```sql
SELECT Name, Color, ListPrice,
       ROW_NUMBER() OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS RankInColor
FROM Production.Product;
```

Adding `PARTITION BY Color` makes the numbering **restart at 1 for each
color** — this finds the most expensive product **within each color**,
not across the whole table. `PARTITION BY` and `ORDER BY` work together
inside the same `OVER()`: partition defines the groups, order defines the
sequence within each group.

## Revisiting Lesson 51

Lesson 51 used exactly this pattern to find and delete duplicate rows:

```sql
SELECT *,
       ROW_NUMBER() OVER (PARTITION BY FirstName, LastName, EmailPromotion
                           ORDER BY BusinessEntityID) AS RowNum
FROM Person.Person;
```

Now that you've seen `OVER()`/`PARTITION BY` properly (Lesson 79) and
`ROW_NUMBER()` on its own, this makes complete sense: each group of
duplicate rows gets numbered `1, 2, 3...`, and anything past `1` is, by
definition, a repeat.

## A crucial property: no ties

`ROW_NUMBER()` always produces **unique** numbers, even when rows are
tied on the `ORDER BY` column — one of two tied rows arbitrarily gets a
lower number than the other. If you need tied rows to receive the **same**
number, that's exactly what Lesson 81's `RANK()` and `DENSE_RANK()` solve.

## Key terms

| Term | Meaning |
|---|---|
| `ROW_NUMBER()` | Assigns a unique sequential number per row, based on `ORDER BY` inside `OVER()` |

## Lab

Run this against AdventureWorks2012 and confirm the numbering restarts
for each color:

```sql
SELECT Name, Color, ListPrice,
       ROW_NUMBER() OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS RankInColor
FROM Production.Product
ORDER BY Color, RankInColor;
```

## Check yourself

You're ready for Lesson 81 when you can answer, without looking: why
does `ROW_NUMBER()` require an `ORDER BY` inside `OVER()`, and what
happens to tied rows?
