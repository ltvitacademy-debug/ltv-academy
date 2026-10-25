# Lesson 98 — SERIALIZABLE

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 22 of 30**

## What you'll learn

- The syntax for `SERIALIZABLE`
- Why it's the only standard level that prevents all three anomalies
- Range locks: the mechanism that makes this possible
- Why "strictest" also means "most blocking"

## The syntax

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;

SELECT COUNT(*) AS ProductCount
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;

-- ... do other work ...

SELECT COUNT(*) AS ProductCount
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;
-- Guaranteed to return the SAME count as the first read --
-- no row changed, and no row was added or removed, either.

COMMIT TRANSACTION;
```

## The one level that prevents all three anomalies

`SERIALIZABLE` is the strictest of the four ANSI isolation levels, and
it's the only one that prevents **every** anomaly covered in this
cluster:

| Anomaly | Prevented by SERIALIZABLE? |
|---|---|
| Dirty read (Lesson 92) | Yes |
| Nonrepeatable read (Lesson 93) | Yes |
| Phantom read (Lesson 94) | Yes — the one level that closes this gap |

## How: range locks, not just row locks

Go back to Lesson 94's phantom-read timeline. `REPEATABLE READ` couldn't
stop the phantom because it only locks rows it has **already** read —
there's nothing to lock for a row that doesn't exist yet.
`SERIALIZABLE` solves this with a fundamentally different kind of lock: a
**range lock**, which locks the entire **gap** a query's predicate
describes — in the example above, the whole span `ListPrice BETWEEN 500
AND 1000` — not just the specific rows that happen to match right now.

Under `SERIALIZABLE`, Session B's attempt to `INSERT` a new row with a
`ListPrice` of `799.00` would be **blocked** for as long as Session A's
transaction holds that range lock, because `799.00` falls inside the
locked gap. The insert has to wait until Session A commits or rolls
back.

## The cost: the most blocking of any standard level

This is the strictest point on the dial from Lesson 91, and it comes
with the heaviest concurrency cost of the four ANSI levels: range locks
can block not just updates to existing rows, but entirely new inserts
that fall within a locked predicate's range. A `SERIALIZABLE`
transaction that reads broadly and stays open for a while can meaningfully
stall other sessions' writes across a whole swath of a table, not just
specific rows.

## When it's actually worth it

Reach for `SERIALIZABLE` only when a specific piece of business logic
genuinely cannot tolerate a phantom — for example, a report that must
reconcile to an exact, unchanging total across multiple queries within
one transaction, where even one new matching row appearing mid-calculation
would produce a wrong result. For the vast majority of everyday
application code, `REPEATABLE READ` or even `READ COMMITTED` is enough,
and costs far less concurrency.

## Key terms

| Term | Meaning |
|---|---|
| `SERIALIZABLE` | Strictest ANSI isolation level; prevents dirty, nonrepeatable, and phantom reads |
| Range lock | Locks the entire "gap" a predicate covers, not just existing matching rows |
| Cost | Most blocking of any standard isolation level |

## Lab

Re-run the Lesson 94 phantom-read lab, but add `SET TRANSACTION
ISOLATION LEVEL SERIALIZABLE;` before `BEGIN TRANSACTION` in Window 1.
Confirm that Window 2's `INSERT` of a matching row now **blocks**
instead of committing immediately.

## Check yourself

You're ready for Lesson 99 when you can answer, without looking: what
makes `SERIALIZABLE` able to prevent phantom reads when `REPEATABLE
READ` can't, and what's the real-world cost of that extra guarantee?
