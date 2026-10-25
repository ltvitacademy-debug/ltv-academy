# Lesson 18 — The OUTPUT Clause

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 8 of 8**

## What you'll learn

- What the `OUTPUT` clause returns, and why `INSERT`, `UPDATE`, and
  `DELETE` need it since they don't normally return rows
- The `inserted` and `deleted` pseudo-tables `OUTPUT` reads from
- Using `OUTPUT` with `INSERT`, `UPDATE`, and `DELETE`
- Capturing `OUTPUT` results into a table instead of just displaying them

## Why OUTPUT exists

`SELECT` always returns the rows it reads. `INSERT`, `UPDATE`, and
`DELETE` don't — they just report how many rows were affected. `OUTPUT`
closes that gap: it lets a write statement return the rows it just
inserted, updated, or deleted, in the same statement, without a
follow-up `SELECT`.

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
OUTPUT inserted.ProductID, inserted.ProductName, inserted.ListPrice
VALUES ('Trail Bike', 799.99, 'Red');
```

This both inserts the row **and** immediately returns the new row's
`ProductID`, `ProductName`, and `ListPrice` — including the `IDENTITY`
value SQL Server just generated, with no separate `SCOPE_IDENTITY()`
call needed.

## The inserted and deleted pseudo-tables

`OUTPUT` reads from two special pseudo-tables that exist only during the
write statement:

- `inserted` — the new values, available for `INSERT` and `UPDATE`
- `deleted` — the old values, available for `DELETE` and `UPDATE`

```sql
UPDATE dbo.LessonDemo
SET ListPrice = ListPrice * 1.10
OUTPUT deleted.ListPrice AS OldPrice, inserted.ListPrice AS NewPrice
WHERE Color = 'Red';
```

An `UPDATE` can reference **both** pseudo-tables at once, because it has
both an old and a new value for each changed row — `deleted.ListPrice`
holds the price before the update, `inserted.ListPrice` holds it after.

## OUTPUT with DELETE

A `DELETE` only ever has old values, so `OUTPUT` on a `DELETE` can only
reference `deleted`:

```sql
DELETE FROM dbo.LessonDemo
OUTPUT deleted.ProductID, deleted.ProductName, deleted.ListPrice
WHERE ListPrice < 500;
```

This is especially useful for deletes: you get permanent proof of exactly
which rows were removed and what their values were, right in the same
statement — valuable when you're cleaning up data and want a record of
what disappeared.

## Capturing OUTPUT into a table

By default, `OUTPUT` just returns its rows the way a `SELECT` would. Add
`INTO` to send those rows into a real table instead — commonly an
"audit" or "archive" table:

```sql
CREATE TABLE dbo.LessonDemoArchive (
    ProductID   INT,
    ProductName VARCHAR(50),
    ListPrice   MONEY,
    DeletedAt   DATETIME2 DEFAULT SYSDATETIME()
);

DELETE FROM dbo.LessonDemo
OUTPUT deleted.ProductID, deleted.ProductName, deleted.ListPrice
INTO dbo.LessonDemoArchive (ProductID, ProductName, ListPrice)
WHERE ListPrice < 500;
```

Every row this `DELETE` removes is simultaneously inserted into
`dbo.LessonDemoArchive`, giving you a permanent record of deleted data
without writing a second statement.

## Key terms

| Term | Meaning |
|---|---|
| `OUTPUT` | Returns the rows an `INSERT`, `UPDATE`, or `DELETE` just affected |
| `inserted` | Pseudo-table holding new values, for `INSERT` and `UPDATE` |
| `deleted` | Pseudo-table holding old values, for `DELETE` and `UPDATE` |
| `OUTPUT ... INTO` | Sends the returned rows into a real table instead of just displaying them |

## Lab

Create `dbo.LessonDemoArchive` as shown above, then run a `DELETE`
against `dbo.LessonDemo` with `OUTPUT ... INTO dbo.LessonDemoArchive` for
any rows priced under 500. Confirm with a `SELECT` that the archived rows
match exactly what was removed.

## Check yourself

You've completed Chapter 2 when you can explain the difference between
the `inserted` and `deleted` pseudo-tables, and why an `UPDATE` statement
is the only one of the three that can reference both at once.
