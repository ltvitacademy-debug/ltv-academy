# Lesson 70 — Dynamic SQL with sp_executesql

**Chapter 7 · Programming with T-SQL · Lesson 9 of 10**

## What you'll learn

- What "dynamic SQL" means — building a query as text, then running it
- `sp_executesql` — the safe way to run it
- Why string-concatenating user input into SQL is dangerous
- Parameterizing dynamic SQL properly

## What is dynamic SQL?

Every query in this course so far has been **static** — written out in
full, known in advance. **Dynamic SQL** is different: you build a query as
a **string** at runtime, then execute that string. This matters when part
of the query itself — a table name, a column name, a sort order — isn't
known until the code runs, and can't be handled with a normal parameter
(which only substitutes **values**, not table/column names).

## The dangerous way: string concatenation

```sql
-- DANGEROUS — never do this with untrusted input
DECLARE @ColorInput NVARCHAR(50) = 'Red';
DECLARE @SQL NVARCHAR(MAX);
SET @SQL = 'SELECT Name FROM Production.Product WHERE Color = ''' + @ColorInput + '''';
EXEC (@SQL);
```

If `@ColorInput` came from **untrusted** input (a web form, an API call)
and someone passed in something like `'; DROP TABLE Production.Product; --`,
that malicious text gets concatenated directly into the executed SQL — a
classic **SQL injection** vulnerability. This is exactly the kind of
mistake this course's `WebFetch`/injection-safety instincts exist to
prevent, and it applies just as much inside T-SQL itself.

## The safe way: sp_executesql with parameters

```sql
USE AdventureWorks2012;
GO

DECLARE @ColorInput NVARCHAR(50) = 'Red';
DECLARE @SQL NVARCHAR(MAX);

SET @SQL = N'SELECT Name FROM Production.Product WHERE Color = @Color';

EXEC sp_executesql @SQL, N'@Color NVARCHAR(50)', @Color = @ColorInput;
```

`sp_executesql` takes the query string, a **declaration** of the
parameters it expects (as another string), and the actual values —
**never** concatenating user data directly into the SQL text. SQL Server
treats `@ColorInput`'s value strictly as **data**, never as executable
SQL, which closes off the injection risk entirely.

## When dynamic SQL is actually needed

Reach for dynamic SQL only when a normal parameter genuinely can't do the
job — most commonly, when the **table name**, **column name**, or **sort
column** itself needs to vary based on runtime input, since T-SQL
parameters can only substitute values, never identifiers.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic SQL | A query built as a string at runtime, then executed |
| `sp_executesql` | Runs dynamic SQL safely, with proper parameters |
| SQL injection | Malicious SQL smuggled in through unparameterized string concatenation |

## Lab

Run the safe `sp_executesql` example above against AdventureWorks2012,
then try changing `@ColorInput` to a different color and re-running it.

## Check yourself

You're ready for Lesson 71 when you can answer, without looking: why is
string-concatenating input directly into SQL dangerous, and how does
`sp_executesql` avoid that risk?
