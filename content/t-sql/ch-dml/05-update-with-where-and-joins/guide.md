# Lesson 15 — UPDATE with a WHERE Clause and Joins

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 5 of 8**

## What you'll learn

- Narrowing an `UPDATE` with a more selective `WHERE` clause
- Updating one table using values pulled from a second, joined table
- The `UPDATE <alias> SET ... FROM <table> JOIN ...` pattern
- Why the join's `ON` and `WHERE` clauses still control exactly what changes

## A more selective WHERE clause

`WHERE` in `UPDATE` supports the same comparison and logical operators you
already use in `SELECT` — `AND`, `OR`, ranges, and more:

```sql
UPDATE dbo.LessonDemo
SET ListPrice = ListPrice * 0.90
WHERE Color = 'Red' AND ListPrice > 1000;
```

Only rows that are both `'Red'` **and** priced over `1000` get the 10%
discount — combining conditions narrows exactly which rows the `UPDATE`
touches, the same way it would narrow a `SELECT`.

## Updating from a second table

Sometimes the new value doesn't come from a literal or an expression on
the same row — it needs to come from a **different** table. SQL Server's
`UPDATE ... FROM` syntax lets you join in a second table and pull values
from it:

```sql
UPDATE d
SET d.ListPrice = p.ListPrice
FROM dbo.LessonDemo AS d
JOIN Production.Product AS p
    ON d.ProductName = p.Name
WHERE p.ProductLine = 'R';
```

Read this as: join `dbo.LessonDemo` to `Production.Product` on matching
product names, then, for every matched pair where the real product's
`ProductLine` is `'R'`, set the demo row's `ListPrice` to the real
product's current `ListPrice`.

## Why the alias comes right after UPDATE

Notice `UPDATE d` names the **alias**, not the table name, and the real
table name only appears later in the `FROM` clause:

```sql
UPDATE d
SET d.Color = p.Color
FROM dbo.LessonDemo AS d
JOIN Production.Product AS p
    ON d.ProductName = p.Name;
```

This is the standard shape for a joined update: `UPDATE <alias>`, then
`SET` using that alias, then `FROM <table> AS <alias> JOIN ...` to define
what the alias refers to and how it connects to the other table. Only
rows in `dbo.LessonDemo` that find a matching row in `Production.Product`
are updated — a row with no match in the join is left untouched, exactly
like an inner join would exclude it from a `SELECT`.

## ON defines the match, WHERE still filters further

The join's `ON` clause decides **which rows pair up**; an additional
`WHERE` clause can still filter the matched pairs further, exactly as in
a `SELECT`:

```sql
UPDATE d
SET d.ListPrice = p.ListPrice,
    d.Color = p.Color
FROM dbo.LessonDemo AS d
JOIN Production.Product AS p
    ON d.ProductName = p.Name
WHERE p.ListPrice > 500;
```

Here, `ON` finds matching product names, but `WHERE` further restricts
the update to only those matched pairs where the real product's price is
over `500`. Both clauses are doing different jobs: `ON` controls the
join, `WHERE` controls which of the joined rows actually get updated.

## Key terms

| Term | Meaning |
|---|---|
| `UPDATE ... FROM ... JOIN` | Updates one table using values pulled from a second, joined table |
| Alias after `UPDATE` | The alias defined in `FROM`, used consistently in `SET` and `UPDATE` |
| `ON` vs. `WHERE` | `ON` decides which rows match in the join; `WHERE` further filters the matched pairs |

## Lab

Using the join pattern above, write an `UPDATE` that sets
`dbo.LessonDemo.ListPrice` to match `Production.Product.ListPrice`
wherever the product names match and the real product's `Color` is
`'Black'`. Confirm the result with a `SELECT` joining the two tables
again.

## Check yourself

You're ready for Lesson 16 when you can explain the difference between
what the `ON` clause controls and what the `WHERE` clause controls in a
joined `UPDATE` statement.
