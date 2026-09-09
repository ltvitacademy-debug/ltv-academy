# Lesson 62 — Variables and DECLARE

**Chapter 7 · Programming with T-SQL · Lesson 1 of 10**

## What you'll learn

- `DECLARE` — creating a variable
- The `@` prefix and why it's required
- Assigning values with `SET` and `SELECT`
- Using a variable inside a query

## What is a variable?

A **variable** is a named storage location that holds a single value for
the duration of a batch (Lesson 63 covers batches properly) — a way to
compute or capture something once and reuse it, instead of repeating an
expression or hard-coding a value multiple times.

## Declaring a variable

```sql
USE AdventureWorks2012;
GO

DECLARE @MinPrice MONEY;
```

`DECLARE` creates the variable, and you must specify its **data type**
(Chapter 5's types all apply here — `INT`, `VARCHAR`, `DATE`, `MONEY`, and
so on) right after its name. Every T-SQL variable name **must** start with
`@` — this is how SQL Server tells a variable apart from a column or table
name at a glance.

## Assigning a value: SET

```sql
DECLARE @MinPrice MONEY;
SET @MinPrice = 500;

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > @MinPrice;
```

`SET` assigns a single value to a variable. Once assigned, `@MinPrice` can
be used anywhere a literal value would be valid — here, inside a `WHERE`
condition.

## Assigning a value: SELECT

`SELECT` can also assign a variable's value, and it's particularly useful
for capturing the result of a query:

```sql
DECLARE @AveragePrice MONEY;
SELECT @AveragePrice = AVG(ListPrice) FROM Production.Product;

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > @AveragePrice;
```

This is functionally similar to the scalar subquery from Lesson 52, but
splits it into two steps: **capture** the value into a variable, **then**
use that variable — useful when you need the same computed value multiple
times in a longer script without recalculating it.

## Declaring multiple variables

```sql
DECLARE @MinPrice MONEY = 100, @MaxPrice MONEY = 1000;

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice BETWEEN @MinPrice AND @MaxPrice;
```

You can also assign an **initial value** right in the `DECLARE` statement,
as shown here, instead of a separate `SET`.

## Key terms

| Term | Meaning |
|---|---|
| `DECLARE` | Creates a variable with a specified data type |
| `@` prefix | Required on every T-SQL variable name |
| `SET` | Assigns a single literal or expression to a variable |
| `SELECT` (for assignment) | Assigns a query's result into a variable |

## Lab

Run this against AdventureWorks2012:

```sql
DECLARE @MinPrice MONEY = 200;
DECLARE @Color NVARCHAR(15) = N'Red';

SELECT Name, Color, ListPrice
FROM Production.Product
WHERE ListPrice > @MinPrice AND Color = @Color;
```

## Check yourself

You're ready for Lesson 63 when you can answer, without looking: why must
every T-SQL variable name start with `@`, and what are the two ways to
assign a value to one?
