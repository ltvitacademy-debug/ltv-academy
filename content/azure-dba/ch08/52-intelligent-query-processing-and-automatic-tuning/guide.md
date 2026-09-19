# Lesson 52 — Intelligent Query Processing & Automatic Tuning

**Chapter 8 · Query Performance Tuning · Lesson 52 of 95**

## What you'll learn

- Intelligent Query Processing (IQP): the database improving a plan automatically, based on what actually ran
- Automatic Tuning: Azure SQL detecting and fixing a plan regression on its own, using Query Store data
- Why these features don't replace Lessons 44-51 — they handle a specific class of problem, not every problem
- Chapter 8 is complete: the whole troubleshooting toolkit, from methodology to full automation

## Everything before this lesson was manual

Lessons 44-51 taught you to read a plan yourself, find a missing
index yourself, use Query Store yourself, and query DMVs yourself.
That's real, necessary skill — but SQL Server and Azure SQL also
have real, genuinely automatic capabilities that act *without* a
DBA running a query first. This lesson is about those.

## Intelligent Query Processing: fixing a bad estimate at runtime

The optimizer builds a plan based on *estimated* row counts before a
query ever runs. When that estimate is wrong — a classic cause of
bad plans — IQP features can correct course *while the query is
still executing*, without you doing anything:

```
Batch Mode on Rowstore:   processes rows in batches instead of one
                          at a time, even for a plain rowstore table
                          (not just columnstore)
Memory Grant Feedback:    if a query was granted too much or too
                          little memory last time, the NEXT execution
                          adjusts the grant based on what actually
                          happened
Adaptive Joins:           the plan picks between a Nested Loops join
                          and a Hash Join AFTER seeing the actual row
                          count, not before
```

None of these require a DBA to enable anything special beyond a
current-enough compatibility level — they're the optimizer getting
measurably smarter about correcting its own estimates, using
Lesson 45's plan-reading skill to actually recognize when one of
these kicked in.

## Automatic Tuning: closing the loop on Lesson 49's regressions

Lesson 49 taught you to use Query Store to manually find and force a
plan for a regressed query. **Automatic Tuning** does that same job
without a human:

```sql
ALTER DATABASE CURRENT
SET AUTOMATIC_TUNING (FORCE_LAST_GOOD_PLAN = ON);
```

With this on, Azure SQL monitors Query Store for a statistically
significant regression, automatically forces the last known-good
plan, and — critically — keeps watching afterward, automatically
reverting if the forced plan turns out not to actually help. A DBA
still needs to know Lesson 49's manual process, because Automatic
Tuning won't catch every regression (a genuinely new query has no
"last good plan" to fall back to), and understanding what it did
after the fact still requires reading Query Store.

```sql
-- See what Automatic Tuning has done
SELECT * FROM sys.dm_db_tuning_recommendations;
```

## What automation doesn't replace

IQP and Automatic Tuning both work from a plan that already exists
or an estimate the optimizer already made — neither one will design
a missing index for you (Lesson 47), diagnose a blocking chain
(Lesson 50), or tell you your methodology should start with wait
stats (Lesson 44). They're a real, valuable layer on top of the
manual skills this chapter built, not a substitute for them.

## Chapter 8 is complete

Methodology first, then reading a plan, then the specific operators
in it, then finding the indexes that plan is missing, then Query
Store for history, then blocking/locking/deadlocks, then DMVs for
what's happening right now, and finally the automation that handles
a real slice of this work without you. That's the full toolkit —
20-25% of the real DP-300 exam, and genuinely the deepest section in
this entire course.

## Key terms

| Term | Meaning |
|---|---|
| Intelligent Query Processing (IQP) | Runtime plan corrections based on actual data, not just the upfront estimate |
| Adaptive Joins | A join strategy chosen after seeing the actual row count, not before |
| Automatic Tuning | Azure SQL automatically detecting and reverting a Query Store-tracked plan regression |

## Check yourself

You're ready for Chapter 9 when you can explain, without looking: why
does Automatic Tuning still require a DBA who understands Lesson 49's
manual Query Store process, even once it's turned on?
