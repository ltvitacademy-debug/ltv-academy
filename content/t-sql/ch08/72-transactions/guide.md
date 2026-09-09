# Lesson 72 — Transactions: BEGIN/COMMIT/ROLLBACK

**Chapter 8 · Transactions and Error Handling · Lesson 1 of 7**

## What you'll learn

- What a transaction is — grouping statements into one all-or-nothing unit
- `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`
- Why this matters for multi-step data changes
- A real example: transferring value between two rows

## The problem: multi-step changes can fail halfway

Imagine moving stock from one warehouse location to another: subtract
from location A, add to location B — **two separate statements**. If the
first succeeds and the second fails (a network drop, a constraint
violation), you're left with stock that simply **vanished** — subtracted
from A, never added to B. A **transaction** prevents exactly this.

## BEGIN TRANSACTION / COMMIT

```sql
USE AdventureWorks2012;
GO

BEGIN TRANSACTION;

UPDATE Production.ProductInventory
SET Quantity = Quantity - 10
WHERE ProductID = 1 AND LocationID = 1;

UPDATE Production.ProductInventory
SET Quantity = Quantity + 10
WHERE ProductID = 1 AND LocationID = 2;

COMMIT TRANSACTION;
```

`BEGIN TRANSACTION` marks the start of a group of statements that must
**all** succeed together. `COMMIT TRANSACTION` makes every change inside
that group **permanent**, all at once. Until `COMMIT` runs, these changes
are provisional — visible within this session, but not yet permanently
saved.

## ROLLBACK — undoing everything in the transaction

```sql
BEGIN TRANSACTION;

UPDATE Production.ProductInventory
SET Quantity = Quantity - 10
WHERE ProductID = 1 AND LocationID = 1;

-- Something went wrong partway through:
ROLLBACK TRANSACTION;
```

`ROLLBACK TRANSACTION` undoes **every** change made since the matching
`BEGIN TRANSACTION` — as if none of it ever happened. This is the safety
net: if step two of a multi-step change fails, `ROLLBACK` prevents the
half-finished result from Lesson 72's opening example.

## Why this matters

Transactions guarantee that a group of related changes happens **as a
unit** — either **all** of them take effect, or **none** of them do. This
is essential for any operation where a partial completion would leave the
data in an inconsistent, incorrect state. Lesson 73 covers the formal
properties (**ACID**) that transactions are built to guarantee.

## Key terms

| Term | Meaning |
|---|---|
| Transaction | A group of statements treated as one all-or-nothing unit |
| `BEGIN TRANSACTION` | Starts a transaction |
| `COMMIT` | Makes all changes in the transaction permanent |
| `ROLLBACK` | Undoes all changes made since the transaction began |

## Lab

Run the `BEGIN TRANSACTION` / `ROLLBACK` example above against
AdventureWorks2012, then check `Production.ProductInventory` and confirm
the quantity was **not** actually changed.

## Check yourself

You're ready for Lesson 73 when you can answer, without looking: what
does `COMMIT` do that makes it different from just running the statements
without a transaction, and what does `ROLLBACK` undo?
