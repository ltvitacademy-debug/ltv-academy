# Lesson 15 — IN and BETWEEN

**Chapter 2 · Filtering and Sorting · Lesson 5 of 10**

## What you'll learn

- `IN` — a shorthand for a long chain of `OR` conditions
- `BETWEEN` — an inclusive range shorthand
- `NOT IN` and `NOT BETWEEN`
- Why `BETWEEN` is inclusive on both ends

## IN — shorthand for multiple ORs

Compare this to Lesson 13's `OR` example:

```sql
USE AdventureWorks2012;
GO

-- The long way
SELECT Name, Color
FROM Production.Product
WHERE Color = 'Red' OR Color = 'Blue' OR Color = 'Black';

-- The IN way — same result
SELECT Name, Color
FROM Production.Product
WHERE Color IN ('Red', 'Blue', 'Black');
```

`IN` takes a comma-separated list and matches any row where the column
equals **any one** of the listed values. It's not a new capability — it's
purely a cleaner way to write what would otherwise be a long `OR` chain.

## NOT IN

```sql
SELECT Name, Color
FROM Production.Product
WHERE Color NOT IN ('Red', 'Blue', 'Black');
```

Matches every row **except** those with a listed color.

## BETWEEN — an inclusive range

```sql
SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN 50 AND 100;
```

`BETWEEN low AND high` is shorthand for `column >= low AND column <= high`.
Crucially, **both ends are included** — a product priced at exactly `$50`
or exactly `$100` matches this condition.

## BETWEEN works on dates too

```sql
SELECT SalesOrderID, OrderDate
FROM Sales.SalesOrderHeader
WHERE OrderDate BETWEEN '2013-01-01' AND '2013-12-31';
```

## NOT BETWEEN

```sql
SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice NOT BETWEEN 50 AND 100;
```

## Key terms

| Term | Meaning |
|---|---|
| `IN` | Matches any value in a comma-separated list — shorthand for chained `OR` |
| `BETWEEN` | Matches an inclusive range — shorthand for `>=` and `<=` combined |
| Inclusive | Both boundary values themselves count as matches |

## Lab

Run each of these against AdventureWorks2012:

```sql
SELECT Name, Color FROM Production.Product WHERE Color IN ('Red', 'Silver');
SELECT Name, ListPrice FROM Production.Product WHERE ListPrice BETWEEN 100 AND 200;
SELECT Name, ListPrice FROM Production.Product WHERE ListPrice NOT BETWEEN 100 AND 200;
```

## Check yourself

You're ready for Lesson 16 when you can answer, without looking: what is
`IN` shorthand for, and does `BETWEEN` include or exclude its two boundary
values?
