# Lesson 113 — Preventing and Handling Deadlocks

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 14 of 30**

## What you'll learn

- The single biggest real prevention technique: consistent access order
- Four other standard, real mitigations
- Why error 1205 is expected occasionally, even in well-designed systems
- How to actually retry a deadlocked transaction in application code

## The biggest one: access objects in a consistent order

Recall Lesson 111's classic deadlock: Session A updated Product 680 then
681; Session B updated 681 then 680 — the *opposite* order. That opposite
ordering is what created the cycle. If every transaction in the system
always touched these two rows in the **same order** — always 680 before
681, never the reverse — this specific deadlock becomes structurally
impossible: whichever session gets there first would simply hold both
locks in sequence without ever being blocked, going backward, by the
other.

```sql
-- Both sessions following the same order: 680 before 681
UPDATE Production.Product SET ListPrice = 25.00 WHERE ProductID = 680;
UPDATE Production.Product SET ListPrice = 30.00 WHERE ProductID = 681;
```

This is, by a wide margin, the single most effective real-world
technique: if every piece of code that touches a given set of tables or
rows is written to access them in the same consistent order, the specific
cyclical wait that defines a deadlock has no way to form.

## Keep transactions short

Lesson 104 already established that an exclusive lock is held until
`COMMIT` or `ROLLBACK`. The longer a transaction stays open after taking a
lock, the longer the window during which some other session could request
a conflicting lock and create the conditions for a cycle. Doing
unnecessary work — slow application logic, a network round trip, a user
sitting on a confirmation dialog — inside an open transaction needlessly
widens that window.

## Use an appropriate isolation level

The next cluster of lessons in this chapter covers isolation levels in
depth, but the short version here: some isolation levels hold locks for
longer or take broader locks than others. Choosing the lightest isolation
level that still gives your transaction the correctness guarantee it
actually needs reduces how much lock contention exists for a deadlock to
form from in the first place.

## Add helpful indexes

A statement without a useful index has to scan more of the table to find
its rows, and lock duration correlates directly with scan time — more
rows examined generally means more locks held, for longer, which is more
opportunity for a conflicting cycle. A well-targeted index that lets a
statement locate exactly the rows it needs, quickly, shrinks that window.

## Handle it in application code: the retry loop

Even with every one of the above in place, error 1205 is expected to
happen occasionally in a sufficiently busy, well-designed system under
concurrent load — it is not, by itself, evidence of a bug. The standard
response is a **retry loop** in application code: catch error 1205
specifically, and simply resubmit the same transaction.

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Production.Product SET ListPrice = 25.00 WHERE ProductID = 680;
    UPDATE Production.Product SET ListPrice = 30.00 WHERE ProductID = 681;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;

    IF ERROR_NUMBER() = 1205
        -- Application-side logic: wait briefly, then resubmit
        -- this same transaction from the top.
        PRINT 'Deadlock victim -- retry this transaction.';
    ELSE
        THROW;
END CATCH;
```

(Chapter 8's `TRY`/`CATCH` lesson covered this error-handling pattern in
general; `ERROR_NUMBER() = 1205` is the specific check that identifies a
deadlock victim rather than some other failure.)

## Key terms

| Technique | Why it helps |
|---|---|
| Consistent access order | Removes the cyclical wait a deadlock requires |
| Short transactions | Shrinks the window a lock is held, and can conflict |
| Lighter isolation level | Reduces overall lock contention |
| Helpful indexes | Less scanning means less lock duration |
| Retry loop (catch 1205) | Handles the deadlocks that still happen, as expected |

## Lab

Rerun Lesson 111's deadlock lab, but this time have both Session A and
Session B update Product 680 before Product 681, in the same order.
Confirm the deadlock no longer occurs — one session simply waits briefly
for the other, then proceeds normally.

## Check yourself

You're ready for Lesson 114 when you can answer, without looking: what is
the single biggest real-world technique for preventing deadlocks, and
what should application code do when it specifically catches error 1205?
