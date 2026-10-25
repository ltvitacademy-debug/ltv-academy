# Lesson 111 — What Is a Deadlock?

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 12 of 30**

## What you'll learn

- The exact structure of a deadlock: two transactions, two resources, a
  cycle
- Why this is different from ordinary blocking
- SQL Server's deadlock monitor and how it picks a victim
- Error 1205 — what it means when you see it

## Blocking vs. deadlocking

You've already seen plenty of ordinary **blocking** in this chapter —
Session B waiting for Session A to release a lock. Ordinary blocking
resolves itself: Session A eventually commits or rolls back, and Session
B proceeds. A **deadlock** is a specific, more severe situation where
blocking can *never* resolve itself, because two (or more) transactions
are each waiting on the other.

## The classic two-resource deadlock

```sql
USE AdventureWorks2012;
GO

-- Session A
BEGIN TRANSACTION;

UPDATE Production.Product
SET ListPrice = 25.00
WHERE ProductID = 680;
-- Session A now holds an X lock on Product 680

-- (pause here)

UPDATE Production.Product
SET ListPrice = 30.00
WHERE ProductID = 681;
-- Session A now WANTS an X lock on Product 681
```

```sql
-- Session B, running between Session A's two statements
BEGIN TRANSACTION;

UPDATE Production.Product
SET ListPrice = 40.00
WHERE ProductID = 681;
-- Session B holds an X lock on Product 681

-- (pause here)

UPDATE Production.Product
SET ListPrice = 45.00
WHERE ProductID = 680;
-- Session B now WANTS an X lock on Product 680
```

Trace the cycle: Session A holds 680, wants 681. Session B holds 681,
wants 680. Each is waiting on a lock the other one holds, and neither can
proceed, because neither will release what it holds until it finishes —
and neither can finish until it gets what the other is holding. That's a
genuine cycle, with no way out on its own.

## SQL Server's deadlock monitor

SQL Server doesn't just let a cycle like this sit forever. A background
process called the **deadlock monitor** periodically checks the lock
graph for exactly this kind of cycle. When it finds one, it picks one of
the involved transactions as the **deadlock victim**, kills that
transaction, and rolls it back — which releases its locks, letting the
*other* transaction finally proceed.

## Error 1205

The victim's session doesn't just quietly disappear — it receives error
**1205**, something like: *"Transaction (Process ID n) was deadlocked on
lock resources with another process and has been chosen as the deadlock
victim. Rerun the transaction."* That message is SQL Server telling you
exactly what happened and what to do about it: the transaction was rolled
back, and it's expected to be retried.

## How the victim is chosen

SQL Server generally picks the transaction that is **cheapest to roll
back** (based on the amount of work it would take to undo), not
necessarily the one that "started" the deadlock or is somehow at fault.
Either session in a deadlock can end up as the victim.

## Why this is expected, not exceptional

A genuinely well-designed, busy system can still produce deadlocks
occasionally under concurrent load — it isn't automatically a sign of
broken code. Lesson 113 covers the real, standard techniques for reducing
how often deadlocks happen, and for handling error 1205 gracefully in
application code when one does.

## Key terms

| Term | Meaning |
|---|---|
| Deadlock | Two or more transactions each waiting on a lock the other holds, forming a cycle |
| Deadlock monitor | SQL Server's background process that detects deadlock cycles |
| Deadlock victim | The transaction chosen to be killed and rolled back to break the cycle |
| Error 1205 | The error returned to the victim's session |

## Lab

Open two SSMS windows against AdventureWorks2012 and reproduce the
scenario above: Session A updates Product 680 then pauses before
updating 681; Session B updates 681 then pauses before updating 680,
timed so both pauses overlap. Run Session A's second `UPDATE`, then
Session B's second `UPDATE`. Watch one session receive error 1205 while
the other proceeds and completes.

## Check yourself

You're ready for Lesson 112 when you can answer, without looking: what
makes a deadlock different from ordinary blocking, and what does SQL
Server actually do once its deadlock monitor detects one?
