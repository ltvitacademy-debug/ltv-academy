# Lesson 102 — DEFAULT Constraints

**Chapter 12 · Database Design Fundamentals · Lesson 6 of 21**

## What you'll learn

- Defining a `DEFAULT` inline on a column
- Adding a `DEFAULT` constraint after the table already exists
- The exact rule for when a default applies: omitted, not explicit `NULL`
- Naming default constraints, the same way you'd name a primary key

## DEFAULT defined inline

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID    INT          NOT NULL PRIMARY KEY,
    Label     NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2    NOT NULL DEFAULT (SYSDATETIME()),
    IsActive  BIT          NOT NULL DEFAULT (1)
);

INSERT INTO dbo.LessonDemo (DemoID, Label) VALUES (1, 'First row');

SELECT * FROM dbo.LessonDemo;
```

Notice the `INSERT` never mentions `CreatedAt` or `IsActive` — it only
supplies `DemoID` and `Label`. SQL Server fills in the current timestamp
and `1` automatically, because those columns were omitted entirely.

## The exact rule: omitted, not explicit NULL

```sql
-- Omitted: the DEFAULT applies
INSERT INTO dbo.LessonDemo (DemoID, Label) VALUES (2, 'Second row');

-- Explicit NULL: the DEFAULT does NOT apply (and this would fail here,
-- since IsActive is NOT NULL)
-- INSERT INTO dbo.LessonDemo (DemoID, Label, IsActive) VALUES (3, 'Third row', NULL);
```

This is the detail that trips people up: a `DEFAULT` only kicks in when a
column is **left out of the column list entirely**. If you explicitly
write `NULL` for that column, SQL Server inserts `NULL` — it does **not**
fall back to the default, even though the end result might look similar
when the column happens to allow `NULL`.

## Adding a DEFAULT after the table already exists

```sql
CREATE TABLE dbo.LessonDemo2 (
    DemoID INT NOT NULL PRIMARY KEY,
    Status NVARCHAR(20) NOT NULL
);

ALTER TABLE dbo.LessonDemo2
ADD CONSTRAINT DF_LessonDemo2_Status DEFAULT ('Pending') FOR Status;
```

Just like primary keys, you can name a default constraint explicitly —
`DF_LessonDemo2_Status` here. That gives you something predictable to
reference if you ever need to drop or change it later, instead of
relying on SQL Server's auto-generated name.

## Key terms

| Term | Meaning |
|---|---|
| `DEFAULT` (inline) | A default value declared directly on a column in `CREATE TABLE` |
| `ADD CONSTRAINT ... DEFAULT ... FOR` | Adds a default to a column after the table exists |
| Omitted column | A column left out of the INSERT's column list — this is when DEFAULT applies |

## Lab

```sql
CREATE TABLE dbo.Lesson102Demo (
    DemoID    INT          NOT NULL PRIMARY KEY,
    Label     NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2    NOT NULL DEFAULT (SYSDATETIME())
);

-- Omit CreatedAt -- DEFAULT fills it in
INSERT INTO dbo.Lesson102Demo (DemoID, Label) VALUES (1, 'Row one');

-- Supply CreatedAt explicitly -- DEFAULT is bypassed
INSERT INTO dbo.Lesson102Demo (DemoID, Label, CreatedAt)
VALUES (2, 'Row two', '2020-01-01');

SELECT * FROM dbo.Lesson102Demo;

DROP TABLE dbo.Lesson102Demo;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
exactly when does a `DEFAULT` constraint apply, and when does it not?
