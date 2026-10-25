# Lesson 75 — AFTER Triggers (INSERT/UPDATE/DELETE)

**Chapter 7 · Programming with T-SQL · Lesson 14 of 16**

## What you'll learn

- `CREATE TRIGGER ... ON table AFTER INSERT, UPDATE, DELETE AS BEGIN ... END` syntax
- The `inserted` and `deleted` pseudo-tables available inside a trigger
- Why an `AFTER` trigger runs inside the same transaction as the change
- Rolling back from within a trigger

## Writing an AFTER trigger

An **`AFTER` trigger** is code that runs automatically once a triggering
`INSERT`, `UPDATE`, or `DELETE` against a table has completed — but
before that transaction finally commits:

```sql
USE AdventureWorks2012;
GO

CREATE TABLE dbo.ProductPriceAudit
(
    ProductID   int,
    OldPrice    money,
    NewPrice    money,
    ChangedAt   datetime2 DEFAULT SYSDATETIME()
);
GO

CREATE TRIGGER trg_Product_PriceAudit
ON Production.Product
AFTER UPDATE
AS
BEGIN
    INSERT INTO dbo.ProductPriceAudit (ProductID, OldPrice, NewPrice)
    SELECT i.ProductID, d.ListPrice, i.ListPrice
    FROM inserted AS i
    JOIN deleted AS d ON d.ProductID = i.ProductID
    WHERE i.ListPrice <> d.ListPrice;
END;
```

You can fire a single trigger on more than one event at once —
`AFTER INSERT, UPDATE, DELETE` — and check which operation actually
happened inside the body if the logic needs to branch.

## `inserted` and `deleted`: the pseudo-tables

Inside any trigger body, SQL Server makes two special, automatically
populated tables available, scoped to just that trigger's execution:

- **`inserted`** — the **new** version of every affected row. Populated
  on `INSERT` (the new rows) and `UPDATE` (the rows after the change).
- **`deleted`** — the **old** version of every affected row. Populated
  on `DELETE` (the removed rows) and `UPDATE` (the rows before the
  change).

An `UPDATE`, in other words, populates **both**: `deleted` holds the
"before" picture, `inserted` holds the "after" picture — which is
exactly how the audit trigger above captures an old price and a new
price in a single `JOIN` between them.

## It runs inside the same transaction

An `AFTER` trigger doesn't run as a separate, independent step — it
executes **inside the same transaction** as the statement that fired
it, before that transaction commits. That has a real consequence: if
the trigger body raises an error, or explicitly issues a `ROLLBACK`,
the **entire original operation is undone**, not just whatever the
trigger itself was doing.

```sql
CREATE TRIGGER trg_Product_NoNegativePrice
ON Production.Product
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE ListPrice < 0)
    BEGIN
        RAISERROR('ListPrice cannot be negative.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
```

If that `UPDATE` tries to set a negative `ListPrice`, the trigger rolls
the whole update back — the row never actually ends up negative, even
though the `UPDATE` statement itself "ran."

## Key terms

| Term | Meaning |
|---|---|
| `AFTER` trigger | Runs after the triggering INSERT/UPDATE/DELETE, inside the same transaction, before commit |
| `inserted` | Pseudo-table holding new row values (INSERT and UPDATE) |
| `deleted` | Pseudo-table holding old row values (DELETE and UPDATE) |

## Lab

Create the audit table and `trg_Product_PriceAudit` trigger above, then
run an `UPDATE` against `Production.Product` that changes `ListPrice`
for a few rows. Query `dbo.ProductPriceAudit` afterward to confirm each
old/new pair was captured.

## Check yourself

You're ready for Lesson 76 when you can answer, without looking: which
pseudo-table (or tables) is populated on an `INSERT`, a `DELETE`, and an
`UPDATE`, and what happens to the original statement if an `AFTER`
trigger issues a `ROLLBACK`?
