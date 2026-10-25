# Lesson 103 — Shared (S) Locks

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 4 of 30**

## What you'll learn

- What a shared (S) lock is, and which statements take one
- Why readers don't block other readers
- When SQL Server releases a shared lock under the default isolation level
- How this connects to the lock manager from Lesson 102

## The lock an ordinary read takes

A plain `SELECT`, running under SQL Server's default isolation level
(READ COMMITTED), takes a **shared (S) lock** on the rows it reads. "Shared"
is the key word: shared locks are compatible with other shared locks, so
any number of transactions can hold a shared lock on the exact same
resource at the exact same time.

```sql
USE AdventureWorks2012;
GO

-- Session A
SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
```

```sql
-- Session B, run at the same moment
SELECT Name, ListPrice
FROM Production.Product
WHERE ProductID = 680;
```

Unlike the exclusive-lock scenario in Lesson 102, neither of these queries
blocks the other. Both sessions can hold a shared lock on `ProductID = 680`
simultaneously, because reading doesn't change anything — there's nothing
for two readers to corrupt by looking at the same row at once.

## Reads don't block reads — but they do interact with writes

A shared lock *is* still a lock. It isn't compatible with an **exclusive**
lock (Lesson 104) — the kind a write takes. That's why, in Lesson 102's
example, Session B's `SELECT` had to wait: it was requesting a shared lock
against a row where Session A already held an exclusive lock, and shared
and exclusive locks always conflict.

The rule to hold onto: shared locks conflict with writers, never with other
readers.

## When shared locks are released

Under READ COMMITTED (the default, covered fully in Lesson 119), a shared
lock is **not** held for the whole transaction — it's released as soon as
the read of that row finishes, even if the surrounding transaction hasn't
committed yet. This is different from an exclusive lock, which is held
until `COMMIT` or `ROLLBACK` (Lesson 104).

```sql
BEGIN TRANSACTION;

SELECT * FROM Production.Product WHERE ProductID = 680;
-- the shared lock on ProductID 680 is released right here,
-- even though this transaction is still open

SELECT * FROM Production.Product WHERE ProductID = 681;
-- a NEW shared lock is taken on this different row

COMMIT TRANSACTION;
```

This matters because it's exactly what makes a **nonrepeatable read**
(Lesson 116) possible later in this chapter: because the shared lock on row
680 was released immediately, nothing stops another transaction from
changing that row before this transaction commits.

## Checking it with sys.dm_tran_locks

You'll build real fluency with this DMV in Lesson 110, but as a preview:
while Session A's transaction above is paused mid-way (say, right after the
first `SELECT`, before running the second), querying
`sys.dm_tran_locks` from a third window shows the granted lock state for
every active request, including the `request_mode` column — which reads
`S` for a shared lock.

## Key terms

| Term | Meaning |
|---|---|
| Shared (S) lock | Taken for reads; compatible with other shared locks, not with exclusive locks |
| `request_mode = S` | How a shared lock shows up in `sys.dm_tran_locks` |
| READ COMMITTED | Default isolation level; releases shared locks as soon as the read completes |

## Lab

Open two SSMS windows against AdventureWorks2012. In both, run a plain
`SELECT * FROM Production.Product WHERE ProductID = 680;` at roughly the
same time. Confirm neither one blocks the other. Then repeat Lesson 102's
exercise — one window running the open `UPDATE` transaction, the other
running this `SELECT` — and confirm the `SELECT` blocks this time.

## Check yourself

You're ready for Lesson 104 when you can answer, without looking: why can
two sessions hold a shared lock on the same row at once, and what kind of
lock does a shared lock actually conflict with?
