# Lesson 93 — Nonrepeatable Reads

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 17 of 30**

## What you'll learn

- What a nonrepeatable read actually is
- Why it's a different, subtler problem than a dirty read
- A two-session timeline showing the same row changing value mid-transaction
- Which isolation levels allow it, and which prevent it

## The anomaly, in one sentence

A **nonrepeatable read** happens when your transaction reads the **same
row twice**, and gets **different values** each time — because another
transaction **committed** an update to that row in between your two
reads. Unlike a dirty read, the value you saw the second time is
perfectly real and committed. The problem is that your own transaction
wasn't supposed to see the ground shift under it mid-flight.

## A two-session timeline

**Session A** opens a transaction and reads a price:

```sql
-- SESSION A
BEGIN TRANSACTION;

SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
-- Returns 34.99.
```

**Session B** commits an update to that same row, fully, start to
finish, while Session A's transaction is still open:

```sql
-- SESSION B
UPDATE Production.Product
SET ListPrice = 49.99
WHERE ProductID = 680;
-- No open transaction here -- this commits immediately (autocommit).
```

**Session A** reads the *same row again*, still inside its original,
still-open transaction:

```sql
-- SESSION A, continued
SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
-- Returns 49.99 -- a different value than the first read, 34.99.

COMMIT TRANSACTION;
```

Session A asked the identical question twice, within a single logical
unit of work, and got two different answers. That inconsistency — not a
dirty, never-real value, but a real, legitimate, *moving* value — is the
nonrepeatable read.

## Which levels allow it, and which prevent it

`READ UNCOMMITTED` (Lesson 95) allows it, same as it allows everything —
it isn't holding any locks to prevent Session B's update at all.

`READ COMMITTED` (Lesson 96) — SQL Server's default — **also** allows it.
It prevents *dirty* reads (it only ever reads committed data), but its
shared locks are released as soon as each individual statement's read
finishes, not held for the whole transaction. That's exactly the gap
Session B's commit slipped through.

`REPEATABLE READ` (Lesson 97) is where this gets fixed: it holds a shared
lock on every row it has read until its own transaction ends, which would
have **blocked** Session B's `UPDATE` until Session A committed or rolled
back — preventing the second read from ever disagreeing with the first.

`SERIALIZABLE` (Lesson 98) prevents it too, since it's strictly stricter
than `REPEATABLE READ`.

## Key terms

| Term | Meaning |
|---|---|
| Nonrepeatable read | Reading the same row twice in one transaction and getting two different committed values |
| Allowed under | READ UNCOMMITTED, READ COMMITTED |
| Prevented by | REPEATABLE READ, SERIALIZABLE |

## Lab

Open two query windows against AdventureWorks2012. In Window 1, run the
`BEGIN TRANSACTION` / first `SELECT` above and leave the transaction
open. In Window 2, run Session B's `UPDATE` (it will commit immediately
under default autocommit). Go back to Window 1 and run the second
`SELECT` — confirm it returns the new value, then `COMMIT TRANSACTION`.
Reset the price back to `34.99` when you're done.

## Check yourself

You're ready for Lesson 94 when you can answer, without looking: what
makes a nonrepeatable read different from a dirty read, and which
specific isolation level is the first one to prevent it?
