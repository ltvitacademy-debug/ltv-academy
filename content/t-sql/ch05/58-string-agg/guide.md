# Lesson 60 — STRING_AGG

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 18 of 22**

## What you'll learn

- `STRING_AGG(expression, separator)`: concatenating many rows into one
  string
- Using it alongside `GROUP BY`, like any other aggregate function
- Controlling the order with `WITHIN GROUP (ORDER BY ...)`
- How `STRING_AGG` handles `NULL` values automatically

## The problem: one string per group, not one row per value

Imagine listing every color a product subcategory comes in as a single,
readable, comma-separated string per subcategory — instead of one output
row per color.

```sql
USE AdventureWorks2012;
GO
```

## STRING_AGG: concatenate across rows

```sql
SELECT
    ProductSubcategoryID,
    STRING_AGG(Color, ', ') AS ColorsAvailable
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY ProductSubcategoryID;
```

`STRING_AGG` is itself an aggregate function — it belongs in the
`SELECT` list alongside `GROUP BY` exactly like `SUM` or `COUNT`. Instead
of returning a number, though, it returns every value in the group joined
together using whatever separator you give it as the second argument.

## Controlling the order with WITHIN GROUP

```sql
SELECT
    ProductSubcategoryID,
    STRING_AGG(Color, ', ') WITHIN GROUP (ORDER BY Color ASC) AS ColorsAvailable
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY ProductSubcategoryID;
```

Without `WITHIN GROUP`, the order the values get concatenated in isn't
guaranteed — SQL Server is free to process the rows in whatever order is
convenient. `WITHIN GROUP (ORDER BY ...)` makes that order explicit and
deterministic, here sorting each subcategory's colors alphabetically.

## STRING_AGG skips NULLs automatically

```sql
-- NULL Color values are skipped automatically by STRING_AGG --
-- no WHERE Color IS NOT NULL needed, unlike the examples above:
SELECT
    ProductSubcategoryID,
    STRING_AGG(Color, ', ') WITHIN GROUP (ORDER BY Color ASC) AS ColorsAvailable
FROM Production.Product
GROUP BY ProductSubcategoryID;
```

Like other aggregate functions, `STRING_AGG` simply excludes `NULL`
values from the concatenation rather than inserting an empty entry or a
stray separator for them.

## Key terms

| Term | Meaning |
|---|---|
| `STRING_AGG(expression, separator)` | Aggregate function that concatenates every value in a group into one string |
| `WITHIN GROUP (ORDER BY ...)` | Makes STRING_AGG's concatenation order explicit and deterministic |

## Lab

Run the unordered and `WITHIN GROUP`-ordered `ColorsAvailable` queries
above, each more than once, and compare whether the unordered version's
row order stays consistent across repeated runs.

## Check yourself

You're ready for Lesson 61 when you can answer, without looking: what
does `STRING_AGG` do with `NULL` values in a group, and what does
`WITHIN GROUP (ORDER BY ...)` guarantee that plain `STRING_AGG` doesn't?
