# Finding Open Transactions

A transaction that never commits or rolls back is one of the most common causes of a "server
is slow" ticket. It holds its locks for as long as it stays open, blocks whoever needs those
rows next, and — in the full or bulk-logged recovery models — stops the transaction log from
truncating, so the log file keeps growing until someone finds the culprit. This lesson covers
the three tools you reach for first: `DBCC OPENTRAN`, `sys.dm_tran_active_transactions`, and
`sys.dm_tran_session_transactions`.

## What you'll learn

- `DBCC OPENTRAN` for a fast, single-database check
- The DMVs that give you the full, server-wide picture
- How to join transaction data back to the session that owns it

## DBCC OPENTRAN: the fast check

`DBCC OPENTRAN` reports the oldest active transaction in the current database — its
transaction ID, start time, and the SPID (session) that owns it:

```sql
USE AdventureWorks2012;
DBCC OPENTRAN;
```

If nothing is open, it returns "No active open transactions." If something is open, it hands
you a session ID to go investigate. It's the right first move when someone says "the log is
growing" or "something's blocking me" and you just need a quick answer for one database.

## The DMVs: the full picture

`DBCC OPENTRAN` only covers one database and only shows the oldest transaction. For a
server-wide view of every open transaction, use `sys.dm_tran_active_transactions` joined to
`sys.dm_tran_session_transactions`:

```sql
SELECT
    dtat.transaction_id,
    dtat.name,
    dtat.transaction_begin_time,
    DATEDIFF(SECOND, dtat.transaction_begin_time, GETDATE()) AS open_seconds,
    dtst.session_id,
    es.login_name,
    es.host_name,
    es.program_name
FROM sys.dm_tran_active_transactions dtat
JOIN sys.dm_tran_session_transactions dtst
    ON dtat.transaction_id = dtst.transaction_id
JOIN sys.dm_exec_sessions es
    ON dtst.session_id = es.session_id
ORDER BY dtat.transaction_begin_time ASC;
```

`sys.dm_tran_active_transactions` is server-wide (it has no database column by itself — join
`sys.dm_tran_database_transactions` if you need to filter by database) and lists every
transaction currently active on the instance. `sys.dm_tran_session_transactions` is the bridge
table that maps a `transaction_id` back to the `session_id` that opened it, which is what lets
you find the actual application or person responsible.

## Why this matters beyond blocking

An open transaction doesn't just block other sessions — under snapshot isolation or
`READ_COMMITTED_SNAPSHOT`, it also pins the tempdb version store, preventing old row versions
from being cleaned up. A single forgotten `BEGIN TRAN` left open overnight by a developer's
SSMS window can quietly grow both the transaction log and tempdb until someone runs one of
these queries.

## Key terms

| Term | Meaning |
|---|---|
| `DBCC OPENTRAN` | Reports the oldest open transaction in the current database |
| `sys.dm_tran_active_transactions` | DMV listing every active transaction on the instance |
| `sys.dm_tran_session_transactions` | DMV mapping a transaction back to its owning session |
| Log truncation | Freeing space in the transaction log after it's backed up (or checkpointed, in SIMPLE) — blocked by any open transaction |

## Check yourself

Why can a single open transaction, left open by a developer's SSMS window, cause both the
transaction log and tempdb to grow?
