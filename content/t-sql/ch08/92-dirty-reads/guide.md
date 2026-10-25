# Lesson 92 — Dirty Reads

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 16 of 30**

## What you'll learn

- What a dirty read actually is
- Why it can only happen under `READ UNCOMMITTED`
- A concrete two-session timeline showing exactly how it goes wrong
- Why `NOLOCK` has the same effect as `READ UNCOMMITTED`

## The anomaly, in one sentence

A **dirty read** happens when your transaction reads data that another
transaction has **written but not yet committed** — and that other
transaction then **rolls back**. You read a value that, in the end, never
really existed in the database at all.

## A two-session timeline

Picture two sessions against AdventureWorks2012, both touching the same
row in `Production.Product`.

**Session A** starts a transaction and changes a price, but doesn't
commit yet:

```sql
-- SESSION A
BEGIN TRANSACTION;

UPDATE Production.Product
SET ListPrice = 9999.00
WHERE ProductID = 680;

-- ...pauses here. Not committed. Not rolled back. Just open.
```

**Session B**, running under `READ UNCOMMITTED`, reads that same row
*while Session A's transaction is still open*:

```sql
-- SESSION B
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
-- Returns 9999.00 — Session A's uncommitted change.
```

Session B now believes the price is `9999.00`. But Session A isn't done:

```sql
-- SESSION A, continued
ROLLBACK TRANSACTION;
-- The price change never happened. The real ListPrice is back
-- to whatever it was before.
```

Session B read a value that, as far as the database is concerned, **never
existed**. That's the dirty read: not stale data, not a timing
coincidence — a value with no committed history behind it at all.

## Why this only happens under READ UNCOMMITTED

Every other isolation level requires a transaction to only read **committed**
data — that's the one guarantee `READ COMMITTED` (Lesson 96) and
everything stricter than it always provides. `READ UNCOMMITTED` (Lesson
95) is the single exception: it deliberately skips honoring other
sessions' locks on reads, which is exactly what let Session B see Session
A's in-flight change.

## NOLOCK is the same thing

You'll also see this requested with a table hint instead of a session
setting:

```sql
SELECT ListPrice
FROM Production.Product WITH (NOLOCK)
WHERE ProductID = 680;
```

`WITH (NOLOCK)` produces the **same effect** as running under `READ
UNCOMMITTED` for that one query — reads that don't take or honor shared
locks, and so can return uncommitted, possibly-never-real data.

## Key terms

| Term | Meaning |
|---|---|
| Dirty read | Reading another transaction's uncommitted data, which may later be rolled back |
| `READ UNCOMMITTED` | The only standard isolation level where dirty reads are possible |
| `WITH (NOLOCK)` | Table hint with the same dirty-read-permitting effect as READ UNCOMMITTED |

## Lab

Open two query windows against AdventureWorks2012. In Window 1, run the
`BEGIN TRANSACTION` / `UPDATE` from above and leave it open (don't commit
or roll back yet). In Window 2, run the `SET TRANSACTION ISOLATION LEVEL
READ UNCOMMITTED` `SELECT` and watch it return the in-flight value
immediately — no waiting. Then go back to Window 1 and run `ROLLBACK
TRANSACTION`.

## Check yourself

You're ready for Lesson 93 when you can answer, without looking: what
exactly is a dirty read, which isolation level allows it, and why does
`WITH (NOLOCK)` produce the same risk?
