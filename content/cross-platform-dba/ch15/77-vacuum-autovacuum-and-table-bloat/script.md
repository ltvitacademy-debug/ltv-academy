# Script — VACUUM, Autovacuum & Table Bloat

## Segment 1 (title)

This is a genuinely distinctive PostgreSQL concept, with no SQL Server equivalent — SQL
Server's locking-based concurrency model doesn't create the problem VACUUM exists to
solve. Take this one slowly.

## Segment 2 (code: MVCC)

PostgreSQL uses MVCC so readers and writers don't block each other. An UPDATE writes a new
row version and marks the old one no-longer-current instead of overwriting it in place. A
DELETE marks a row no-longer-visible rather than erasing it. Both leave a dead tuple still
occupying disk space.

## Segment 3 (code: VACUUM vs. VACUUM FULL)

VACUUM scans a table for dead tuples nothing can see anymore and marks that space reusable
— but it doesn't shrink the file. VACUUM FULL rewrites the whole table and returns space to
the OS, at the cost of an exclusive lock. Autovacuum runs ordinary VACUUM automatically once
a table crosses a threshold.

## Segment 4 (code: table bloat)

Table bloat happens when dead tuples pile up faster than vacuuming reclaims them, growing
the table beyond what the live data needs. Watch n_dead_tup against n_live_tup in
pg_stat_user_tables — a steadily climbing dead count against a flat live count is the
signal.

## Segment 5 (outro)

Common causes are autovacuum tuned too conservatively, or a long-running transaction
holding back what VACUUM can consider dead. Next up: pg_stat_statements, PostgreSQL's
answer to Query Store for query performance monitoring.
