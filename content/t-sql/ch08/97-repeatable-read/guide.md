# Lesson 97 — REPEATABLE READ

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 21 of 30**

## What you'll learn

- The syntax for `REPEATABLE READ`
- Exactly what it prevents, and the one anomaly it still doesn't
- How it actually enforces that: holding shared locks for the whole transaction
- The real concurrency cost of making that guarantee

## The syntax

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;

SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;

-- ... do other work ...

SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
-- Guaranteed to return the SAME value as the first read.

COMMIT TRANSACTION;
```

## What it prevents: dirty reads AND nonrepeatable reads

`REPEATABLE READ` gives you everything `READ COMMITTED` gives you — no
dirty reads — **plus** the guarantee from Lesson 93's title: if you read
a row once inside a transaction, reading that **same** row again inside
the **same** transaction is guaranteed to return the **same** value. Go
back to the nonrepeatable-read timeline: under `REPEATABLE READ`,
Session B's `UPDATE` would **block** the instant it tried to touch the
row Session A already read — it would simply wait until Session A's
transaction finished.

## How it actually does this

The mechanism is simple: `REPEATABLE READ` holds its **shared locks**
on every row it has read **until the transaction ends** — not released
after each statement, the way `READ COMMITTED`'s are. That's the entire
difference between the two levels. Anyone trying to modify a row you've
already read has to wait for your transaction to commit or roll back
first.

## What it still allows: phantom reads

This is the detail from Lesson 94 worth repeating here: `REPEATABLE
READ` locks rows it has **already seen** — it has no mechanism to stop a
**new** row from being inserted that would also match your query's
criteria. Re-run the same `SELECT COUNT(*)` twice inside a `REPEATABLE
READ` transaction, and a concurrent `INSERT` can still change the count
between the two runs. That gap is only closed by `SERIALIZABLE`
(Lesson 98).

## The concurrency cost

Holding shared locks for the whole transaction, instead of releasing
them immediately, means other sessions trying to **write** to rows
you've read have to wait longer — for as long as your transaction stays
open. A `REPEATABLE READ` transaction that reads a lot of rows and then
sits open for a while can cause real, measurable blocking for other
sessions trying to update that data. This is the trade-off Lesson 91
previewed: more correctness, less concurrency.

## Key terms

| Term | Meaning |
|---|---|
| `REPEATABLE READ` | Holds shared locks on read rows for the whole transaction |
| Prevents | Dirty reads, nonrepeatable reads |
| Still allows | Phantom reads |
| Cost | Longer-held locks block other sessions' writes for longer |

## Lab

Re-run the Lesson 93 nonrepeatable-read lab, but add `SET TRANSACTION
ISOLATION LEVEL REPEATABLE READ;` before `BEGIN TRANSACTION` in Window
1. Confirm that Window 2's `UPDATE` now **blocks** instead of committing
immediately, until you commit or roll back Window 1's transaction.

## Check yourself

You're ready for Lesson 98 when you can answer, without looking: what
exactly does `REPEATABLE READ` lock, for how long, and why does that
still leave phantom reads possible?
