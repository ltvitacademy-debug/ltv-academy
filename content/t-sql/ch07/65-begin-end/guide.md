# Lesson 65 — BEGIN/END Blocks

**Chapter 7 · Programming with T-SQL · Lesson 4 of 10**

## What you'll learn

- The problem: `IF`/`ELSE` only controls **one** statement by default
- `BEGIN`/`END` — grouping multiple statements into one block
- Why this course always uses `BEGIN`/`END`, even for single statements
- A real multi-statement example

## The one-statement limit

Lesson 64's `IF`/`ELSE` examples each controlled exactly **one** statement.
That's actually a hard rule in T-SQL: without something to group them,
`IF` only "owns" the single statement immediately following it:

```sql
-- Only the PRINT is controlled by IF — the SELECT always runs
IF 1 = 2
    PRINT 'This never prints';
    SELECT 'This always runs, regardless of the IF';
```

This is a genuinely common beginner trap — indentation **looks** like both
statements are inside the `IF`, but T-SQL doesn't care about indentation
at all; only `BEGIN`/`END` actually groups statements.

## BEGIN/END — grouping multiple statements

```sql
USE AdventureWorks2012;
GO

DECLARE @ProductCount INT;
SELECT @ProductCount = COUNT(*) FROM Production.Product;

IF @ProductCount > 500
BEGIN
    PRINT 'Large catalog';
    PRINT 'Consider archiving old products';
END
ELSE
BEGIN
    PRINT 'Small catalog';
    PRINT 'No archiving needed yet';
END
```

`BEGIN` and `END` wrap a **block** — any number of statements — and that
whole block is treated as a single unit by `IF`/`ELSE` (and, later,
`WHILE` in Lesson 66). Both `PRINT` statements inside the first `BEGIN...END`
only run if the condition is true; both statements are grouped together.

## Why this course always uses BEGIN/END

Even for a single-statement branch, this course wraps it in `BEGIN`/`END`
anyway:

```sql
IF @ProductCount > 500
BEGIN
    PRINT 'Large catalog';
END
```

This is **defensive** — if someone later adds a second statement to that
branch (a very common edit), the block already exists and behaves
correctly, instead of silently breaking the way the unguarded example
above did.

## Key terms

| Term | Meaning |
|---|---|
| `BEGIN`/`END` | Groups multiple statements into one block, treated as a unit by `IF`, `ELSE`, `WHILE` |

## Lab

Run the broken (no `BEGIN`/`END`) example from this lesson against
AdventureWorks2012, observe that the `SELECT` runs regardless of the
condition, then fix it with `BEGIN`/`END`.

## Check yourself

You're ready for Lesson 66 when you can answer, without looking: how many
statements does `IF` control without `BEGIN`/`END`, and why does this
course wrap even single-statement branches in `BEGIN`/`END` anyway?
