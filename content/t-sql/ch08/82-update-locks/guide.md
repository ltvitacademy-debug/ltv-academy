# Lesson 105 — Update (U) Locks

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 6 of 30**

## What you'll learn

- The classic conversion deadlock that update locks exist to prevent
- What an update (U) lock is compatible with — and what it isn't
- How an update lock converts into an exclusive lock
- Why this is one of the most misunderstood lock types in SQL Server

## The problem: UPDATE has to read before it can write

Think about what `UPDATE Production.Product SET ListPrice = 25.00 WHERE
ProductID = 680;` actually requires SQL Server to do: first **find** the
row (a read, to evaluate the `WHERE` clause and locate it), then
**change** it (a write). Two separate operations, back to back, on the
same row.

If SQL Server used a shared lock for that initial find-the-row read — the
same lock an ordinary `SELECT` takes — and then tried to **upgrade** that
shared lock to an exclusive lock to perform the write, here's the trap:

## The classic deadlock this creates

Imagine two sessions both run an `UPDATE` against the exact same row at
nearly the same instant, and both take a shared lock first (as described
above, hypothetically):

```sql
-- Session A (hypothetical, if S locks were used for the read phase)
UPDATE Production.Product SET ListPrice = 25.00 WHERE ProductID = 680;
-- Step 1: takes a shared lock to find the row -- GRANTED
-- Step 2: tries to upgrade to exclusive to write -- WAITS
```

```sql
-- Session B, at the same instant
UPDATE Production.Product SET ListPrice = 30.00 WHERE ProductID = 680;
-- Step 1: takes a shared lock to find the row -- ALSO GRANTED
--         (shared locks are compatible with other shared locks!)
-- Step 2: tries to upgrade to exclusive to write -- ALSO WAITS
```

Both sessions now hold a shared lock on the row and are each waiting for
the *other* session's shared lock to be released before their own upgrade
to exclusive can proceed. Neither will ever release first. That's a
deadlock — and it's a deadlock caused purely by the locking strategy, not
by anything unreasonable either session asked for.

## The update lock solves this

To prevent exactly this trap, SQL Server uses a distinct third lock type
for that initial "I'm reading this row to decide whether to update it"
phase: the **update (U) lock**.

An update lock is compatible with a shared lock (so other plain `SELECT`
statements can still read the row while an `UPDATE` is deciding what to
do) — but it is **not** compatible with another update lock, and **not**
compatible with an exclusive lock. That one rule closes the trap: only one
transaction at a time can be in the "about to maybe update this row"
phase, so two `UPDATE`s can never both get stuck waiting on each other to
upgrade.

```sql
-- Session A
UPDATE Production.Product SET ListPrice = 25.00 WHERE ProductID = 680;
-- takes a U lock to locate the row -- GRANTED

-- Session B, at the same instant
UPDATE Production.Product SET ListPrice = 30.00 WHERE ProductID = 680;
-- also needs a U lock on the same row -- BLOCKS (U vs U conflict)
-- Session B simply waits its turn; no deadlock is possible
```

## The conversion to exclusive

Once the row has been located and the engine is ready to actually perform
the write, the update lock **converts** to an exclusive lock on that row.
If nothing else is holding a conflicting lock, this conversion happens
immediately. The exclusive lock then behaves exactly as covered in Lesson
104 — held until `COMMIT` or `ROLLBACK`.

## Why this trips people up

It's a very common misconception that `UPDATE` statements simply "take an
exclusive lock." In reality there's an intermediate step most developers
never see directly: a U lock for the read-to-decide phase, which only then
converts to X for the actual write. The distinction matters because it's
the specific mechanism that keeps ordinary `UPDATE` traffic from
deadlocking against itself under normal, everyday concurrent load — not
some rare edge case, but the default behavior protecting every `UPDATE`
you write.

## Checking it with sys.dm_tran_locks

If you catch an `UPDATE` at just the right instant (for example, by
pausing it inside a trigger or a deliberately slow `WHERE` clause),
`sys.dm_tran_locks` will show `request_mode = 'U'` for that row briefly,
before it flips to `request_mode = 'X'` once the write proceeds. Lesson
110 covers reading this view end to end.

## Key terms

| Term | Meaning |
|---|---|
| Update (U) lock | Taken while locating a row to decide whether to update it; compatible with S, incompatible with U and X |
| Conversion deadlock | The trap avoided: two sessions each holding S, both waiting to upgrade to X |
| U → X conversion | Once ready to write, the update lock converts to an exclusive lock |

## Lab

Open two SSMS windows against AdventureWorks2012. In both, at nearly the
same time, run an `UPDATE Production.Product SET ListPrice = ListPrice +
1 WHERE ProductID = 680;` without wrapping either in an explicit
transaction. Notice one simply waits briefly for the other and then
succeeds — no deadlock, no error — which is the update lock doing its job
invisibly.

## Check yourself

You're ready for Lesson 106 when you can answer, without looking: what
deadlock pattern would occur if `UPDATE` used a shared lock for its
initial read phase, and what single compatibility rule about update locks
prevents it?
