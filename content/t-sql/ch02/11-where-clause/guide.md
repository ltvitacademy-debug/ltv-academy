# Lesson 11 — The WHERE Clause

**Chapter 2 · Filtering and Sorting · Lesson 1 of 10**

## What you'll learn

- Filtering rows with `WHERE`
- Where `WHERE` sits in a `SELECT` statement
- Filtering on numbers vs. text
- Why `WHERE` runs before column aliases exist

## What WHERE does

Every query so far in this course has returned *every* row in a table.
`WHERE` cuts that down to only the rows that match a condition:

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > 100;
```

`WHERE` goes after `FROM` and before any sorting or grouping. SQL Server
evaluates the condition **once per row**, and only keeps rows where it's
true.

## Filtering text

Text values need single quotes:

```sql
SELECT Name, Color
FROM Production.Product
WHERE Color = 'Red';
```

Comparisons are case-*insensitive* by default in most SQL Server
installations (including AdventureWorks2012), so `'Red'`, `'red'`, and
`'RED'` all match the same rows unless the database was specifically
configured otherwise.

## WHERE runs before SELECT's aliases exist

This trips up a lot of beginners: you **cannot** reference a column alias
(Lesson 5) inside `WHERE`:

```sql
-- This FAILS — DiscountedPrice doesn't exist yet when WHERE runs
SELECT ListPrice * 0.9 AS DiscountedPrice
FROM Production.Product
WHERE DiscountedPrice < 50;
```

SQL Server processes clauses in a specific logical order, and `WHERE` is
evaluated *before* `SELECT` — so the alias simply doesn't exist yet at that
point. The fix is to repeat the expression:

```sql
SELECT ListPrice * 0.9 AS DiscountedPrice
FROM Production.Product
WHERE ListPrice * 0.9 < 50;
```

We'll come back to this logical processing order more than once in this
course — it explains a lot of "why doesn't this work?" moments.

## Key terms

| Term | Meaning |
|---|---|
| `WHERE` | Filters rows based on a condition, evaluated per row |
| Logical processing order | The order SQL Server actually evaluates clauses in — `WHERE` before `SELECT` |

## Lab

Run each of these against AdventureWorks2012 and note how many rows come
back:

```sql
SELECT Name, ListPrice FROM Production.Product WHERE ListPrice > 500;
SELECT Name, Color FROM Production.Product WHERE Color = 'Black';
SELECT Name, ListPrice FROM Production.Product WHERE ListPrice * 0.9 < 50;
```

## Check yourself

You're ready for Lesson 12 when you can answer, without looking: where does
`WHERE` go in a query, and why can't you filter on a `SELECT` alias inside
it?
