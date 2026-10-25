# Lesson 14 — UPDATE: The SET Clause

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 4 of 8**

## What you'll learn

- The basic `UPDATE ... SET` syntax for changing existing rows
- Updating one column, and several columns, in a single statement
- Setting a column based on its own current value
- Why an `UPDATE` with no `WHERE` clause changes **every** row

## The basic UPDATE statement

`INSERT` adds new rows; `UPDATE` changes values already sitting in
existing rows. The core shape is `UPDATE`, the table name, then `SET`
with one or more `column = value` assignments:

```sql
UPDATE dbo.LessonDemo
SET ListPrice = 849.99
WHERE ProductName = 'Trail Bike';
```

This changes the `ListPrice` of the one row (or rows) where
`ProductName` equals `'Trail Bike'` and leaves every other row exactly as
it was. The `WHERE` clause here works exactly like it does in `SELECT` —
it decides **which** rows the statement touches.

## Updating several columns at once

Separate multiple `column = value` assignments with commas inside the
same `SET` clause:

```sql
UPDATE dbo.LessonDemo
SET ListPrice = 899.99,
    Color = 'Blue'
WHERE ProductName = 'Trail Bike';
```

Both columns change in the same statement, for the same matched row(s).
There's no limit to how many columns one `SET` clause can update, as long
as they all belong to the table being updated.

## Setting a column from its own current value

The value side of `SET` can reference the row's **current** values,
including the column being changed:

```sql
UPDATE dbo.LessonDemo
SET ListPrice = ListPrice * 1.10
WHERE Color = 'Red';
```

SQL Server reads each matching row's current `ListPrice`, multiplies it
by `1.10`, and writes the result back — a 10% price increase applied to
every red row, each computed from its own starting price, not a single
shared value.

## No WHERE clause updates every row

Leaving off `WHERE` is legal syntax, but the result is often a mistake:

```sql
-- Changes EVERY row in the table -- no WHERE clause at all
UPDATE dbo.LessonDemo
SET Color = 'Discontinued';
```

Without a `WHERE` clause, `UPDATE` applies its `SET` assignments to
**every row currently in the table**, exactly the way a `SELECT` with no
`WHERE` returns every row. Before running any `UPDATE`, it's worth
running the equivalent `SELECT` with the same `WHERE` clause first, to
confirm you're about to change exactly the rows you intend to.

## Confirming the result

`UPDATE` doesn't print the changed rows the way `SELECT` returns rows —
run a follow-up `SELECT` to verify:

```sql
UPDATE dbo.LessonDemo
SET ListPrice = ListPrice * 1.10
WHERE Color = 'Red';

SELECT ProductName, ListPrice, Color
FROM dbo.LessonDemo
WHERE Color = 'Red';
```

## Key terms

| Term | Meaning |
|---|---|
| `UPDATE` | The statement that changes column values in existing rows |
| `SET` | Lists the `column = value` assignments to apply |
| `WHERE` (in `UPDATE`) | Decides which existing rows are changed; omit it and every row changes |

## Lab

Insert a handful of rows into `dbo.LessonDemo` if it's empty, then run an
`UPDATE` that raises `ListPrice` by 15% only for rows where `Color =
'Black'`. Confirm the change with a `SELECT`, then try the same `UPDATE`
without the `WHERE` clause and observe how many rows change.

## Check yourself

You're ready for Lesson 15 when you can explain what happens to every row
in a table if you run an `UPDATE` statement with a `SET` clause but no
`WHERE` clause.
