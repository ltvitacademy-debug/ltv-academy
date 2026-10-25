# Lesson 106 — Intent Locks (IS, IX, SIX)

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 7 of 30**

## What you'll learn

- The expensive problem intent locks solve
- What IS, IX, and SIX mean, and where each is taken
- Why intent locks live at a *higher* level than the lock they describe
- How this connects forward to lock escalation (Lesson 109)

## The expensive problem: checking for conflicts

Imagine a table-level operation — say, something that needs to lock the
entire `Production.Product` table — running at the same time another
session holds a plain row lock somewhere inside that table. For the
table-level operation to know whether it can proceed, SQL Server would, in
the naive case, have to check **every single row** in the table for a
conflicting lock. On a table with millions of rows, that's an enormous,
unacceptable amount of work just to answer one yes/no question.

## Intent locks: a signal flag at the higher level

SQL Server avoids that row-by-row scan with **intent locks**. An intent
lock is taken at a level *above* where the real lock actually lives — at
the page or table level — purely to say "a lock is held somewhere below
this." It's a flag, not a lock on the data itself.

- **Intent Shared (IS)**: taken on a table (or page) to signal that a
  shared lock is held on some row or page underneath it.
- **Intent Exclusive (IX)**: taken on a table (or page) to signal that an
  exclusive lock is held on some row or page underneath it.
- **Shared with Intent Exclusive (SIX)**: a combination — the transaction
  holds a shared lock on the whole table (so it can read all of it) *and*
  intends to take exclusive locks on specific rows or pages within it.

```sql
USE AdventureWorks2012;
GO

BEGIN TRANSACTION;

UPDATE Production.Product
SET ListPrice = 25.00
WHERE ProductID = 680;
-- Row-level: an X lock on the ProductID 680 row
-- Table-level: an IX lock on Production.Product itself,
--              signaling "an X lock exists somewhere inside this table"
```

## Why this is fast

Now when another session wants a table-level lock on
`Production.Product`, it doesn't need to scan every row. It only has to
check the **intent locks already present at the table level**. Seeing an
IX lock there is enough information to know "yes, an exclusive lock exists
somewhere below — conflict" without ever inspecting an individual row.
That's the entire point: intent locks turn an expensive, row-by-row
conflict check into a cheap, constant-time check at one level of the
hierarchy.

## Intent locks follow the same compatibility logic

Intent locks mirror the compatibility rules of the real locks they
represent — IS behaves like S for compatibility purposes at that level,
IX like X, and so on — but applied one level up. An IX at the table level
conflicts with a plain table-level S or X lock request from another
session, because that other session's request would need to know nothing
below the table can be touched, and an existing IX tells it something
already is.

## Where you'll see this again

Intent locks are the mechanism SQL Server's optimizer leans on when
deciding, and checking, what granularity to use for a given statement
(Lesson 108), and they're part of the bookkeeping behind lock escalation
(Lesson 109) — escalating many row locks to a table lock still has to
account for, and clear, the intent locks tracking those row locks along
the way.

## Checking it with sys.dm_tran_locks

While the `UPDATE` above is open, querying `sys.dm_tran_locks` shows *two*
rows for that one transaction: one with `resource_type = 'OBJECT'` (the
table) and `request_mode = 'IX'`, and one with `resource_type = 'KEY'` (or
`RID`) and `request_mode = 'X'` for the specific row. Lesson 110 covers
reading this view fully.

## Key terms

| Term | Meaning |
|---|---|
| Intent Shared (IS) | Signals a shared lock exists somewhere below this level |
| Intent Exclusive (IX) | Signals an exclusive lock exists somewhere below this level |
| Shared with Intent Exclusive (SIX) | Shared lock on the whole resource, plus intent to take exclusive locks within it |

## Lab

Open an SSMS window against AdventureWorks2012, start a transaction, run
the `UPDATE` above, and leave it open. In a second window, run `SELECT
resource_type, request_mode, request_session_id FROM sys.dm_tran_locks
WHERE request_session_id = <the first session's ID>;` and identify which
row shows the IX lock and which shows the X lock.

## Check yourself

You're ready for Lesson 107 when you can answer, without looking: what
problem do intent locks solve, and why is checking an IX lock at the table
level cheaper than scanning every row for conflicts?
