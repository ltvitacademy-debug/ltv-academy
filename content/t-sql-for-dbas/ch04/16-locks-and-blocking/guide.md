# Locks & Blocking

Locking is how SQL Server keeps transactions from stepping on each other, and blocking is what
happens when one session's lock stands in the way of another session's request. A little
blocking is normal and expected. A blocking chain that lasts minutes is a production incident.
This lesson covers the DMV that shows you every lock on the instance, the lock modes you'll
actually see, and how `blocking_session_id` lets you trace a chain back to its root.

## What you'll learn

- `sys.dm_tran_locks` and its most useful columns
- The lock modes you'll encounter day to day: S, X, U, IS, IX
- How to trace a blocking chain to the session actually causing it

## sys.dm_tran_locks

`sys.dm_tran_locks` is the DMV that lists every lock currently held or waiting on the
instance:

```sql
SELECT
    resource_type,
    resource_database_id,
    resource_associated_entity_id,
    request_mode,
    request_status,
    request_session_id
FROM sys.dm_tran_locks
WHERE resource_database_id = DB_ID('AdventureWorks2012');
```

`request_status` is the column that separates "holding" from "waiting": `GRANT` means the
session has the lock, `WAIT` means it's queued behind someone else. `resource_associated_entity_id`
maps to an object via `OBJECT_NAME()` once you resolve it through `sys.partitions`.

## Lock modes you'll actually see

| Mode | Name | Meaning |
|---|---|---|
| `S` | Shared | Read lock — compatible with other `S` locks, blocks writers |
| `X` | Exclusive | Write lock — incompatible with everything |
| `U` | Update | Held while deciding whether to escalate to `X`; prevents deadlock between two readers both about to write |
| `IS` / `IX` | Intent Shared / Intent Exclusive | Placed at a higher level (table) to signal a lock exists at a lower level (row/page), so SQL Server doesn't have to scan every row to check for conflicts |

`S` and `S` are compatible — two sessions can both hold shared locks on the same row. `X`
is compatible with nothing. That incompatibility is the root of almost every blocking
scenario: someone holding `X`, someone else waiting for `S` or `X` on the same resource.

## Tracing a blocking chain

`sys.dm_exec_requests` has a `blocking_session_id` column: the session ID of whoever is
blocking the current request, or `0` if it isn't blocked. Because a blocker can itself be
blocked by someone else, chains form — the query below finds every blocked session and its
immediate blocker in one pass:

```sql
SELECT
    r.session_id AS blocked_session,
    r.blocking_session_id AS blocked_by,
    r.wait_type,
    r.wait_time,
    r.wait_resource,
    t.text AS blocked_sql
FROM sys.dm_exec_requests r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
WHERE r.blocking_session_id <> 0;
```

To find the *head* of a chain — the session blocking everyone else but not itself blocked —
look for a `session_id` that appears in the `blocked_by` column but never in `blocked_session`.
That's the session to investigate first; everyone behind it is just waiting.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_tran_locks` | DMV listing every lock currently held or waiting on the instance |
| `blocking_session_id` | Column in `sys.dm_exec_requests` naming the session blocking the current request |
| Lock escalation | SQL Server converting many row/page locks into a single table lock to save memory |
| Blocking chain | A sequence of sessions each waiting on the one before it |

## Check yourself

In a blocking chain of five sessions, why is it wrong to kill the session at the *end* of the
chain to fix the problem?
