# Lesson 63 — Batches and GO

**Chapter 7 · Programming with T-SQL · Lesson 2 of 10**

## What you'll learn

- What a **batch** actually is
- `GO` — a client tool convention, not T-SQL itself
- Why a variable can't cross a `GO` boundary
- Why every script in this course opens with `USE ... ; GO`

## What is a batch?

A **batch** is a group of one or more T-SQL statements sent to SQL Server
**together**, as a single unit, for parsing and execution. Everything you
write between one `GO` and the next (or the start/end of a script) is one
batch.

## GO is not T-SQL

This surprises a lot of people: `GO` is **not** a T-SQL keyword or
statement at all. It's a signal recognized by client tools — SSMS
(Lesson 1), `sqlcmd`, and others — meaning "everything above this line is
one batch; send it now, then start a new batch." The SQL Server engine
itself never sees the word `GO`; the client strips it out and sends each
batch separately.

## Why variables don't survive GO

This is the practical consequence worth remembering:

```sql
DECLARE @MinPrice MONEY = 500;
GO
SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > @MinPrice; -- ERROR: @MinPrice doesn't exist here
```

Because `GO` splits the script into **separate** batches, and a variable
(Lesson 62) only lives for the **batch** that declared it, `@MinPrice` is
already gone by the time the second batch runs — `@MinPrice` is undeclared
as far as that batch is concerned, even though it's right there on the
screen. The fix is simple: don't put a `GO` between declaring a variable
and using it.

## Why this course's scripts always open with USE ... ; GO

```sql
USE AdventureWorks2012;
GO

SELECT ...
```

The `GO` after `USE` ensures the database-context switch (Lesson 2)
completes as its **own** batch before anything else runs — a small but
real safety habit, since some statements (like creating certain objects)
must be the first statement in their batch.

## Key terms

| Term | Meaning |
|---|---|
| Batch | One or more T-SQL statements sent to the server together |
| `GO` | A client-tool signal (not T-SQL) marking a batch boundary |

## Lab

Run this against AdventureWorks2012 and observe the error, then fix it by
removing the `GO`:

```sql
DECLARE @TestValue INT = 5;
GO
SELECT @TestValue; -- observe the error
```

## Check yourself

You're ready for Lesson 64 when you can answer, without looking: is `GO`
part of T-SQL itself, and why does a variable declared before `GO` become
unusable after it?
