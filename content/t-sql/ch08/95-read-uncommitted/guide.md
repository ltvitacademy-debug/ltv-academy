# Lesson 95 — READ UNCOMMITTED

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 19 of 30**

## What you'll learn

- The syntax for `READ UNCOMMITTED`
- Exactly what it does under the hood: reads that don't take or honor shared locks
- Why it allows all three classic anomalies
- When (rarely) it's actually an acceptable trade-off

## The syntax

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
```

Or, scoped to a single query instead of the whole session, with a table
hint:

```sql
SELECT ProductID, Name, ListPrice
FROM Production.Product WITH (NOLOCK)
WHERE ListPrice > 1000;
```

Both produce the exact same behavior: this query doesn't take shared
locks for its own reads, and it doesn't **honor** other sessions'
exclusive locks either. It reads whatever is physically sitting in the
data pages right now, committed or not.

## What it allows: all three anomalies

`READ UNCOMMITTED` is the loosest level there is, and it shows: it's the
only level where all three classic anomalies from Lessons 92–94 can all
happen.

| Anomaly | Possible under READ UNCOMMITTED? |
|---|---|
| Dirty read (Lesson 92) | Yes — this is the *only* level where it's possible |
| Nonrepeatable read (Lesson 93) | Yes |
| Phantom read (Lesson 94) | Yes |

It's not just "allows more than other levels" — it's the single level
responsible for the dirty read being possible at all. Every other level
in this cluster rules that one out completely.

## Why anyone would ever use it

`READ UNCOMMITTED` trades away correctness for raw concurrency: no
blocking on reads, ever, at the cost of potentially wrong answers. That's
rarely acceptable for anything touching money, inventory, or anything
else where correctness actually matters — getting the price or quantity
wrong because of a dirty read is a real bug, not a curiosity.

Where it sometimes shows up: rough, approximate reporting queries
against a busy OLTP table where being off by a row or two for a moment
is genuinely fine, and the alternative (blocking real transactional work)
is worse. Even then, `RCSI` (Lesson 100) is usually the better modern
answer — it gets you the same non-blocking reads **without** the dirty-read
risk, because it reads a last-committed version instead of in-flight data.

## Key terms

| Term | Meaning |
|---|---|
| `READ UNCOMMITTED` | Loosest isolation level; reads don't take or honor shared locks |
| `WITH (NOLOCK)` | Per-query table hint with the same effect |
| All three anomalies | Dirty reads, nonrepeatable reads, and phantom reads are all possible here |

## Lab

Run this against AdventureWorks2012 and confirm it returns results
immediately, with no blocking, even if you have another session holding
an open, uncommitted transaction on the same table:

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
```

Then re-run the Lesson 92 dirty-read lab, if you haven't already, to see
this level's specific risk made concrete.

## Check yourself

You're ready for Lesson 96 when you can answer, without looking: which
anomalies does `READ UNCOMMITTED` allow, and what's the practical
difference between `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED`
and `WITH (NOLOCK)`?
