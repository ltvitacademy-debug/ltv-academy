# Lesson 91 — What Is a Transaction Isolation Level?

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 15 of 30**

## What you'll learn

- What a transaction isolation level actually controls
- Why isolation is a **dial**, not a simple on/off switch
- The three classic read anomalies every isolation level deals with differently
- The names of every isolation level SQL Server supports

## Isolation is a dial, not a switch

You've spent this chapter so far on **locks** (Lessons 79–90) — the
mechanism SQL Server uses to keep one transaction's in-progress work from
corrupting another's. An **isolation level** is how you control *how much*
of that protection a transaction actually gets, with `SET TRANSACTION
ISOLATION LEVEL`:

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;

SELECT OrderQty, UnitPrice
FROM Sales.SalesOrderDetail
WHERE SalesOrderDetailID = 1;

COMMIT TRANSACTION;
```

Every isolation level makes the same fundamental trade-off, just at a
different point on the dial:

- **Stricter isolation** → fewer anomalies, more correctness guarantees,
  but more blocking and less concurrency (Lesson 75, coming up next).
- **Looser isolation** → less blocking, more throughput, but more ways
  for a transaction to see data that's wrong, inconsistent, or that
  changes out from under it.

There's no single "correct" setting. The right level depends on what a
specific piece of business logic actually needs — which is exactly what
the rest of this cluster works through, level by level.

## The three classic anomalies (previewed here, taught next)

Every isolation level is defined by which of these three problems it
allows and which it prevents. The next three lessons each take one apart
in full with a two-session timeline:

| Anomaly | In one sentence | Lesson |
|---|---|---|
| Dirty read | You read another transaction's **uncommitted** change | Lesson 92 |
| Nonrepeatable read | The same row gives you a **different value** on a second read | Lesson 93 |
| Phantom read | The same query returns a **different set of rows** on a second run | Lesson 94 |

Notice the progression: each anomaly is a slightly more subtle version of
the same root problem — other sessions changing data while your
transaction is still in flight.

## The ANSI standard levels

The SQL standard defines four isolation levels, and SQL Server implements
all four exactly as named:

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  -- loosest
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;     -- SQL Server's default
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;        -- strictest
```

Each one, moving down that list, prevents strictly more anomalies than
the one before it — and costs strictly more concurrency to do it. Lessons
95–98 take each of these four in turn.

## SQL Server's own additions

SQL Server also ships two mechanisms the ANSI standard doesn't require,
both built on **row versioning** instead of locking:

```sql
-- A session-level isolation level, like the four above:
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;

-- A database-level setting that changes what READ COMMITTED means
-- for every session in that database:
ALTER DATABASE AdventureWorks2012 SET READ_COMMITTED_SNAPSHOT ON;
```

`SNAPSHOT` (Lesson 99) is a session-level choice, same as the four ANSI
levels. **RCSI** — Read Committed Snapshot Isolation (Lesson 100) — is
different: it's a database-wide setting an administrator flips once, and
it quietly changes the *implementation* of ordinary `READ COMMITTED` for
every query in that database, without any application code change at
all.

## Key terms

| Term | Meaning |
|---|---|
| Isolation level | Setting that controls which read anomalies a transaction can and can't experience |
| `SET TRANSACTION ISOLATION LEVEL` | T-SQL statement that sets the isolation level for the current session |
| ANSI levels | READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE |
| SQL Server additions | SNAPSHOT (session-level) and RCSI (database-level) — both row-versioning based |

## Lab

Run this against AdventureWorks2012 and confirm it executes without
error — you're just confirming the syntax, not expecting a different
result yet:

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT @@TRANCOUNT AS OpenTransactions;
```

Then try `DBCC USEROPTIONS;` in the same session — look for the
`isolation level` row in the output to confirm what's currently active.

## Check yourself

You're ready for Lesson 92 when you can answer, without looking: name
the three classic read anomalies, and name all six isolation levels SQL
Server supports (four ANSI, plus SQL Server's own two).
