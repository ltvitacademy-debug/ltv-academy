# Lesson 97 — CREATE TABLE

**Chapter 12 · Database Design Fundamentals · Lesson 1 of 21**

## What you'll learn

- The basic shape of a `CREATE TABLE` statement
- Column definitions: name, data type, and `NULL` / `NOT NULL`
- Defining a simple `PRIMARY KEY` inline
- Why this is the very first building block of database design

## The basic shape

Every table starts the same way: a schema-qualified name, then a
comma-separated list of column definitions inside parentheses.

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID   INT          NOT NULL,
    Label    NVARCHAR(50) NOT NULL,
    Notes    NVARCHAR(200) NULL
);
```

Each column gets a **name**, a **data type**, and an optional
**nullability** rule. `dbo` here is the schema — the same `dbo` schema
you've already seen in front of real AdventureWorks2012 tables like
`Production.Product`... except that one uses `Production`, not `dbo`.
Either way, `schema.TableName` is the full, unambiguous name of a table.

## NULL vs. NOT NULL

```sql
CREATE TABLE dbo.LessonDemo2 (
    DemoID INT NOT NULL,   -- every row MUST have a value here
    Notes  NVARCHAR(200) NULL  -- this column may be left empty
);
```

`NOT NULL` means SQL Server will **reject** any `INSERT` or `UPDATE` that
tries to leave that column empty. `NULL` (or leaving the keyword off
entirely, since it's the default for most column types) means the column
is allowed to have no value at all. Get this decision right at design
time — it's much easier than retrofitting it once a table has real data
in it.

## Adding a PRIMARY KEY inline

A table doesn't strictly need a primary key to exist, but almost every
well-designed table has one. You can define it right inside the column
list:

```sql
CREATE TABLE dbo.LessonDemo3 (
    DemoID INT          NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);
```

This is a preview of the very next chapter topic you'll go deeper on:
primary keys guarantee uniqueness and `NOT NULL` for whichever column (or
columns) you mark this way. For now, just recognize the inline shape —
`PRIMARY KEY` written directly after a column's type.

## Putting it together and cleaning up

```sql
CREATE TABLE dbo.LessonDemo4 (
    DemoID   INT          NOT NULL PRIMARY KEY,
    Label    NVARCHAR(50) NOT NULL,
    IsActive BIT          NOT NULL
);

INSERT INTO dbo.LessonDemo4 (DemoID, Label, IsActive)
VALUES (1, 'First row', 1);

SELECT * FROM dbo.LessonDemo4;

-- Clean up when you're done experimenting
DROP TABLE dbo.LessonDemo4;
```

Notice this lesson never runs `CREATE TABLE`, `ALTER TABLE`, or `DROP
TABLE` against a real AdventureWorks2012 table — only against a scratch
table you created yourself. That's the pattern for the rest of this
chapter: practice DDL on your own tables, never on shared sample data.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE TABLE` | Defines a new table: its name, columns, types, and constraints |
| `NOT NULL` | The column must have a value in every row |
| `NULL` | The column is allowed to have no value |
| Inline `PRIMARY KEY` | A primary key declared directly on a column in `CREATE TABLE` |

## Lab

Create your own scratch table, insert a row, query it, then drop it:

```sql
CREATE TABLE dbo.Lesson97Demo (
    DemoID INT          NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL,
    Notes  NVARCHAR(200) NULL
);

INSERT INTO dbo.Lesson97Demo (DemoID, Label) VALUES (1, 'Practice row');

SELECT * FROM dbo.Lesson97Demo;

DROP TABLE dbo.Lesson97Demo;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
what three things does every column definition in `CREATE TABLE` need, and
what does declaring a column `NOT NULL` actually enforce?
