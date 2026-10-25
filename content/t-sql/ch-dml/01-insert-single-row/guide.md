# Lesson 11 — INSERT INTO: Single-Row VALUES

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 1 of 8**

## What you'll learn

- The `INSERT INTO ... VALUES` syntax for adding one row
- Why you should always list the target columns explicitly
- How `IDENTITY` columns and column defaults behave during an insert
- How data types and quoting rules affect the values you supply

## A scratch table to practice on

Everything in this chapter writes data — and writing data can damage shared
sample data if you practice on a real AdventureWorks2012 table. So before
anything else, create a small permanent table of your own to insert into,
update, and delete from throughout this chapter:

```sql
USE AdventureWorks2012;
GO

CREATE TABLE dbo.LessonDemo (
    ProductID   INT IDENTITY(1,1) PRIMARY KEY,
    ProductName VARCHAR(50)  NOT NULL,
    ListPrice   MONEY        NOT NULL,
    Color       VARCHAR(20)  NULL
);
```

`dbo.LessonDemo` lives only in your own database session and is yours to
break. Nothing here touches `Production.Product` or any other real
AdventureWorks2012 table.

## The basic INSERT INTO ... VALUES statement

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
VALUES ('Trail Bike', 799.99, 'Red');
```

The shape is always the same: `INSERT INTO`, the target table, a
parenthesized **column list**, then `VALUES` and a parenthesized list of
**literal values** in the same order as the column list. `ProductName`
lines up with `'Trail Bike'`, `ListPrice` with `799.99`, and `Color` with
`'Red'` — position, not name, is what matches a value to a column.

## Always list the column names

T-SQL lets you skip the column list:

```sql
-- Works, but fragile — relies on the table's exact column order
INSERT INTO dbo.LessonDemo
VALUES ('Road Bike', 1199.00, 'Blue');
```

This only works here because `ProductID` is an `IDENTITY` column, which
SQL Server fills in automatically and which you must **not** include in
either list. If someone later adds a column to `dbo.LessonDemo`, or if you
get the table's column order wrong, this form either fails outright or —
worse — silently inserts values into the wrong columns. Naming every
column you're supplying, as in the first example, makes the statement
self-documenting and immune to column-order changes.

## IDENTITY columns and defaults fill themselves in

Notice that `ProductID` never appears in the column list or the values
list above. SQL Server assigns the next identity value automatically. You
can confirm this with `SCOPE_IDENTITY()` right after the insert:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
VALUES ('Mountain Bike', 1499.50, 'Black');

SELECT SCOPE_IDENTITY() AS NewProductID;
```

The same idea applies to any column with a `DEFAULT` constraint: if you
leave it out of the column list, SQL Server uses the default instead of
requiring you to supply a value.

## Matching data types and quoting rules

Each value's type must be compatible with its column's type:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
VALUES ('Hybrid Bike', 950.00, NULL);
```

Character data (`VARCHAR`, `CHAR`, `NVARCHAR`) is always wrapped in single
quotes — `'Hybrid Bike'`. Numeric values like `950.00` are written without
quotes. `NULL` is written bare, with no quotes, and is only legal here
because `Color` was declared `NULL`-able; trying `NULL` against
`ProductName`, which is `NOT NULL`, raises a constraint error.

## Key terms

| Term | Meaning |
|---|---|
| `INSERT INTO` | The statement that adds one or more new rows to a table |
| Column list | The parenthesized list of target columns right after the table name |
| `VALUES` | Introduces one parenthesized tuple of literal values per row |
| `IDENTITY` | An auto-incrementing column you never supply a value for |
| `SCOPE_IDENTITY()` | Returns the last identity value generated in the current session |

## Lab

Run the `CREATE TABLE` statement above, then insert three rows into
`dbo.LessonDemo` one at a time using the explicit-column-list form. After
each insert, run `SELECT * FROM dbo.LessonDemo;` and watch `ProductID`
increment on its own.

## Check yourself

You're ready for Lesson 12 when you can explain why listing column names
explicitly is safer than relying on the table's default column order, and
why `ProductID` never appears in your `INSERT` statement.
