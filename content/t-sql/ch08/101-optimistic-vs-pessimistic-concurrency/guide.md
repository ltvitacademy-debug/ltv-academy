# Lesson 101 — Optimistic vs. Pessimistic Concurrency

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 25 of 30**

## What you'll learn

- The two fundamental strategies every isolation level in this cluster falls into
- Which levels are pessimistic, and which are optimistic
- The trade-off each strategy is actually making
- An application-level pattern (a rowversion column) that extends optimistic concurrency outside the database engine

## Two philosophies, one underlying question

Every mechanism covered in Lessons 95–100 answers the same question —
"what happens when two transactions might touch the same data at the
same time?" — with one of two fundamentally different philosophies.

## Pessimistic concurrency: assume a conflict, prevent it

**Pessimistic** concurrency assumes conflicts are **likely**, and
prevents them up front by **blocking** other sessions before a conflict
can even occur. This is every locking-based level from this cluster:

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  -- pessimistic (barely locks)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;     -- pessimistic
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;    -- pessimistic
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;        -- pessimistic (most so)
```

Each one just draws the line for *how much* to block in a different
place — but all four rely on locks making some other session physically
**wait**.

## Optimistic concurrency: assume no conflict, check at the end

**Optimistic** concurrency assumes conflicts are **rare**, and lets
every session proceed without blocking anyone — only dealing with a
conflict if one actually, concretely happens, at the moment of writing:

```sql
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;  -- optimistic

ALTER DATABASE AdventureWorks2012
  SET READ_COMMITTED_SNAPSHOT ON;          -- optimistic (for reads)
```

`SNAPSHOT` (Lesson 99) is the clearest example: it never blocks a reader
or a writer — it just detects the rare case of a genuine write-write
conflict (error 3960) after the fact and makes the second writer retry.

## Extending the idea beyond the database engine: rowversion

The same optimistic idea shows up as an **application-level pattern**,
using a `rowversion` (a.k.a. `timestamp`) column that automatically
changes on every update to a row:

```sql
CREATE TABLE dbo.Inventory (
    ProductID INT PRIMARY KEY,
    Quantity  INT NOT NULL,
    RowVer    ROWVERSION NOT NULL
);

-- The application reads Quantity AND RowVer together, then later:
UPDATE dbo.Inventory
SET Quantity = 42
WHERE ProductID = 680
  AND RowVer = @RowVerThatWasReadEarlier;
-- If RowVer no longer matches (someone else updated the row
-- in between), this UPDATE affects 0 rows -- the application
-- code checks @@ROWCOUNT and knows to reload and retry.
```

No database-level isolation setting is even involved here — this is
plain `READ COMMITTED`, with the application itself checking for a
conflict at write time, the same philosophy `SNAPSHOT` uses inside the
engine.

## The trade-off, side by side

| | Pessimistic (locking levels) | Optimistic (SNAPSHOT, RCSI, rowversion) |
|---|---|---|
| Assumption | Conflicts are likely | Conflicts are rare |
| Mechanism | Block other sessions up front | Let everyone proceed, detect conflicts at write time |
| Cost when conflicts are rare | Unnecessary blocking | Minimal — the common case is cheap |
| Cost when conflicts are frequent | Correctness, with real blocking | Frequent retries, wasted work |

## Key terms

| Term | Meaning |
|---|---|
| Pessimistic concurrency | Assumes conflicts are likely; blocks to prevent them (locking isolation levels) |
| Optimistic concurrency | Assumes conflicts are rare; proceeds without blocking, checks at write time |
| `ROWVERSION` | Application-level optimistic concurrency pattern using an auto-incrementing column |

## Lab

Create the `dbo.Inventory` table above in a scratch database, insert one
row, and read its `RowVer` value. Then, in a second session, update that
same row's `Quantity` (changing `RowVer` automatically). Back in the
first session, try the conditional `UPDATE` above using the **old**
`RowVer` value you originally read — confirm it affects `0` rows.

## Check yourself

You're ready for Lesson 102 when you can answer, without looking: which
of the six isolation levels are pessimistic and which are optimistic,
and how does a `ROWVERSION` column apply the same optimistic idea at the
application level?
