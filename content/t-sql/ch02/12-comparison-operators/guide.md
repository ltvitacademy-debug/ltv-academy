# Lesson 12 — Relational/Comparison Operators

**Chapter 2 · Filtering and Sorting · Lesson 2 of 10**

## What you'll learn

- Every comparison operator T-SQL supports
- The difference between `=` and `<>` (or `!=`)
- Combining comparisons with arithmetic
- Comparing dates the same way as numbers

## The full set of operators

| Operator | Meaning |
|---|---|
| `=` | Equal to |
| `<>` or `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

Both `<>` and `!=` mean "not equal." This course uses `<>`, because it's the
ANSI SQL standard form — `!=` works in T-SQL too, but isn't standard SQL.

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice <> 0;
```

## Comparing numbers

```sql
SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice >= 500;

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice <= 20;
```

## Comparing dates

Dates compare the same way numbers do — earlier dates are "less than" later
ones:

```sql
SELECT SalesOrderID, OrderDate
FROM Sales.SalesOrderHeader
WHERE OrderDate > '2013-01-01';
```

We cover date literals and date functions properly in Chapter 5 — for now,
just know that a date written as text in quotes (`'2013-01-01'`) compares
correctly against a `date`/`datetime` column.

## Combining with arithmetic

Comparisons work against any expression, not just a bare column:

```sql
SELECT Name, ListPrice, StandardCost
FROM Production.Product
WHERE ListPrice - StandardCost > 100;
```

This returns only products where the markup (list price minus standard
cost) exceeds $100.

## Key terms

| Term | Meaning |
|---|---|
| `=` `<>` `>` `<` `>=` `<=` | The six comparison operators |
| ANSI standard | `<>` is the SQL-standard "not equal" form this course uses |

## Lab

Run each of these against AdventureWorks2012:

```sql
SELECT Name, ListPrice FROM Production.Product WHERE ListPrice <> 0;
SELECT Name, ListPrice FROM Production.Product WHERE ListPrice >= 1000;
SELECT SalesOrderID, OrderDate FROM Sales.SalesOrderHeader WHERE OrderDate > '2013-06-01';
```

## Check yourself

You're ready for Lesson 13 when you can answer, without looking: what are
the six comparison operators, and which "not equal" form does this course
use?
