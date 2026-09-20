# Batch Processing Techniques

Lesson 22 closed out the query-rewrite techniques in this chapter. This lesson closes the
chapter itself with a different kind of rewrite: not making one query faster, but breaking
one enormous operation into many small ones, when "faster" actually means "survivable."

## What you'll learn

- Why a single `DELETE` or `UPDATE` against millions of rows is a genuine production risk,
  not just slow
- The real `TOP (n)` loop pattern for batching large data-modification operations
- What batch size actually trades off, and why to measure it rather than guess

## The problem: one giant transaction

A single `DELETE FROM dbo.AuditLog WHERE LogDate < '2020-01-01';` against a table with
tens of millions of qualifying rows runs as one transaction. Every one of those rows gets
locked and logged before the statement commits, which means: the transaction log has to
hold every row's log record for the whole operation's duration, locks on the affected rows
(and potentially the table) are held the entire time, blocking other sessions, and if the
operation is killed or the connection drops partway through, the *entire* multi-million-row
transaction rolls back — undoing all the work and generating just as much log activity in
reverse.

```sql
-- Looks simple. On a large table, this is a production incident waiting to happen.
DELETE FROM dbo.AuditLog WHERE LogDate < '2020-01-01';
```

## The fix: a TOP (n) loop

Batching breaks the same logical operation into many small transactions, each deleting (or
updating) only a bounded chunk of rows, committing, and repeating until nothing is left to
do.

```sql
SET NOCOUNT ON;
DECLARE @RowsAffected INT = 1;

WHILE @RowsAffected > 0
BEGIN
    DELETE TOP (5000)
    FROM dbo.AuditLog
    WHERE LogDate < '2020-01-01';

    SET @RowsAffected = @@ROWCOUNT;

    -- optional: a short pause gives other sessions a chance
    -- to get in between batches on a busy system
    WAITFOR DELAY '00:00:00.100';
END;
```

Each iteration is its own short transaction: locks are held briefly instead of for the
whole operation, the log only has to hold one batch's worth of records at a time (and, with
proper log backups in `FULL` recovery, or in `SIMPLE` recovery, that space gets reclaimed
between batches instead of accumulating for the whole job), and if the job is stopped, only
the current batch rolls back — not the whole multi-million-row operation. The same pattern
applies to large `UPDATE` statements: `UPDATE TOP (5000) dbo.Table SET ... WHERE ...`
inside the same loop shape, checking `@@ROWCOUNT` the same way.

## Choosing a batch size: measure, don't guess

There's no universally correct batch size — it depends on row width, indexing, concurrent
load on the table, and how much log growth and blocking the system can tolerate while the
job runs. Too small, and the loop's overhead (compiling and starting each iteration) starts
to dominate; too large, and you're back toward the original problem — long-held locks and a
large log footprint per batch. This is Lesson 1's loop again: pick a starting size, measure
how long a batch takes and what it does to blocking and log growth, adjust, and verify —
don't just copy a number from a blog post onto a table you haven't measured.

## Key terms

| Term | Meaning |
|---|---|
| Batch (in this context) | One bounded chunk of rows processed and committed as its own small transaction |
| TOP (n) loop | The pattern of repeating a DELETE/UPDATE TOP (n) inside a loop until no rows remain |
| Log growth | Transaction log space consumed by an operation's log records; batching bounds it per iteration |
| @@ROWCOUNT | Returns rows affected by the last statement; used here to detect "no rows left" and end the loop |

## Check yourself

A nightly job needs to delete about 40 million stale rows from a heavily-used OLTP table
without blocking the application's regular traffic. Per this lesson, why is a single
`DELETE` statement the wrong approach here, and what does the batched alternative actually
change about lock duration and log growth?
