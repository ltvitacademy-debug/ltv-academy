# Lesson 20 — Cross-System Reconciliation Checks

**Chapter 4 · Rules and Checks · Lesson 20 of 30**

## What you'll learn

- What reconciliation means, and how it scales up the comparison
  pattern from earlier lessons to whole tables and systems
- The two most common reconciliation checks: count reconciliation and
  sum reconciliation
- How to reconcile data that lives across two databases using a
  linked server (or a staged copy)
- Why a reconciliation mismatch is a symptom, not a diagnosis

## What reconciliation means

**Reconciliation** asks a scaled-up version of the consistency
question from Lesson 13: instead of comparing one row's value to
another system's copy of that row, you compare an **aggregate** —
a row count, a sum, a total — between two systems that are both
supposed to represent the same underlying reality.

This is the exact check a finance team runs at month-end: does the
total in the general ledger match the total in the subledger? Does the
order count in the e-commerce platform match the order count that
landed in the data warehouse? Reconciliation is consistency checking,
scaled from "does this row agree" to "does this *entire dataset*
agree."

## Count reconciliation

The simplest and most common check: do the two systems agree on *how
many* records exist for a given scope (a date, a batch, a customer)?

```sql
-- Compare order counts between source and warehouse for a given day
SELECT
    (SELECT COUNT(*) FROM dbo.SourceOrders
     WHERE OrderDate = '2026-10-03') AS SourceCount,
    (SELECT COUNT(*) FROM dbo.WarehouseOrders
     WHERE OrderDate = '2026-10-03') AS WarehouseCount;
```

A mismatch here is one of the most useful signals in the entire
quality program — it almost always means something concrete: a failed
load, a filter that's silently excluding rows, or a duplicate batch
that ran twice.

## Sum reconciliation

Counts catch missing or extra *rows*. Sums catch a different failure
mode — the right number of rows, with the wrong *values*:

```sql
SELECT
    (SELECT SUM(OrderTotal) FROM dbo.SourceOrders
     WHERE OrderDate = '2026-10-03') AS SourceTotal,
    (SELECT SUM(OrderTotal) FROM dbo.WarehouseOrders
     WHERE OrderDate = '2026-10-03') AS WarehouseTotal;
```

Row counts can match perfectly while the sums disagree — a sign that
individual values got corrupted, mis-mapped, or double-converted
(a currency conversion applied twice is a classic cause) somewhere in
the pipeline between the two systems.

## Reconciling across two databases

When both tables live in the same SQL Server instance, a plain `JOIN`
or two subqueries (as above) are enough. When the second system is a
genuinely separate database — even a separate server — a **linked
server** lets you query it from within the same script:

```sql
SELECT
    (SELECT COUNT(*) FROM dbo.SourceOrders
     WHERE OrderDate = '2026-10-03') AS SourceCount,
    (SELECT COUNT(*) FROM [LinkedWarehouseServer].WarehouseDb.dbo.WarehouseOrders
     WHERE OrderDate = '2026-10-03') AS WarehouseCount;
```

If a linked server isn't available or practical, the common
alternative is staging: land a extract from the second system into a
local staging table on a schedule, then reconcile against the staging
copy with ordinary local queries.

## A mismatch is a symptom, not a diagnosis

A reconciliation check that fails tells you *that* the two systems
disagree — it doesn't tell you *why*, and it doesn't tell you which
side is correct. Finding the actual cause (a failed load, a late
batch, a timezone boundary splitting one day's data across two load
windows) is root cause analysis — Lesson 23's subject. Reconciliation's
job is narrower and more valuable than it sounds: catch the
disagreement reliably, every time, before anyone downstream trusts a
number that's already wrong.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Comparing an aggregate (count, sum) between two systems that should agree |
| Count reconciliation | Comparing row counts for a matching scope between two systems |
| Sum reconciliation | Comparing a numeric total for a matching scope between two systems |
| Linked server | A SQL Server feature allowing a query to reference another server's database directly |

## Lab

1. Create two small test tables representing "source" and
   "warehouse" copies of the same order data, with a shared
   `OrderDate` and `OrderTotal` column.
2. Insert matching rows into both — then deliberately remove one row
   from only one table, and change one `OrderTotal` value in the
   other.
3. Write a count reconciliation query and a sum reconciliation query
   for a specific date, and confirm each one catches the discrepancy
   you introduced.
4. In a comment, note which discrepancy (the missing row or the
   changed total) each query caught — and confirm the *other* query
   didn't also catch it, to see firsthand that counts and sums catch
   different failure modes.

## Check yourself

- Why can row counts match perfectly while a sum reconciliation still
  fails?
- What's the difference between reconciling two tables in the same
  database versus two systems on separate servers?
- Why does the lesson insist a reconciliation mismatch is a symptom,
  not a diagnosis?
