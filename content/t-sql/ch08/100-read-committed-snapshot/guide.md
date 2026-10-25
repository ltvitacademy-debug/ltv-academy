# Lesson 100 — READ COMMITTED SNAPSHOT (RCSI)

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 24 of 30**

## What you'll learn

- What RCSI actually is: a database setting, not a session-level isolation level
- How it changes what `READ COMMITTED` means, without any application code change
- The key difference between RCSI and full `SNAPSHOT` isolation
- Why many real production systems turn this on

## RCSI is a database setting, not something a session chooses

Every isolation level so far in this cluster — `READ UNCOMMITTED`
through `SNAPSHOT` — is something a **session** opts into with `SET
TRANSACTION ISOLATION LEVEL`. **RCSI** is different: it's a **database-
level** setting, turned on once by whoever administers the database:

```sql
ALTER DATABASE AdventureWorks2012
SET READ_COMMITTED_SNAPSHOT ON;
```

Once that's on, **every** session's ordinary `READ COMMITTED` — the
default from Lesson 96, including code that never says `SET TRANSACTION
ISOLATION LEVEL` at all — silently starts behaving differently. No
application code changes, no redeploy, nothing for a developer to opt
into. The application still says (or implies) `READ COMMITTED`; the
*engine* now fulfills that under the hood using row versioning instead
of locking.

```sql
-- After RCSI is turned on, this exact same query from Lesson 96
-- behaves differently under the hood, with zero code changes:
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 1000;
```

## How it changes READ COMMITTED's behavior

Without RCSI, `READ COMMITTED` reads use shared locks and can be
**blocked** by another transaction's uncommitted write — they wait
until that writer commits or rolls back, then read the now-committed
value. With RCSI on, a `READ COMMITTED` read instead gets served a
**versioned, last-committed** copy of the row immediately, with no
waiting at all — exactly the non-blocking benefit `SNAPSHOT` gives you,
but automatically, for ordinary default-level code.

## The key difference from full SNAPSHOT isolation

This is the distinction worth getting precise: RCSI gives you a fresh,
newly-versioned read on **every statement** — each new `SELECT` in a
transaction can see a different, more recent committed state, same as
ordinary `READ COMMITTED` always could. Full `SNAPSHOT` isolation
(Lesson 99) instead fixes **one single consistent snapshot for the whole
transaction**, from start to finish. RCSI still allows nonrepeatable
reads and phantom reads, for the exact same underlying reason ordinary
`READ COMMITTED` does — it just does its reading without blocking.

| | RCSI | SNAPSHOT |
|---|---|---|
| Scope | Database-level setting | Session-level isolation level |
| Consistency | Fresh version each **statement** | One fixed version for the **whole transaction** |
| Still allows | Nonrepeatable reads, phantom reads | Neither — but can hit write-write conflicts (3960) |

## Why production systems enable this

RCSI is popular precisely because it requires **no application code
change** — flip one database setting, and reader/writer blocking drops
dramatically for every ordinary query, without anyone having to rewrite
queries to say `SNAPSHOT` explicitly or restructure transactions. It's
one of the highest-leverage, lowest-risk tuning changes available for a
busy OLTP database suffering from reader/writer contention.

## Key terms

| Term | Meaning |
|---|---|
| RCSI | Database-level setting that makes ordinary READ COMMITTED use row versioning instead of locks |
| `READ_COMMITTED_SNAPSHOT` | The database option name that turns RCSI on |
| Fresh per statement | RCSI's key difference from full SNAPSHOT isolation |

## Lab

Run the `ALTER DATABASE ... SET READ_COMMITTED_SNAPSHOT ON;` statement
against AdventureWorks2012. Then re-run the Lesson 92 dirty-read-style
timeline, but this time have Session B simply run an ordinary `SELECT`
under default `READ COMMITTED` while Session A holds an open,
uncommitted `UPDATE` on the same row — confirm Session B's read returns
immediately with the last-committed value, instead of blocking.

## Check yourself

You're ready for Lesson 101 when you can answer, without looking: is
RCSI a session setting or a database setting, and what's the precise
difference between what RCSI guarantees and what full `SNAPSHOT`
isolation guarantees?
