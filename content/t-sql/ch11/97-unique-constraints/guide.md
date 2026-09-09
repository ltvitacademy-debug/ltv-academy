# Lesson 97 — UNIQUE Constraints

**Chapter 11 · Database Design Fundamentals · Lesson 3 of 12**

## What you'll learn

- What a **UNIQUE constraint** guarantees, and how it differs from a
  primary key
- Why a table can have many UNIQUE constraints but only one primary key
- The one surprising exception: how `NULL` behaves under UNIQUE
- AdventureWorks2012's real "alternate key" (`AK_`) naming convention

## UNIQUE vs. PRIMARY KEY

A **UNIQUE constraint** guarantees that every value in a column (or set of
columns) is distinct — exactly like a primary key. But unlike a primary
key, a table can have **more than one** UNIQUE constraint, and a UNIQUE
column is allowed to contain `NULL`.

Think of it this way: the primary key answers "what row is this?" A UNIQUE
constraint answers "what else about this row also has to be one-of-a-kind?"
`HumanResources.Employee` in AdventureWorks2012 is the real example —
`BusinessEntityID` is the primary key, but `NationalIDNumber` and `LoginID`
each have their own UNIQUE constraint, following Microsoft's own `AK_`
("alternate key") naming convention:

```sql
-- See AdventureWorks2012's real alternate keys
EXEC sp_helpconstraint 'HumanResources.Employee';
```

## Defining a UNIQUE constraint

```sql
CREATE TABLE dbo.Department (
    DepartmentID INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL UNIQUE,
    Code         CHAR(4)
);
```

Or after the fact, following the `AK_` convention:

```sql
ALTER TABLE dbo.Department
ADD CONSTRAINT AK_Department_Code UNIQUE (Code);
```

## The one surprising exception: NULL

A primary key never allows `NULL` at all. A UNIQUE constraint *does* allow
`NULL` — but SQL Server's implementation permits **only one** `NULL` value
per UNIQUE column, not many. This trips people up, because standard SQL
theory says `NULL` is never equal to another `NULL`, so you'd expect any
number of them to be allowed. SQL Server's UNIQUE constraint is actually
built as a unique index, and its B-tree treats a second `NULL` as a
duplicate:

```sql
INSERT INTO dbo.Department (DepartmentID, Name, Code) VALUES (1, 'Engineering', NULL);
INSERT INTO dbo.Department (DepartmentID, Name, Code) VALUES (2, 'Marketing', NULL);
-- Fails: violation of UNIQUE constraint — a second NULL isn't allowed
```

## Key terms

| Term | Meaning |
|---|---|
| UNIQUE constraint | Guarantees every value in a column (or set) is distinct, NULL allowed |
| AK_ prefix | AdventureWorks2012's naming convention for "alternate key" — a UNIQUE constraint |
| Alternate key | A column that's unique but isn't the table's primary key |

## Lab

Run against a scratch schema:

```sql
CREATE TABLE dbo.Lesson97Demo (
    DemoID INT NOT NULL PRIMARY KEY,
    Email  NVARCHAR(100) UNIQUE
);

INSERT INTO dbo.Lesson97Demo VALUES (1, 'a@example.com');

-- Fails: duplicate Email
INSERT INTO dbo.Lesson97Demo VALUES (2, 'a@example.com');

-- Works: first NULL is fine
INSERT INTO dbo.Lesson97Demo VALUES (3, NULL);

-- Fails: second NULL violates the same UNIQUE constraint
INSERT INTO dbo.Lesson97Demo VALUES (4, NULL);

-- Clean up
DROP TABLE dbo.Lesson97Demo;
```

## Check yourself

You're ready for Lesson 98 when you can explain, without looking: how many
`NULL` values does SQL Server allow in a UNIQUE column, and why does that
surprise people who know standard SQL theory?
