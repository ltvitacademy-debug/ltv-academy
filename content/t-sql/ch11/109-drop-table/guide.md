# Lesson 99 — DROP TABLE

**Chapter 12 · Database Design Fundamentals · Lesson 3 of 21**

## What you'll learn

- `DROP TABLE` — removing a table's structure and all of its data
- `DROP TABLE IF EXISTS` — the modern, safe form
- Why a `DROP TABLE` can fail when other objects depend on it
- How this differs from `TRUNCATE TABLE`, covered earlier in this course

## The basic DROP TABLE

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID INT NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);

DROP TABLE dbo.LessonDemo;
```

`DROP TABLE` removes the table's **structure** — its columns, its
constraints, its indexes — and every row of data stored in it, all at
once. There's no undo short of restoring a backup. This is one of the
most permanent operations in all of T-SQL.

## DROP TABLE IF EXISTS — the safe modern form

```sql
DROP TABLE IF EXISTS dbo.LessonDemo;
```

Running plain `DROP TABLE` against a table that **doesn't exist** raises
an error and stops your script. `DROP TABLE IF EXISTS` quietly does
nothing if the table was never there, and drops it if it was — making it
the safe choice at the top of setup scripts, where you often want to
guarantee a clean slate before creating a table fresh.

```sql
-- A common setup pattern at the top of a demo script
DROP TABLE IF EXISTS dbo.LessonDemo;

CREATE TABLE dbo.LessonDemo (
    DemoID INT NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);
```

## When DROP TABLE fails

```sql
CREATE TABLE dbo.LessonParent (
    ParentID INT NOT NULL PRIMARY KEY
);

CREATE TABLE dbo.LessonChild (
    ChildID  INT NOT NULL PRIMARY KEY,
    ParentID INT NOT NULL,
    CONSTRAINT FK_LessonChild_Parent
        FOREIGN KEY (ParentID) REFERENCES dbo.LessonParent (ParentID)
);

-- This FAILS: LessonChild's foreign key still references LessonParent
DROP TABLE dbo.LessonParent;

-- Fix: drop the dependent table (or its constraint) first
DROP TABLE dbo.LessonChild;
DROP TABLE dbo.LessonParent;
```

A table can't be dropped while something else still depends on it — a
foreign key from another table, or a view built on top of it. SQL Server
protects you here: it refuses the drop rather than silently leaving
another object broken.

## DROP TABLE vs. TRUNCATE TABLE

You've already seen `TRUNCATE TABLE` earlier in this course — it's worth
contrasting the two directly, since they're easy to mix up:

| | Removes data | Removes structure |
|---|---|---|
| `TRUNCATE TABLE` | Yes, all rows | No — the table still exists afterward |
| `DROP TABLE` | Yes, all rows | Yes — the table itself is gone |

`TRUNCATE TABLE dbo.LessonDemo;` empties the table but leaves it standing,
ready for new rows. `DROP TABLE dbo.LessonDemo;` removes the table
itself — there's nothing left to insert into until you `CREATE TABLE`
again.

## Key terms

| Term | Meaning |
|---|---|
| `DROP TABLE` | Permanently removes a table's structure and all its data |
| `DROP TABLE IF EXISTS` | Drops the table only if it exists; no error if it doesn't |
| Dependent object | A foreign key or view that references a table, blocking its drop |

## Lab

```sql
DROP TABLE IF EXISTS dbo.Lesson99Demo;

CREATE TABLE dbo.Lesson99Demo (
    DemoID INT NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);

-- Confirm it exists, then remove it
SELECT * FROM dbo.Lesson99Demo;
DROP TABLE dbo.Lesson99Demo;

-- Run the same DROP TABLE again — it fails without IF EXISTS
-- DROP TABLE dbo.Lesson99Demo;  -- errors: table doesn't exist

DROP TABLE IF EXISTS dbo.Lesson99Demo;  -- quietly does nothing
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
what's the difference between `TRUNCATE TABLE` and `DROP TABLE`, and why
might a `DROP TABLE` statement fail even on a table you know exists?
