# Lesson 107 — Schema Locks (Sch-S, Sch-M)

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 8 of 30**

## What you'll learn

- Why a table's *schema* needs its own, separate lock category
- What Sch-S (schema stability) protects, and when it's taken
- What Sch-M (schema modification) protects, and why it's incompatible
  with everything
- The real-world symptom: `ALTER TABLE` blocking, or being blocked by,
  ordinary queries

## Locks on data vs. locks on structure

Every lock type covered so far — shared, exclusive, update, intent — is
about **data**: specific rows, or claims about rows. But a table has a
second thing that can change underneath a running query: its **schema** —
its columns, their data types, constraints. SQL Server needs a separate
lock category to protect that, because a column disappearing mid-query is
a very different problem than a row being edited mid-query.

## Schema stability (Sch-S)

A **schema stability (Sch-S)** lock is taken automatically during normal
query compilation and execution — essentially every time you run a
`SELECT`, `UPDATE`, or similar statement against a table. Its only job is
to guarantee the table's structure doesn't change while that query is
being planned and run.

```sql
USE AdventureWorks2012;
GO

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ProductID = 680;
-- Takes a Sch-S lock on Production.Product for the duration
-- of this statement, in addition to the row-level S lock.
```

Sch-S locks are compatible with each other, and with ordinary data
locks (S, X, U, intent locks) — they don't interfere with normal
concurrent querying at all. They only conflict with one thing.

## Schema modification (Sch-M)

A **schema modification (Sch-M)** lock is taken during DDL operations —
`ALTER TABLE`, adding or dropping a column, adding a constraint, and
similar structural changes. Sch-M is incompatible with **everything**,
including Sch-S. That's deliberate: if a column could be dropped while a
query elsewhere was mid-execution against that same table, the query could
fail or return nonsense partway through.

```sql
-- Session A
ALTER TABLE Production.Product
ADD TestColumn INT NULL;
-- Takes a Sch-M lock on Production.Product
```

## The symptom developers actually hit

This is why an `ALTER TABLE` against a busy table can seem to hang, and
why it can also make *other* queries hang:

```sql
-- Session B, running at the same time as Session A's ALTER TABLE above
SELECT * FROM Production.Product WHERE ProductID = 680;
-- This ordinary SELECT needs a Sch-S lock -- and Sch-M conflicts with Sch-S.
-- If Session A's ALTER TABLE is still running, Session B waits.
```

```sql
-- Equally, if Session B's SELECT (holding Sch-S) was already running when
-- Session A tried the ALTER TABLE, Session A's Sch-M request would be the
-- one waiting instead -- for every Sch-S holder to finish first.
```

Either direction is possible: a long-running query can delay a structural
change, and a structural change can delay ordinary queries, because
Sch-M and Sch-S are mutually exclusive in both directions.

## Why this matters in practice

On a busy production table, this is the real explanation behind "why did
my `ALTER TABLE` just sit there for two minutes" — it was waiting for
every Sch-S-holding query already in flight to finish, since none of them
could be forced to release early. Running schema changes during low-traffic
windows, and keeping the DDL statement itself fast, are the practical
responses to this behavior.

## Key terms

| Term | Meaning |
|---|---|
| Schema stability (Sch-S) | Taken during normal query execution; prevents schema changes mid-query |
| Schema modification (Sch-M) | Taken during DDL (ALTER TABLE, etc.); incompatible with everything, including Sch-S |

## Lab

Open two SSMS windows against AdventureWorks2012. In the first, run a
query that takes a while (for example, a `SELECT` with a deliberately
inefficient join, or simply pause after `BEGIN TRANSACTION; SELECT * FROM
Production.Product;` without committing). In the second, try `ALTER TABLE
Production.Product ADD TestColumn INT NULL;` while the first is still
running, and observe it wait. Then roll back or finish the first and
clean up with `ALTER TABLE Production.Product DROP COLUMN TestColumn;`.

## Check yourself

You're ready for Lesson 108 when you can answer, without looking: what's
the difference between what Sch-S and Sch-M each protect, and why can an
ordinary `SELECT` end up blocking an `ALTER TABLE` (or vice versa)?
