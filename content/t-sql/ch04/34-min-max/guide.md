# Lesson 34 — MIN and MAX

**Chapter 4 · Grouping and Aggregating · Lesson 3 of 9**

## What you'll learn

- `MIN()` and `MAX()` — the smallest and largest values in a column
- `MIN`/`MAX` work on text and dates too, not just numbers
- Both ignore `NULL`, same as every aggregate so far

## MIN and MAX on numbers

```sql
USE AdventureWorks2012;
GO

SELECT MIN(ListPrice) AS CheapestPrice, MAX(ListPrice) AS MostExpensivePrice
FROM Production.Product;
```

`MIN()` returns the smallest value in the column across all matching rows;
`MAX()` returns the largest. Both can appear in the same `SELECT`, just
like any two aggregate functions.

## MIN and MAX on text

`MIN`/`MAX` aren't limited to numbers — on text, they follow alphabetical
order:

```sql
SELECT MIN(LastName) AS FirstAlphabetically, MAX(LastName) AS LastAlphabetically
FROM Person.Person;
```

`MIN(LastName)` returns whichever last name sorts earliest alphabetically;
`MAX(LastName)` returns whichever sorts latest.

## MIN and MAX on dates

Just like the comparison operators from Lesson 12, `MIN`/`MAX` treat dates
the same way as numbers — earlier is "smaller":

```sql
SELECT MIN(OrderDate) AS EarliestOrder, MAX(OrderDate) AS LatestOrder
FROM Sales.SalesOrderHeader;
```

## Both ignore NULL

Consistent with `COUNT`, `SUM`, and `AVG`: `MIN()` and `MAX()` skip `NULL`
values when scanning for the extreme. A `NULL` can never "win" as the
minimum or maximum, because it isn't a comparable value at all — this
follows directly from Lesson 16.

## Key terms

| Term | Meaning |
|---|---|
| `MIN()` | The smallest non-`NULL` value in a column |
| `MAX()` | The largest non-`NULL` value in a column |

## Lab

Run each of these against AdventureWorks2012:

```sql
SELECT MIN(ListPrice) AS Cheapest, MAX(ListPrice) AS MostExpensive
FROM Production.Product;

SELECT MIN(LastName) AS FirstAlphabetically, MAX(LastName) AS LastAlphabetically
FROM Person.Person;

SELECT MIN(OrderDate) AS EarliestOrder, MAX(OrderDate) AS LatestOrder
FROM Sales.SalesOrderHeader;
```

## Check yourself

You're ready for Lesson 35 when you can answer, without looking: do
`MIN`/`MAX` work on text and dates, not just numbers, and what happens to
`NULL` values when SQL Server looks for the minimum or maximum?
