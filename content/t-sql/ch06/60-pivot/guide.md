# Lesson 60 — PIVOT

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 9 of 10**

## What you'll learn

- What `PIVOT` does — turning row values into column headers
- The three things `PIVOT` needs: an aggregate, a spreading column, values
- Reading `PIVOT`'s slightly unusual syntax
- When you'd reach for it

## The shape PIVOT solves

Some data naturally comes in a "tall" shape — one row per combination —
but reports often want it "wide": one row overall, with a separate column
per category. `PIVOT` performs exactly that rotation.

## A PIVOT example

```sql
USE AdventureWorks2012;
GO

SELECT ProductSubcategoryID, [Red], [Blue], [Black]
FROM (
    SELECT ProductSubcategoryID, Color, ListPrice
    FROM Production.Product
    WHERE Color IN ('Red', 'Blue', 'Black')
) AS SourceData
PIVOT (
    AVG(ListPrice)
    FOR Color IN ([Red], [Blue], [Black])
) AS PivotTable;
```

This turns three separate colors — spread across many rows — into **three
columns**, `Red`, `Blue`, and `Black`, each showing the average price for
that color, one row per subcategory.

## The three pieces PIVOT needs

- **An aggregate function** — `AVG(ListPrice)` here — this is what fills
  each new column's values.
- **The spreading column** — `FOR Color` — the column whose distinct
  values become new column headers.
- **The explicit value list** — `IN ([Red], [Blue], [Black])` — you must
  **name** each value you want turned into a column; `PIVOT` does not
  automatically discover them.

## Why the inner query and brackets

`PIVOT` needs a source query that's already narrowed to just the relevant
columns (the inner `SELECT` above) — trying to `PIVOT` directly on a whole
table with unrelated columns causes confusing results. And the square
brackets around `[Red]`, `[Blue]`, `[Black]` are ordinary T-SQL
identifier-quoting (you've seen this with reserved-word column names) —
here, they let a value like `Red` be used as if it were a column name.

## When to use PIVOT

Reach for `PIVOT` when you need a genuinely **wide** report — a
cross-tabulation, like "average price by subcategory and color side by
side" — that would otherwise require a separate column per value written
out manually with `CASE` expressions.

## Key terms

| Term | Meaning |
|---|---|
| `PIVOT` | Rotates distinct row values into column headers, aggregating as it goes |
| Spreading column | The column named in `FOR`, whose values become new columns |

## Lab

Run the example query above against AdventureWorks2012 and confirm each
subcategory shows one row with three price columns.

## Check yourself

You're ready for Lesson 61 when you can answer, without looking: what
three things does `PIVOT` require, and why must the values in `IN (...)`
be listed explicitly?
