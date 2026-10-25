# Lesson 109 — Lock Escalation

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 10 of 30**

## What you'll learn

- What lock escalation is, and the real threshold that triggers it
- Why SQL Server does this automatically, with no setting to request it
- The real-world symptom: a big batch job suddenly blocking everyone else
- How this connects back to granularity (Lesson 108) and intent locks
  (Lesson 106)

## The problem: too many row locks

Lesson 108 covered why row-level locking gives the best concurrency but
the most overhead — every individual row lock is a small amount of memory
and bookkeeping, and a statement that touches a huge number of rows can
accumulate an enormous number of them.

SQL Server has an automatic safety valve for exactly this: **lock
escalation**. When a single statement's row (or page) locks on one table
or index cross a threshold — **around 5,000 locks** held by that
statement — SQL Server automatically converts, or **escalates**, all of
those fine-grained locks into a single table-level lock instead.

## Why escalation makes sense

Once escalation happens, SQL Server no longer has to track 5,000+
individual lock entries for that statement — it tracks one table lock
instead, which is far cheaper in memory and management overhead. From the
engine's perspective, this is a reasonable trade: past a certain point,
the overhead of fine granularity outweighs the concurrency it buys.

## Why it's a surprise to developers

Here's the real-world consequence that actually matters on the job: a
large batch operation can **start out perfectly well-behaved**, taking
ordinary row locks that don't bother anyone else, and then **escalate
partway through** once it crosses the threshold:

```sql
USE AdventureWorks2012;
GO

BEGIN TRANSACTION;

UPDATE Sales.SalesOrderDetail
SET UnitPriceDiscount = 0.05
WHERE ProductID = 870;
-- If this touches only a few hundred rows: stays at row-level locking,
-- other sessions reading/writing different rows are unaffected.
-- If it touches thousands of rows across the table: crosses the
-- ~5,000-lock threshold partway through and escalates to a table lock.

COMMIT TRANSACTION;
```

Other sessions that were querying completely unrelated rows in
`Sales.SalesOrderDetail` a moment ago — and were perfectly fine while the
batch update was still using row locks — suddenly start blocking once
escalation kicks in, because the table lock covers every row, not just the
ones the batch update actually cares about. This is one of the single most
common real-world causes of "why did the whole app just freeze for thirty
seconds" on a system that otherwise runs fine.

## There's no setting to request escalation — but you can influence it

Escalation isn't something you turn on; it's a built-in behavior. The
practical responses, when it's causing real problems, are things like
breaking a large batch operation into smaller batches (each comfortably
under the lock-count threshold, each in its own shorter transaction) so no
single statement ever accumulates enough locks to trigger it.

## How this connects to intent locks

Lesson 106 covered intent locks as the mechanism that lets a table-level
lock request check for conflicts cheaply, without scanning every row.
Escalation is where that machinery gets exercised directly: converting
thousands of row-level locks to one table lock means clearing those row
locks and establishing the table-level lock (and the intent locks that
accompanied the row locks) in their place.

## Key terms

| Term | Meaning |
|---|---|
| Lock escalation | Converting many fine-grained row/page locks into one table lock automatically |
| Escalation threshold | Roughly 5,000 locks held by a single statement on one table/index |
| Mid-statement escalation | A batch operation can start with row locks and escalate to a table lock partway through |

## Lab

Open two SSMS windows against AdventureWorks2012. In the first, run a
large `UPDATE` affecting many thousands of rows inside an explicit
transaction you keep open (for example, an `UPDATE` with a broad `WHERE`
clause against `Sales.SalesOrderDetail`). In the second, try reading a row
you're confident isn't in that update's result set, both early (while it's
likely still row-level) and once the first statement has had time to run
longer — if escalation triggers, the second window's read will start
blocking.

## Check yourself

You're ready for Lesson 110 when you can answer, without looking: roughly
what lock-count threshold triggers escalation, and why can a big batch
`UPDATE` suddenly start blocking sessions it wasn't blocking a moment
earlier?
