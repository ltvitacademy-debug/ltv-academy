# Lesson 98 — ALTER TABLE: Adding and Modifying Columns

**Chapter 12 · Database Design Fundamentals · Lesson 2 of 21**

## What you'll learn

- `ALTER TABLE ... ADD` — adding a new column to an existing table
- `ALTER TABLE ... ALTER COLUMN` — changing a column's data type
- `ALTER TABLE ... DROP COLUMN` — removing a column entirely
- The real caveat: `ALTER COLUMN` can fail if existing data doesn't fit

## Setting up a table to alter

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID INT          NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);
```

Once a table exists, you don't have to drop and recreate it just to
change its shape — `ALTER TABLE` lets you add, modify, or remove columns
on a table that may already have real rows in it.

## ADD — adding a new column

```sql
ALTER TABLE dbo.LessonDemo
ADD Notes NVARCHAR(200) NULL;
```

The new column appears on every existing row with a `NULL` value (unless
you give it a `DEFAULT`, which the next lesson covers). Adding a nullable
column is almost always safe, since SQL Server doesn't need to invent a
value for rows that already exist.

## ALTER COLUMN — changing a data type

```sql
ALTER TABLE dbo.LessonDemo
ALTER COLUMN Label NVARCHAR(100) NOT NULL;
```

This widens `Label` from `NVARCHAR(50)` to `NVARCHAR(100)`. Growing a
column is usually safe. **Shrinking** one, or changing its data type
entirely, is where the real caveat kicks in:

```sql
-- This FAILS if any existing Label value is longer than 10 characters —
-- SQL Server won't silently truncate your data to make the ALTER succeed
ALTER TABLE dbo.LessonDemo
ALTER COLUMN Label NVARCHAR(10) NOT NULL;
```

`ALTER COLUMN` always checks the data that's **already there**. If even
one existing row can't fit the new type or satisfy the new constraint,
the entire statement is rejected and nothing changes. This is a genuinely
common real-world problem — always check your data before narrowing a
column on a table that isn't empty.

## DROP COLUMN — removing a column

```sql
ALTER TABLE dbo.LessonDemo
DROP COLUMN Notes;
```

This permanently removes the column **and every value stored in it**,
for every row. There's no undo short of restoring a backup. Like
`ALTER COLUMN`, this can also fail — for example, if a default
constraint, check constraint, or index still references that column
(you'd need to drop those first).

## Putting it together

```sql
CREATE TABLE dbo.LessonDemo2 (
    DemoID INT NOT NULL PRIMARY KEY
);

ALTER TABLE dbo.LessonDemo2 ADD Label NVARCHAR(50) NULL;
ALTER TABLE dbo.LessonDemo2 ALTER COLUMN Label NVARCHAR(100) NULL;
ALTER TABLE dbo.LessonDemo2 DROP COLUMN Label;

DROP TABLE dbo.LessonDemo2;
```

## Key terms

| Term | Meaning |
|---|---|
| `ALTER TABLE ... ADD` | Adds a new column to an existing table |
| `ALTER TABLE ... ALTER COLUMN` | Changes a column's data type or nullability |
| `ALTER TABLE ... DROP COLUMN` | Permanently removes a column and its data |

## Lab

Build a scratch table, then add, widen, and drop a column:

```sql
CREATE TABLE dbo.Lesson98Demo (
    DemoID INT NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);

ALTER TABLE dbo.Lesson98Demo ADD Notes NVARCHAR(100) NULL;
ALTER TABLE dbo.Lesson98Demo ALTER COLUMN Notes NVARCHAR(300) NULL;
ALTER TABLE dbo.Lesson98Demo DROP COLUMN Notes;

DROP TABLE dbo.Lesson98Demo;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
why can `ALTER COLUMN` fail even though `ALTER TABLE ... ADD` almost
never does?
