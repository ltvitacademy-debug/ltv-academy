# Lesson 50 — Blocking, Locking & Deadlocks

**Chapter 8 · Query Performance Tuning · Lesson 50 of 95**

## What you'll learn

- Blocking: one session waiting on a lock held by another — not a bug, a normal consequence of concurrency
- Locking: the actual lock types and levels SQL Server takes out to protect data during reads and writes
- Deadlocks: two sessions blocking each other in a cycle, with SQL Server forced to kill one
- How to find and resolve real blocking chains with T-SQL

## Three related, genuinely distinct concepts

These three terms get used interchangeably in casual conversation,
and that's exactly why they're worth separating precisely:

```
Locking:    the mechanism -- SQL Server holds locks to protect data
Blocking:   the consequence -- one session waits for another's lock
Deadlock:   the failure mode -- two sessions block each other in a cycle
```

Locking is always happening and is mostly invisible and healthy.
Blocking is locking becoming visible as a wait — expected under
concurrency, a problem only when it lasts too long. A deadlock is the
one case SQL Server can't resolve on its own — it has to kill a
session to break the cycle.

## Locking: the actual mechanism

SQL Server takes out locks at different **levels** (row, page, table)
and different **types** (shared for reads, exclusive for writes,
update, intent locks) to keep concurrent transactions from corrupting
each other's data. You can see every lock currently held with:

```sql
SELECT
    request_session_id,
    resource_type,
    resource_database_id,
    request_mode,   -- S (shared), X (exclusive), U (update), IX, etc.
    request_status  -- GRANT or WAIT
FROM sys.dm_tran_locks
WHERE resource_database_id = DB_ID();
```

A row with `request_status = 'WAIT'` is a session actively blocked
right now, waiting for a lock another session is holding.

## Blocking: finding who's blocking whom

Blocking is normal — the problem is a blocking **chain** that lasts
long enough for users to notice. The fastest way to find the head of
a chain:

```sql
SELECT
    blocking_session_id,
    session_id AS blocked_session_id,
    wait_type,
    wait_time,
    wait_resource
FROM sys.dm_exec_requests
WHERE blocking_session_id <> 0;
```

`blocking_session_id` tells you exactly which session is holding the
lock the blocked session is waiting on. Chase that chain back to the
session with `blocking_session_id = 0` in its own row — that's the
one actually holding things up, not being blocked by anyone else.
From there, check what that session is doing (a long-running
transaction that hasn't committed is the most common cause) before
deciding whether to wait it out or kill it.

## Deadlocks: the cycle SQL Server can't resolve

A deadlock is specifically **circular** blocking: Session A waits on
a lock Session B holds, while Session B simultaneously waits on a
lock Session A holds. Neither can ever proceed, so SQL Server's
deadlock monitor detects the cycle and picks a **deadlock victim** —
by default, the session that would cost the least to roll back —
kills it, and lets the survivor continue:

```sql
-- Influence which session SQL Server picks as the victim
-- (lower priority = more likely to be chosen as the victim)
SET DEADLOCK_PRIORITY LOW;

-- Capture deadlock graphs automatically going forward, via Extended
-- Events (system_health session already captures these by default)
SELECT xed.value('(event/data/value)[1]', 'varchar(max)') AS deadlock_graph
FROM sys.fn_xe_file_target_read_file('system_health*.xel', NULL, NULL, NULL) AS s
CROSS APPLY (SELECT CAST(s.event_data AS XML) AS xed) AS t
WHERE xed.value('(event/@name)[1]', 'varchar(50)') = 'xml_deadlock_report';
```

The killed session gets error 1205 back to its client and must retry
its transaction — application code that touches shared data should
always be written to expect and retry on this error, not treat it as
a fatal failure.

## Reducing all three

Shorter transactions (commit sooner), consistent access order across
transactions (always touch tables A-then-B, never B-then-A in some
code paths and A-then-B in others), and appropriate indexing (a
missing index turning a targeted update into a full-table scan holds
locks far longer than it needs to) are the same three fixes that
reduce lock contention, blocking chains, and deadlock frequency all
at once.

## Key terms

| Term | Meaning |
|---|---|
| Locking | SQL Server's mechanism for protecting concurrent reads/writes at row, page, or table level |
| Blocking | One session waiting for a lock another session holds — normal, a problem only when prolonged |
| Deadlock | Circular blocking between two sessions, resolved by SQL Server killing a chosen victim |
| `sys.dm_exec_requests` | DMV used to trace a blocking chain via `blocking_session_id` |

## Check yourself

You're ready for Lesson 51 when you can explain, without looking: what
makes a deadlock different from ordinary blocking, and how do you
trace a blocking chain back to the session that's actually the root
cause?
