# Lesson 7 — CASE Expressions (Simple)

**Chapter 1 · T-SQL Foundations · Lesson 7 of 10**

## What you'll learn

- The simple `CASE` expression: comparing one value against several options
- `WHEN`, `THEN`, and `ELSE`
- Why `CASE` is an expression, not a statement
- Using `CASE` inside an alias to relabel data

## What is CASE?

`CASE` lets you branch — return different values depending on a condition —
right inside a `SELECT`. The **simple** form compares one value against a
list of possible matches:

```sql
USE AdventureWorks2012;
GO

SELECT Name,
       CASE Color
           WHEN 'Red' THEN 'Warm'
           WHEN 'Yellow' THEN 'Warm'
           WHEN 'Blue' THEN 'Cool'
           WHEN 'Black' THEN 'Neutral'
           ELSE 'Other'
       END AS ColorGroup
FROM Production.Product;
```

Read it top to bottom: SQL Server checks `Color` against each `WHEN` value in
order. The first match wins, and its `THEN` value is returned. If nothing
matches, `ELSE` provides the fallback. `END` closes the expression.

## CASE is an expression, not a statement

This matters: a `CASE` expression **produces a value**, just like a column or
a calculation. That means you can put it almost anywhere a value is allowed
— in a `SELECT` list (as above), inside a calculation, or later in this
course, inside a `WHERE` clause or an `ORDER BY`. It is not a control-flow
statement like `IF/ELSE` (Chapter 7) — it doesn't run separate blocks of
code, it just evaluates to one value per row.

## Always alias it

Since `CASE` is an expression, it needs an alias just like any other
calculated column (Lesson 5) — otherwise its output column has no readable
name:

```sql
SELECT Name,
       Color,
       CASE Color
           WHEN 'Red' THEN 'Warm'
           WHEN 'Blue' THEN 'Cool'
           ELSE 'Other'
       END AS ColorGroup
FROM Production.Product;
```

## What if you skip ELSE?

`ELSE` is optional. If you omit it and no `WHEN` matches, the result is
`NULL` for that row — usually not what you want, so this course always
includes an `ELSE`.

## Key terms

| Term | Meaning |
|---|---|
| Simple `CASE` | Compares one value against a list of exact matches |
| `WHEN` | One possible match and its result |
| `THEN` | The value returned when the preceding `WHEN` matches |
| `ELSE` | The fallback value when nothing matches |
| `END` | Closes the `CASE` expression |

## Lab

Run this against AdventureWorks2012 and check that every row got a sensible
`SizeCategory`, including products whose size doesn't match any `WHEN`:

```sql
SELECT Name, Size,
       CASE Size
           WHEN 'S' THEN 'Small'
           WHEN 'M' THEN 'Medium'
           WHEN 'L' THEN 'Large'
           WHEN 'XL' THEN 'Extra Large'
           ELSE 'Unspecified'
       END AS SizeCategory
FROM Production.Product;
```

## Check yourself

You're ready for Lesson 8 when you can answer, without looking: what happens
if no `WHEN` matches and there's no `ELSE`, and why does `CASE` need an
alias?
