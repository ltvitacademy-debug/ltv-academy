# Lesson 17 — ORDER BY: Ascending & Descending

**Chapter 2 · Filtering and Sorting · Lesson 7 of 10**

## What you'll learn

- Sorting results with `ORDER BY`
- `ASC` vs. `DESC`
- Sorting on multiple columns
- Sorting by column position (and why it's risky)
- Where `ORDER BY` sits in the logical processing order

## Sorting with ORDER BY

Without `ORDER BY`, SQL Server does not guarantee any particular row
order — what you see is whatever order happens to be convenient for the
engine. `ORDER BY` makes the order explicit and reliable:

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice
FROM Production.Product
ORDER BY ListPrice;
```

By default, `ORDER BY` sorts **ascending** — smallest to largest, or A to Z
for text.

## ASC and DESC

```sql
SELECT Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

`DESC` reverses the order — largest to smallest, Z to A. `ASC` (ascending)
is the default and rarely written explicitly, but it's always there.

## Sorting on multiple columns

```sql
SELECT Name, Color, ListPrice
FROM Production.Product
ORDER BY Color ASC, ListPrice DESC;
```

This sorts by `Color` first. **Within each color**, rows are then sorted by
`ListPrice`, highest first. Each column after the first only breaks ties
left by the columns before it.

## Sorting by column position

```sql
SELECT Name, Color, ListPrice
FROM Production.Product
ORDER BY 3 DESC;
```

`3` refers to the third column in the `SELECT` list (`ListPrice`). This
works, but it's fragile: if someone reorders or adds columns to the
`SELECT` list later, the sort silently changes to sort by a different
column. This course always sorts by column **name**, not position.

## Where ORDER BY fits in

`ORDER BY` is the very **last** clause SQL Server evaluates, after
`SELECT`. That's actually why it's the one clause that *can* reference a
`SELECT` alias — unlike `WHERE` from Lesson 11:

```sql
SELECT ListPrice * 0.9 AS DiscountedPrice
FROM Production.Product
ORDER BY DiscountedPrice DESC;
```

## Key terms

| Term | Meaning |
|---|---|
| `ORDER BY` | Sorts the result set; the last clause evaluated |
| `ASC` | Ascending order (default) |
| `DESC` | Descending order |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Name, Color, ListPrice
FROM Production.Product
ORDER BY Color ASC, ListPrice DESC;
```

## Check yourself

You're ready for Lesson 18 when you can answer, without looking: what's the
default sort direction, and why can `ORDER BY` (unlike `WHERE`) reference a
`SELECT` alias?
