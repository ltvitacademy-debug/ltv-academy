# Lesson 77 — RAISERROR and THROW

**Chapter 8 · Transactions and Error Handling · Lesson 6 of 7**

## What you'll learn

- Raising your own error deliberately, instead of just catching one
- `THROW` — the modern way
- `RAISERROR` — the older way, and why you'll still see it
- Re-throwing an error from inside a `CATCH` block

## Why raise your own error?

`TRY`/`CATCH` (Lesson 76) reacts to errors SQL Server generates on its
own. Sometimes **you** need to signal a problem that SQL Server itself
wouldn't otherwise catch — a business rule violation ("this discount
can't exceed 50%"), not a syntax or constraint error.

## THROW — the modern way

```sql
IF NOT EXISTS (SELECT 1 FROM Production.Product WHERE ProductID = 99999)
    THROW 50000, 'Product does not exist.', 1;
```

`THROW` takes an error number, a message, and a state — and raises an
error exactly as if SQL Server had generated it itself. This is the
**recommended** way to raise a custom error in modern T-SQL.

## THROW inside CATCH — re-throwing

```sql
BEGIN TRY
    UPDATE Production.Product SET ListPrice = ListPrice - 1000000
    WHERE ProductID = 1;
END TRY
BEGIN CATCH
    PRINT 'Logging the error before re-raising it...';
    THROW; -- re-raises the original caught error, unmodified
END CATCH
```

`THROW` with **no arguments**, used inside a `CATCH` block, re-raises the
**exact** error that was just caught — useful when you want to log or
react to an error **and still** let it propagate up to whatever called
this code.

## RAISERROR — the older syntax

```sql
RAISERROR('Product does not exist.', 16, 1);
```

`RAISERROR` predates `THROW` and is still common in **existing** code —
recognize it, but prefer `THROW` for anything new. `RAISERROR`'s
arguments are a message, a **severity** level (`16` is a common
"user-caused" error severity), and a state — a different argument shape
than `THROW`'s.

## Key terms

| Term | Meaning |
|---|---|
| `THROW` | Raises a custom error — the modern, recommended way |
| `THROW;` (no args, in `CATCH`) | Re-raises the exact error that was just caught |
| `RAISERROR` | The older syntax for raising a custom error |

## Lab

Run the `THROW` example against AdventureWorks2012 (it will raise an
error, on purpose, since `ProductID = 99999` doesn't exist) and confirm
the message appears.

## Check yourself

You're ready for Lesson 78 when you can answer, without looking: what
does `THROW` with no arguments do inside a `CATCH` block, and which
syntax — `THROW` or `RAISERROR` — should you use for new code?
