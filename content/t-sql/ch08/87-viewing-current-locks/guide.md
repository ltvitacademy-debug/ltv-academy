# Lesson 110 — Viewing Current Locks (sys.dm_tran_locks)

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 11 of 30**

## What you'll learn

- `sys.dm_tran_locks` — the real DMV for seeing lock state right now
- Its key columns: `resource_type`, `request_mode`, `request_status`,
  `request_session_id`
- How to read it to actually diagnose a blocking situation
- Tying every earlier lock type in this chapter back to one real view

## The view that makes all of this concrete

Every lesson in this chapter so far has described lock behavior you had
to take on faith, or catch briefly mid-transaction in another window.
`sys.dm_tran_locks` is the real, standard **dynamic management view**
that shows you SQL Server's actual, current lock state — every lock
currently granted or waiting, system-wide, at the moment you query it.

```sql
SELECT
    resource_type,
    resource_database_id,
    request_mode,
    request_status,
    request_session_id
FROM sys.dm_tran_locks;
```

## The four columns that matter most

- **`resource_type`**: what kind of thing is locked — `OBJECT` (a whole
  table), `PAGE`, `KEY` (a row, in an indexed table), `RID` (a row, in a
  heap with no clustered index), among others.
- **`request_mode`**: which lock type is held or wanted — `S`, `X`, `U`,
  `IS`, `IX`, `SIX`, `Sch-S`, `Sch-M`, matching exactly the lock types
  covered earlier in this chapter.
- **`request_status`**: `GRANT` if the lock is actually held, `WAIT` if
  the session is blocked waiting for it.
- **`request_session_id`**: which session (`SPID`) holds or is waiting
  for that lock — this is what lets you connect a row in this view back
  to an actual blocked query.

## A worked example

Reopen Lesson 104's exclusive-lock scenario and actually look at it
through this view:

```sql
USE AdventureWorks2012;
GO

-- Session A
BEGIN TRANSACTION;
UPDATE Production.Product
SET ListPrice = 25.00
WHERE ProductID = 680;
-- left open on purpose
```

```sql
-- Session B, at the same time
SELECT ListPrice FROM Production.Product WHERE ProductID = 680;
-- blocks
```

```sql
-- Session C, a third window
SELECT resource_type, request_mode, request_status, request_session_id
FROM sys.dm_tran_locks
WHERE request_session_id IN (<Session A's SPID>, <Session B's SPID>);
```

Session C's query shows Session A's rows with `request_status = 'GRANT'`
— including a `KEY`/`X` row for the specific product, and an `OBJECT`/`IX`
row for the table, exactly as Lesson 106 described. It also shows Session
B's row with `request_status = 'WAIT'` and `request_mode = 'S'` — the
plain `SELECT` stuck behind Session A's exclusive lock.

## Why this is the go-to diagnostic step

When something is "just hanging" in production, `sys.dm_tran_locks` is
the first place to actually confirm it's a locking issue — rather than
guessing — and to identify exactly which session is the one holding the
lock everyone else is waiting on. From there, you can look at what that
session is actually running (via `sys.dm_exec_requests`, joined on
`session_id`) to decide whether to let it finish or intervene.

## Key terms

| Column | Meaning |
|---|---|
| `resource_type` | What's locked: `OBJECT`, `PAGE`, `KEY`, `RID`, etc. |
| `request_mode` | The lock type: `S`, `X`, `U`, `IS`, `IX`, `SIX`, `Sch-S`, `Sch-M` |
| `request_status` | `GRANT` (held) or `WAIT` (blocked) |
| `request_session_id` | The SPID holding or waiting for the lock |

## Lab

Recreate the worked example above across two SSMS windows, then query
`sys.dm_tran_locks` from a third. Identify the exact row that shows
Session A's exclusive lock, and the exact row that shows Session B
waiting on a shared lock for the same resource.

## Check yourself

You're ready for Lesson 111 when you can answer, without looking: which
column tells you whether a lock is actually held versus just waiting, and
which column lets you trace a lock back to the session that owns it?
