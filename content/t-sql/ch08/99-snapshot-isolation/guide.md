# Lesson 99 — SNAPSHOT Isolation

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 23 of 30**

## What you'll learn

- What row versioning is, and how it's a completely different approach from everything in Lessons 95–98
- How to enable and use `SNAPSHOT` isolation
- Why readers don't block writers, and writers don't block readers, under SNAPSHOT
- The one conflict SNAPSHOT still can't avoid: the write-write conflict

## A different idea entirely: versioning instead of locking

Every level you've seen so far — `READ UNCOMMITTED` through
`SERIALIZABLE` — is **pessimistic**: it assumes conflicts are likely and
uses locks to physically block other sessions from stepping on your
transaction's toes. `SNAPSHOT` isolation throws that approach out
entirely. Instead of locks, it uses **row versioning**: every time a row
changes, SQL Server keeps enough information to reconstruct what that
row looked like **before** the change. A `SNAPSHOT` transaction reads
from a consistent point-in-time copy of the data — as it looked at the
**start** of the transaction — no matter what anyone else commits while
it's running.

## Turning it on: two steps

`SNAPSHOT` isolation must be explicitly enabled at the **database**
level before any session can use it:

```sql
ALTER DATABASE AdventureWorks2012
SET ALLOW_SNAPSHOT_ISOLATION ON;
```

Only after that will this succeed:

```sql
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;
BEGIN TRANSACTION;

SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
-- Sees the data exactly as of the moment this transaction started.

COMMIT TRANSACTION;
```

## Why readers don't block writers, and writers don't block readers

Because a `SNAPSHOT` read is served from a versioned copy, not from the
live row, it never needs to wait on another session's exclusive lock —
and a writer never needs to wait on a `SNAPSHOT` reader's shared lock,
because there isn't one to wait on. This is the real-world payoff: a
long-running `SNAPSHOT` report can run against a table that's being
actively updated, and neither side blocks the other at all.

## The one conflict it can't avoid: write-write conflicts

Row versioning solves blocking for **reads**, but two transactions can
still both try to **write** to the same row, each starting from the same
snapshot. SQL Server detects this and raises **error 3960** — it won't
silently let the second writer overwrite a change based on stale data:

```sql
-- Session A and Session B both open a SNAPSHOT transaction,
-- both read ProductID 680's current ListPrice,
-- both then try to UPDATE that same row.
-- The SECOND one to attempt its UPDATE gets:
-- Msg 3960: Snapshot isolation transaction aborted due to
-- update conflict.
```

Whichever transaction commits its write first wins; the second one is
rolled back and has to retry.

## Key terms

| Term | Meaning |
|---|---|
| `SNAPSHOT` | Session-level isolation using row versioning instead of locking |
| `ALLOW_SNAPSHOT_ISOLATION` | Database-level setting that must be ON before SNAPSHOT can be used |
| Write-write conflict | Error 3960 — two SNAPSHOT transactions both try to write the same row |

## Lab

Run the `ALTER DATABASE` statement above against AdventureWorks2012 once
(it only needs to be set once per database). Then open two sessions:
in Window 1, `SET TRANSACTION ISOLATION LEVEL SNAPSHOT; BEGIN
TRANSACTION;` and read a product's `ListPrice`. In Window 2, `UPDATE`
that same row under ordinary `READ COMMITTED` and commit it. Back in
Window 1, read the same row again — confirm it still shows the
**original** value, because Window 1 is reading its own fixed snapshot.

## Check yourself

You're ready for Lesson 100 when you can answer, without looking: what's
the fundamental difference between how `SNAPSHOT` and `SERIALIZABLE`
each prevent anomalies, and what happens when two `SNAPSHOT`
transactions try to write the same row?
