# Common Production Issues

Triage methodology (Lesson 55) is the framework. This lesson is the specific, recurring
incidents that framework gets applied to over and over — a handful of problems that account for
most of the pages a working DBA actually gets.

## What you'll learn

- The recurring shape of runaway queries, tempdb pressure, and log growth incidents
- Why "the log is huge" is almost always a symptom, not the disease
- How disk exhaustion and blocking chains show up, and where to look first

## A runaway query consuming all CPU

The most familiar production fire: server-wide slowness, and one session in
`sys.dm_exec_requests` sitting at or near 100% of a CPU core, often for a query that normally
runs in milliseconds. Per Lesson 55's framework, stabilizing means identifying the offending
session (sorting active requests by CPU time) and, if it's genuinely runaway rather than just
legitimately heavy, killing it — then figuring out afterward why it went bad (a stale statistic,
a bad parameter, a plan that stopped matching the data).

## Tempdb filling up

Tempdb backs a huge amount of ordinary SQL Server activity — sorts and hashes that spill to
disk, row versioning for snapshot isolation, temp tables and table variables. When it fills, new
work across the *entire instance* can start failing, not just the query that caused it, because
tempdb is shared. The immediate stabilizing move is finding and stopping the runaway consumer
(often visible in `tempdb.sys.dm_db_file_space_usage` or by session in
`sys.dm_db_session_space_usage`); the longer-term fix, if this keeps happening, is often tempdb
sizing, not just chasing individual queries.

## A transaction log growing unbounded

An `.ldf` file growing without bound is a symptom, and the two most common underlying causes are
worth knowing by name: either log backups aren't running (so the log can't truncate, in full or
bulk-logged recovery), or a transaction has been left open — sometimes for hours, by a forgotten
`BEGIN TRAN` with no matching commit — which prevents the log from truncating past that point no
matter how often backups run. `sys.databases.log_reuse_wait_desc` is the fastest way to find out
which of the two, and it usually says plainly: `LOG_BACKUP` or `ACTIVE_TRANSACTION`.

## Disk space exhaustion

When a data or log drive fills completely, SQL Server can't write to it and the instance (or
just that database) effectively stops. This is one of the few incidents where the fix is often
mundane and fast — freeing space (a large one-time table, an old backup file, an oversized
log that can be shrunk once its root cause is fixed) — but the real value is catching it before
it happens, via disk-space alerting, since "the drive filled up" as a surprise is almost always
preventable.

## Blocking chains

One session holds a lock; a second session waits on it; a third waits on the second — and
suddenly a growing chain of sessions is stuck behind one blocker, sometimes one that's just
sitting idle with an open transaction. `sys.dm_exec_requests` (filtered to `blocking_session_id
<> 0`) or the Activity Monitor's blocking view shows the chain. Stabilizing usually means
addressing the head of the chain — the one session actually holding the lock everyone else is
waiting on — not the dozens of sessions it's blocking.

## Key terms

| Term | Meaning |
|---|---|
| Runaway query | A query consuming disproportionate CPU or resources, often due to a bad plan |
| `log_reuse_wait_desc` | Column showing why a transaction log can't currently truncate |
| Blocking chain | A sequence of sessions each waiting on the lock held by the one before it |
| Disk space exhaustion | A data or log drive filling completely, halting writes to that file |

## Check yourself

`sys.databases.log_reuse_wait_desc` shows `ACTIVE_TRANSACTION` for a database whose log has
grown enormous overnight. Would running a log backup fix this by itself? Why or why not?
