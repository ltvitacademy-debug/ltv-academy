# Lesson 94 — Phantom Reads

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 18 of 30**

## What you'll learn

- What a phantom read actually is
- Why it's different from a nonrepeatable read, even though both involve a second read disagreeing with the first
- A two-session timeline showing a new row appearing mid-transaction
- Why only `SERIALIZABLE` prevents it

## The anomaly, in one sentence

A **phantom read** happens when your transaction runs the **same query**
twice, and gets a **different set of rows** back — because another
transaction **inserted** (or **deleted**) rows matching your query's
criteria in between your two runs. The rows you already had don't
change value (that would be a nonrepeatable read, Lesson 93) — entirely
**new rows appear** (or ones you saw before **vanish**).

## A two-session timeline

**Session A** opens a transaction and counts products in a price range:

```sql
-- SESSION A
BEGIN TRANSACTION;

SELECT COUNT(*) AS ProductCount
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;
-- Returns, say, 14.
```

**Session B** inserts a brand-new row that matches that same range, and
commits it, while Session A's transaction is still open:

```sql
-- SESSION B
INSERT INTO Production.Product (Name, ProductNumber, ListPrice, ...)
VALUES ('Road Bike, New', 'BK-NEW-01', 799.00, ...);
-- Commits immediately.
```

**Session A** runs the *exact same query again*, still inside its
original transaction:

```sql
-- SESSION A, continued
SELECT COUNT(*) AS ProductCount
FROM Production.Product
WHERE ListPrice BETWEEN 500 AND 1000;
-- Returns 15 -- a brand-new row appeared that wasn't there before.

COMMIT TRANSACTION;
```

That extra row is the **phantom** — it wasn't in the first result set at
all, and it shows up in the second one purely because Session B inserted
it in between. The same thing happens in reverse if Session B had instead
**deleted** a row that matched Session A's criteria: a row simply
vanishes between the two runs.

## Why REPEATABLE READ doesn't help here

This is the detail that trips people up: `REPEATABLE READ` (Lesson 97)
holds locks on every row it has **already read**, which is exactly
enough to stop a nonrepeatable read. But Session B's new row **didn't
exist yet** when Session A's first query ran — there was no row there
for `REPEATABLE READ` to lock. `REPEATABLE READ` protects rows it has
seen; it does nothing to stop *new* rows from being inserted into the
gaps.

## Only SERIALIZABLE closes the gap

`SERIALIZABLE` (Lesson 98) is the one standard level that prevents
phantoms, and it does it with a different kind of lock entirely: a
**range lock**, which locks the *gap* a query's predicate covers — not
just the rows that happen to exist right now, but the whole range
`ListPrice BETWEEN 500 AND 1000` represents. Under `SERIALIZABLE`,
Session B's `INSERT` would be **blocked** until Session A's transaction
finished.

## The full picture across all three anomalies

| Anomaly | READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE |
|---|---|---|---|---|
| Dirty read | Allowed | Prevented | Prevented | Prevented |
| Nonrepeatable read | Allowed | Allowed | Prevented | Prevented |
| Phantom read | Allowed | Allowed | Allowed | Prevented |

## Key terms

| Term | Meaning |
|---|---|
| Phantom read | Re-running the same query and getting a different set of rows, due to another transaction's INSERT or DELETE |
| Range lock | The lock type SERIALIZABLE uses to lock the "gaps" a predicate covers, not just existing rows |
| Prevented by | SERIALIZABLE only |

## Lab

Open two query windows against AdventureWorks2012. In Window 1, run the
`BEGIN TRANSACTION` / `COUNT(*)` query above and leave it open. In
Window 2, insert a row with a `ListPrice` in that same range (or, more
simply, `UPDATE` an existing out-of-range row's `ListPrice` into the
range). Back in Window 1, run the `COUNT(*)` query again and watch the
number change, then `COMMIT TRANSACTION` and clean up your test row.

## Check yourself

You're ready for Lesson 95 when you can answer, without looking: how is
a phantom read different from a nonrepeatable read, why doesn't
`REPEATABLE READ` prevent it, and what mechanism does `SERIALIZABLE` use
that the others don't?
