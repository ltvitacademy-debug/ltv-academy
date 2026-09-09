# Lesson 19 — TOP WITH TIES

**Chapter 2 · Filtering and Sorting · Lesson 9 of 10**

## What you'll learn

- The problem plain `TOP` has with tied values
- `WITH TIES` — including every row tied at the cutoff
- Why `WITH TIES` requires `ORDER BY`
- When to use it

## The problem: an arbitrary cutoff

`TOP` from Lesson 18 cuts off at an exact row count, even if that means
splitting a group of tied values arbitrarily:

```sql
USE AdventureWorks2012;
GO

SELECT TOP 5 Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

Imagine the 5th and 6th most expensive products are both priced at exactly
`$3,578.27` — a genuine tie. Plain `TOP 5` picks **one** of them, somewhat
arbitrarily, and drops the other. That's rarely what you actually want when
reporting "the most expensive products."

## The fix: WITH TIES

```sql
SELECT TOP 5 WITH TIES Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

`WITH TIES` returns the top 5 **plus** any additional rows that tie with
the value at row 5. If three products are tied for 5th place, all three
come back — meaning the query can return more than 5 rows.

## WITH TIES requires ORDER BY

This makes sense once you think it through: "ties" only means something
relative to a sort order. `TOP ... WITH TIES` **cannot** be used without an
`ORDER BY` — SQL Server will raise an error if you try.

## When to use it

`WITH TIES` is the right choice whenever "top N" is being used for a
genuine ranking or leaderboard, and arbitrarily dropping a tied value would
misrepresent the data — think "top 10 highest-paid employees" where several
people share a salary. For a query that just needs *roughly* N sample rows,
plain `TOP` is fine.

## Key terms

| Term | Meaning |
|---|---|
| `WITH TIES` | Includes every row tied with the value at the cutoff position |

## Lab

Run this against AdventureWorks2012 and compare the row count to plain
`TOP 5`:

```sql
SELECT TOP 5 WITH TIES Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

## Check yourself

You're ready for Lesson 20 when you can answer, without looking: what
problem does `WITH TIES` solve, and why does it require `ORDER BY`?
