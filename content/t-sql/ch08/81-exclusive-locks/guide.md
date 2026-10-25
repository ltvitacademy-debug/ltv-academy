# Lesson 104 — Exclusive (X) Locks

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 5 of 30**

## What you'll learn

- What an exclusive (X) lock is, and which statements take one
- Why an exclusive lock blocks readers AND other writers
- How long an exclusive lock is held, compared to a shared lock
- How this shows up in `sys.dm_tran_locks`

## The lock a write takes

Any statement that modifies data — `INSERT`, `UPDATE`, `DELETE` — takes an
**exclusive (X) lock** on the rows it changes. "Exclusive" means exactly
what it sounds like: only one transaction can hold an exclusive lock on a
given resource at a time, and no other transaction can hold *any* kind of
lock on that resource while it's held — not a shared lock, not another
exclusive lock.

```sql
USE AdventureWorks2012;
GO

-- Session A
BEGIN TRANSACTION;

UPDATE Production.Product
SET ListPrice = 25.00
WHERE ProductID = 680;
-- Session A now holds an X lock on this row; left open on purpose
```

## An exclusive lock blocks both readers and writers

This is the key difference from the shared lock in Lesson 103. A shared
lock only conflicted with exclusive locks — other readers were fine.
An exclusive lock conflicts with **everything**:

```sql
-- Session B, while Session A's transaction above is still open
SELECT ListPrice FROM Production.Product WHERE ProductID = 680;
-- BLOCKS: a shared-lock request against an X-locked row
```

```sql
-- Session C, at the same time
UPDATE Production.Product
SET ListPrice = 30.00
WHERE ProductID = 680;
-- ALSO BLOCKS: an X-lock request against an already X-locked row
```

Both Session B and Session C sit and wait until Session A's transaction
ends. This is the real-world meaning of "a writer blocks readers and other
writers" — and it's correct, necessary behavior. If two sessions could both
write the same row at once, whichever write happened to finish last would
silently overwrite the other, with no error and no warning.

## Exclusive locks are held to the end of the transaction

Unlike a shared lock — released as soon as the individual read finishes,
even under READ COMMITTED — an exclusive lock is held for the **entire
remaining duration of the transaction**, until `COMMIT TRANSACTION` or
`ROLLBACK TRANSACTION` runs:

```sql
BEGIN TRANSACTION;

UPDATE Production.Product SET ListPrice = 25.00 WHERE ProductID = 680;
-- X lock taken, held...

UPDATE Production.Product SET ListPrice = 40.00 WHERE ProductID = 681;
-- a second X lock taken, ALSO held...

COMMIT TRANSACTION;
-- ONLY NOW are both X locks released
```

This is exactly why keeping transactions short matters in practice (a
theme that returns in Lesson 130's deadlock-prevention advice): the longer
a transaction stays open after taking an exclusive lock, the longer every
other session waiting on that row sits blocked.

## Checking it with sys.dm_tran_locks

While Session A's transaction above is paused and open, querying
`sys.dm_tran_locks` from another window shows a row with `request_mode =
'X'` and `request_status = 'GRANT'` for Session A's `request_session_id`,
and — once Session B or C tries to touch that row — a second row for
their request with `request_status = 'WAIT'`. Lesson 110 covers this DMV
in full.

## Key terms

| Term | Meaning |
|---|---|
| Exclusive (X) lock | Taken for writes; incompatible with every other lock, including another X lock and a shared lock |
| `request_mode = X` | How an exclusive lock shows up in `sys.dm_tran_locks` |
| Held duration | An X lock is held until `COMMIT` or `ROLLBACK`, unlike a shared lock |

## Lab

Open three SSMS windows against AdventureWorks2012. In the first, run the
`BEGIN TRANSACTION` / `UPDATE` above against `ProductID = 680` and leave it
open. In the second, run a plain `SELECT` against the same row. In the
third, run an `UPDATE` against the same row. Confirm both the second and
third windows block, then `COMMIT` the first and watch both release.

## Check yourself

You're ready for Lesson 105 when you can answer, without looking: what two
categories of request does an exclusive lock block, and how long is an
exclusive lock held compared to a shared lock?
