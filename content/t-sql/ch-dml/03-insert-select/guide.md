# Lesson 13 — INSERT INTO ... SELECT

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 3 of 8**

## What you'll learn

- Inserting rows produced by a `SELECT` query instead of literal `VALUES`
- Matching the `SELECT` list to the target column list by position
- Filtering, joining, and aggregating before the rows ever reach `INSERT`
- Why `INSERT ... SELECT` scales far better than one-row-at-a-time inserts

## From literal values to a query

Lessons 11 and 12 supplied the new row's values as literals after
`VALUES`. `INSERT INTO ... SELECT` replaces that `VALUES` clause with a
full `SELECT` statement, so the rows being inserted are whatever that
query returns:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
SELECT Name, ListPrice, Color
FROM Production.Product
WHERE ProductLine = 'R';
```

Every row `Production.Product` returns for road-line products becomes a
new row in `dbo.LessonDemo`. There is no `VALUES` keyword at all — once
you write `SELECT`, that query **is** the source of the rows.

## Column lists still match by position

The target column list and the `SELECT` list still line up by position,
not by name:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
SELECT p.Name, p.ListPrice, p.Color
FROM Production.Product AS p
WHERE p.Color = 'Red';
```

`p.Name` lands in `ProductName`, `p.ListPrice` lands in `ListPrice`, and
`p.Color` lands in `Color` — purely because of order. The source column
names don't need to match the destination column names at all; what has
to match is the **count** and **compatible data type** of each position.

## The SELECT can filter, join, and aggregate

Because the source is a real query, every tool you already know from
`SELECT` is available before the rows are inserted — `WHERE`, `JOIN`,
`GROUP BY`, even `TOP`:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
SELECT TOP (5) Name, ListPrice, Color
FROM Production.Product
WHERE Color IS NOT NULL
ORDER BY ListPrice DESC;
```

This inserts only the five most expensive products that have a color —
filtering, sorting, and limiting all happen inside the `SELECT`, so
`dbo.LessonDemo` only ever receives the rows you actually wanted.

## Why this scales better than row-by-row inserts

`INSERT ... SELECT` moves an entire result set in one statement, which is
dramatically more efficient than looping through rows in application code
and issuing a single-row `INSERT` for each one:

```sql
-- One statement copies however many rows the SELECT returns
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
SELECT Name, ListPrice, Color
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;
```

Whether the `SELECT` returns 3 rows or 3,000, SQL Server handles the
whole copy as a single set-based operation — this is the standard way to
seed a table, archive old rows into a history table, or copy a filtered
subset of production data into a reporting table.

## Key terms

| Term | Meaning |
|---|---|
| `INSERT ... SELECT` | Inserts the rows returned by a query instead of literal `VALUES` |
| Positional match | The Nth `SELECT` column fills the Nth target column, regardless of name |
| Set-based copy | Moving an entire result set in one statement rather than row by row |

## Lab

Run the `TOP (5)` example above against `Production.Product` into
`dbo.LessonDemo`, then change the `WHERE` clause to a different
`ProductLine` value and re-run it. Confirm with `SELECT *` that the right
rows landed each time.

## Check yourself

You're ready for Lesson 14 when you can explain how the columns in the
`SELECT` list are matched to the target table's column list, and why that
match does not depend on column names being the same.
