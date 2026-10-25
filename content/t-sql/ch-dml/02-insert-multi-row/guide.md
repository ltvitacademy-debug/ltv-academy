# Lesson 12 — INSERT INTO: Multi-Row VALUES

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 2 of 8**

## What you'll learn

- Inserting several rows with one `INSERT INTO ... VALUES` statement
- Why a single multi-row insert is faster than repeating single-row inserts
- How row count and errors behave across a multi-row insert
- The comma rule between value tuples

## From one row to many

Lesson 11 inserted a single row per statement. Add more parenthesized
tuples, separated by commas, to insert several rows in one statement:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
VALUES
    ('Trail Bike', 799.99, 'Red'),
    ('Road Bike', 1199.00, 'Blue'),
    ('Mountain Bike', 1499.50, 'Black');
```

The column list is written once, right after the table name, and applies
to every tuple that follows. Each tuple is still matched to the column
list by position, exactly as in a single-row insert — only now there are
three tuples instead of one.

## The comma rule

Tuples are separated by commas; there is no comma after the last tuple
and no comma before the first:

```sql
INSERT INTO dbo.LessonDemo (ProductName, ListPrice, Color)
VALUES
    ('Hybrid Bike', 950.00, NULL),
    ('Touring Bike', 1050.00, 'Green');   -- no trailing comma here
```

A missing comma between two tuples, or an extra trailing comma after the
last one, is a syntax error — SQL Server will refuse to run the whole
batch, and **none** of the rows will be inserted.

## One statement, one trip to the server

Three single-row `INSERT` statements and one three-row `INSERT` statement
produce the same final data, but they are not equally efficient:

```sql
-- Three round trips to the server
INSERT INTO dbo.LessonDemo (ProductName, ListPrice) VALUES ('A', 10.00);
INSERT INTO dbo.LessonDemo (ProductName, ListPrice) VALUES ('B', 20.00);
INSERT INTO dbo.LessonDemo (ProductName, ListPrice) VALUES ('C', 30.00);

-- One round trip, one statement
INSERT INTO dbo.LessonDemo (ProductName, ListPrice)
VALUES ('A', 10.00), ('B', 20.00), ('C', 30.00);
```

A multi-row `VALUES` list is parsed, compiled, and logged as a single
operation, which is noticeably faster than issuing the same number of
separate `INSERT` statements — especially once you're inserting dozens or
hundreds of rows from application code.

## Multi-row insert is still all-or-nothing

If any single tuple in a multi-row insert violates a constraint, the
**entire statement** fails and no rows are inserted — not just the bad
one:

```sql
-- Fails entirely: ProductName is NOT NULL, and row 2 omits it
INSERT INTO dbo.LessonDemo (ProductName, ListPrice)
VALUES ('Good Row', 25.00), (NULL, 40.00);
```

This matters when you're loading a batch from an external source: one bad
row can block every row in that `INSERT`, which is why validating data
before the insert — or using smaller batches — matters as volume grows.

## Key terms

| Term | Meaning |
|---|---|
| Value tuple | One parenthesized set of values representing a single row |
| Multi-row `VALUES` | Multiple tuples, comma-separated, in one `INSERT` statement |
| All-or-nothing | If one tuple fails, the whole statement is rolled back |

## Lab

Insert four rows into `dbo.LessonDemo` in a single statement. Then write a
second multi-row insert where one tuple is missing a required
`ProductName`, run it, and confirm in the error message and the row count
that nothing from that statement was added.

## Check yourself

You're ready for Lesson 13 when you can explain what happens to the other,
valid tuples in a multi-row insert when one tuple violates a constraint.
