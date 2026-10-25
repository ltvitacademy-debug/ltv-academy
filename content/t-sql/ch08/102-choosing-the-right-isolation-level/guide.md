# Lesson 102 — Choosing the Right Isolation Level for the Job

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 26 of 30**

## What you'll learn

- A practical decision framework for choosing among all six isolation levels
- Why most OLTP workloads don't need anything stricter than the default
- When REPEATABLE READ or SERIALIZABLE are actually worth their cost
- Where SNAPSHOT and RCSI fit best

## The rule that ties this whole cluster together

Pick the **loosest** level that still prevents the specific anomalies
your business logic actually cares about — nothing stricter. Every level
stricter than you need is pure cost: more blocking, less throughput,
for a guarantee nothing in your code is actually relying on. This is
the dial from Lesson 91, made into an actual decision.

## Start here: READ COMMITTED or RCSI, for almost everything

Most everyday OLTP workloads — looking up an order, updating a customer
record, processing a single transaction at a time — are completely fine
at `READ COMMITTED` (Lesson 96), SQL Server's default. It prevents the
one anomaly (the dirty read) that's almost always unacceptable, and it's
cheap. If reader/writer blocking is a measurable problem on a busy
system, reach for `RCSI` (Lesson 100) next — same guarantees, no code
changes, far less blocking:

```sql
ALTER DATABASE AdventureWorks2012
SET READ_COMMITTED_SNAPSHOT ON;
-- Keeps every existing query's behavior at the READ COMMITTED level,
-- just served without blocking.
```

## Reach for REPEATABLE READ or SERIALIZABLE only when the logic demands it

Only move stricter than `READ COMMITTED`/RCSI when a **specific,
nameable** correctness requirement genuinely needs it:

- Use `REPEATABLE READ` (Lesson 97) when a transaction reads a value,
  makes a decision based on it, and **must** be sure that value hasn't
  moved by the time it acts on it again — and a nonrepeatable read would
  be a real bug, not a curiosity.
- Use `SERIALIZABLE` (Lesson 98) only when even a **phantom** row
  appearing or vanishing mid-transaction would break the logic — for
  example, an exact reconciliation that must sum to the same total
  across multiple queries inside one transaction.

Both cost real concurrency. Don't reach for them "to be safe" — reach
for them because you can name the anomaly that would otherwise bite you.

## SNAPSHOT and RCSI: the strong default for reporting and read-heavy work

For reporting and analytics-style workloads that read a lot of data and
shouldn't block, or be blocked by, the OLTP writers hitting the same
tables, `SNAPSHOT` (Lesson 99) and `RCSI` are usually the best fit —
consistent reads, no blocking either direction, at the cost of handling
an occasional write-write conflict (3960) if the workload does write.

## A worked decision, start to finish

A nightly batch job needs to count open orders at the start of a run and
compare that count to the count at the end, and the counts **must**
match exactly for the job's reconciliation check to pass, even with
other sessions actively inserting and cancelling orders throughout the
run. A phantom row appearing mid-run would fail that reconciliation —
so this is exactly the case `SERIALIZABLE` exists for:

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
    -- count open orders, do the batch work, count again --
    -- guaranteed to match, because no phantom can slip in.
COMMIT TRANSACTION;
```

Everything else this job touches that doesn't have that exact
requirement should stay at `READ COMMITTED` or `RCSI` — don't let one
section's genuine need for `SERIALIZABLE` push the entire application
to running stricter than it has to.

## Key terms

| Term | Meaning |
|---|---|
| Decision rule | Pick the loosest level that still prevents the anomalies your logic actually needs stopped |
| Default choice | READ COMMITTED or RCSI, for almost all OLTP workloads |
| Reserve for a reason | REPEATABLE READ / SERIALIZABLE only when a named anomaly would be a real bug |
| Reporting workloads | SNAPSHOT / RCSI — consistent, non-blocking reads |

## Lab

For each scenario below, name the loosest isolation level that's
actually sufficient, and the anomaly (if any) that rules out anything
looser: (1) displaying a product's current price on a web page; (2) a
funds-transfer transaction that debits one account and credits another
and must never see a half-updated balance elsewhere; (3) a nightly report
that must reconcile an exact row count across two queries in one
transaction, with other sessions actively writing.

## Check yourself

You're ready for Lesson 103 (Concurrency and Blocking) when you can
answer, without looking: what's the one governing rule for choosing an
isolation level, and can you justify, by name, which specific anomaly
would justify moving past READ COMMITTED or RCSI for a given piece of
business logic?
