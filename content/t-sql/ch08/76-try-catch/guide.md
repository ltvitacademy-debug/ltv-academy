# Lesson 76 — TRY/CATCH Error Handling

**Chapter 8 · Transactions and Error Handling · Lesson 5 of 7**

## What you'll learn

- `TRY`/`CATCH` — catching an error instead of letting the script crash
- The functions that describe what went wrong: `ERROR_MESSAGE()` and friends
- Combining `TRY`/`CATCH` with transactions
- Where `CATCH` picks up execution

## The problem: unhandled errors stop everything

Without error handling, a runtime error (a failed `CAST`, a constraint
violation, a deadlock — Lesson 75) simply **stops** the batch at that
point, and the error propagates up to whatever called it. `TRY`/`CATCH`
lets you **intercept** that error and decide what happens next.

## Basic TRY/CATCH

```sql
USE AdventureWorks2012;
GO

BEGIN TRY
    SELECT 1 / 0; -- a deliberate error: division by zero
END TRY
BEGIN CATCH
    PRINT 'An error occurred: ' + ERROR_MESSAGE();
END CATCH
```

Code inside `BEGIN TRY ... END TRY` runs normally. The instant a runtime
error occurs inside that block, execution jumps **immediately** to
`BEGIN CATCH ... END CATCH`, skipping whatever remained in the `TRY`
block. If no error occurs, `CATCH` never runs at all.

## Functions that describe the error

```sql
BEGIN TRY
    SELECT 1 / 0;
END TRY
BEGIN CATCH
    PRINT 'Error number: ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
    PRINT 'Error message: ' + ERROR_MESSAGE();
    PRINT 'Error line: ' + CAST(ERROR_LINE() AS VARCHAR(10));
END CATCH
```

`ERROR_MESSAGE()`, `ERROR_NUMBER()`, and `ERROR_LINE()` are only
meaningful **inside** a `CATCH` block — they describe whatever error was
just caught, and return `NULL` outside of one.

## Combining with transactions

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Production.ProductInventory
    SET Quantity = Quantity - 10
    WHERE ProductID = 1 AND LocationID = 1;

    UPDATE Production.ProductInventory
    SET Quantity = Quantity + 10
    WHERE ProductID = 1 AND LocationID = 2;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Transfer failed: ' + ERROR_MESSAGE();
END CATCH
```

This is the pattern that ties Lessons 72, 73, and 76 together: if
**anything** inside the transaction fails, `CATCH` explicitly rolls it
back — guaranteeing atomicity even in the face of an unexpected error,
instead of leaving a partial change behind.

## Key terms

| Term | Meaning |
|---|---|
| `TRY`/`CATCH` | Intercepts a runtime error and runs alternate code instead of crashing |
| `ERROR_MESSAGE()` | The caught error's message text |
| `ERROR_NUMBER()` | The caught error's numeric code |

## Lab

Run the deliberate division-by-zero example above against
AdventureWorks2012 and confirm the `CATCH` block's `PRINT` runs.

## Check yourself

You're ready for Lesson 77 when you can answer, without looking: where
does execution jump to the instant an error occurs inside `TRY`, and why
should a transaction's `ROLLBACK` live inside the `CATCH` block?
