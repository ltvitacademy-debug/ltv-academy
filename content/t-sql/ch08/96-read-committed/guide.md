# Lesson 96 — READ COMMITTED (the Default)

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 20 of 30**

## What you'll learn

- Why `READ COMMITTED` is the level you've been using all along, by default
- Exactly what it prevents, and exactly what it still allows
- How its locking actually behaves, statement by statement
- How to confirm what level a session is currently running under

## You've been using this the whole course

Every query you've written in this course so far, unless you explicitly
said otherwise, ran under `READ COMMITTED` — it's SQL Server's **default**
isolation level for every new connection:

```sql
-- No SET TRANSACTION ISOLATION LEVEL line at all --
-- this already runs under READ COMMITTED.
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
```

You can also set it explicitly, which is good practice in code that
needs to be unambiguous about what it's relying on:

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

## What it prevents: dirty reads

`READ COMMITTED` guarantees exactly what its name says: every read only
ever sees **committed** data. Go back to the Lesson 92 dirty-read
timeline — under `READ COMMITTED`, Session B's read would simply
**block**, waiting for Session A's exclusive lock to release (via commit
or rollback), instead of reading the in-flight 9999.00 value. That's the
one guarantee every level from here up always provides.

## What it still allows: nonrepeatable and phantom reads

`READ COMMITTED` does **not** hold its shared locks for the whole
transaction — only for as long as each individual statement's read
takes. The moment that one `SELECT` finishes, the lock is released, even
if the surrounding transaction is still open. That's exactly the gap the
Lesson 93 nonrepeatable-read timeline walks through: Session A's first
read releases its lock immediately, leaving room for Session B's
`UPDATE` to commit before Session A's second read. Phantom reads
(Lesson 94) are allowed for the same underlying reason — nothing is
locking the gaps a predicate covers.

## Confirming what level you're running under

```sql
DBCC USEROPTIONS;
```

Look for the `isolation level` row in the result set — it tells you
exactly what the current session is using, which matters because this
setting is easy to forget you changed earlier in a session.

## Key terms

| Term | Meaning |
|---|---|
| `READ COMMITTED` | SQL Server's default isolation level |
| Prevents | Dirty reads only |
| Still allows | Nonrepeatable reads, phantom reads |
| Lock duration | Shared locks held only for each statement's read, not the whole transaction |

## Lab

Run `DBCC USEROPTIONS;` in a fresh query window against
AdventureWorks2012 and confirm the `isolation level` row reads `read
committed` before you've set anything explicitly. Then re-run the
Lesson 93 nonrepeatable-read lab under this level (it's the default, so
no `SET` statement is needed) and confirm the second read still shows the
updated value.

## Check yourself

You're ready for Lesson 97 when you can answer, without looking: which
single anomaly does `READ COMMITTED` prevent, which two does it still
allow, and why — in terms of how long its locks are actually held?
