# Script — Isolation Levels in Practice

## Segment 1 (title)

Isolation level controls how much a transaction can see of other transactions' uncommitted or concurrent changes, and how many locks it takes to enforce that. Changing it is one of the highest-leverage things a DBA can do to reduce blocking — but it trades away consistency if used carelessly.

## Segment 2 (code: the levels)

Read uncommitted allows dirty reads and takes almost no locks — it's what NOLOCK simulates. Read committed, the default, prevents dirty reads but not non-repeatable reads. Repeatable read holds its shared locks until the transaction ends. Serializable is strictest — it locks the whole range a query touched, not just the rows that existed.

## Segment 3 (steps: row versioning)

Snapshot isolation and RCSI take a completely different approach — no locking at all. They use tempdb's version store instead, so readers never block writers and writers never block readers. RCSI changes the default behavior of read committed itself, with zero application code changes needed.

## Segment 4 (code: checking what's active)

DBCC USEROPTIONS or querying sys.dm_exec_sessions tells you what isolation level a session is actually running under — the transaction_isolation_level column returns a number, from 1 for read uncommitted up to 5 for snapshot.

## Segment 5 (outro)

Turn on RCSI and read committed silently switches from locking to versioning underneath every existing query. Next up: deadlock investigation — reading the deadlock graph SQL Server captures automatically.
