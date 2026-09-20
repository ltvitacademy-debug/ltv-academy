# VACUUM, Autovacuum & Table Bloat

This is a genuinely distinctive PostgreSQL concept — there's no SQL Server equivalent to
reach for here, because SQL Server's locking-based concurrency model doesn't create the
problem VACUUM exists to solve. Take this one slowly; it's one of the most important
PostgreSQL-specific things a cross-platform DBA needs to actually understand, not just
recognize by name.

## What you'll learn

- Why PostgreSQL's MVCC design means UPDATE and DELETE don't remove data immediately
- What VACUUM actually does, and the difference between VACUUM and VACUUM FULL
- What autovacuum is, and what table bloat is when vacuuming falls behind

## MVCC means old row versions don't just disappear

PostgreSQL uses Multi-Version Concurrency Control (MVCC) to let readers and writers work
without blocking each other: instead of locking a row to update it, PostgreSQL writes a
*new version* of that row and marks the old version as no longer current. A `DELETE`
behaves similarly — the row isn't erased on the spot; it's marked as no-longer-visible to
new transactions. Both cases leave a **dead tuple** — a row version nobody's transaction
can see anymore, but which still physically occupies space in the table. This is what makes
MVCC work: a long-running transaction can keep reading a consistent snapshot even while
other transactions update the same rows, because those old versions are still sitting right
there on disk until nothing needs them anymore.

## VACUUM: reclaiming that space

`VACUUM` scans a table for dead tuples that no active transaction can still see, and marks
that space as reusable by future `INSERT`/`UPDATE` operations on the same table.

```sql
VACUUM orders;
VACUUM ANALYZE orders;   -- also refreshes planner statistics
```

Plain `VACUUM` does **not** shrink the file on disk — it marks space inside the existing
file as free for reuse, but doesn't return that space to the operating system. `VACUUM
FULL` does return space to the OS, but it does so by rewriting the entire table into a new
file and requires an exclusive lock for the duration — meaning nothing can read or write
that table while it runs. That's why `VACUUM FULL` is a deliberate, planned maintenance
action, not something you run casually or automatically.

## Autovacuum: this running automatically, by default

Manually running `VACUUM` on every table on a schedule doesn't scale. PostgreSQL runs an
**autovacuum** daemon by default that watches each table's number of dead tuples and
triggers a `VACUUM` (and, separately, an `ANALYZE`) automatically once a table crosses a
threshold — governed by parameters like `autovacuum_vacuum_scale_factor` (a fraction of the
table's row count) and `autovacuum_vacuum_threshold` (a flat row count added to that
fraction). For most workloads, autovacuum handles this transparently and a DBA never
manually runs `VACUUM` at all.

## Table bloat: when vacuuming falls behind

**Table bloat** is what happens when dead tuples accumulate faster than VACUUM — manual or
auto — reclaims them: the table (and its indexes) grow larger on disk than the live data
actually needs, because space marked reusable by an old VACUUM never gets reused before more
dead tuples pile on top. Bloat degrades performance directly — sequential scans read more
pages than necessary, and even index scans get slower navigating a larger structure — and it
wastes disk space. Common causes are autovacuum tuned too conservatively for a table's real
write volume, a long-running transaction holding back what VACUUM can consider "dead" (MVCC
has to preserve versions that transaction might still need to see), or a table with an
extremely high update/delete rate that outpaces default autovacuum settings.

```sql
SELECT relname, n_dead_tup, n_live_tup
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

`n_dead_tup` climbing steadily against a roughly stable `n_live_tup` is the signal to check
autovacuum settings for that table, or to look for a long-running transaction blocking
cleanup.

## Key terms

| Term | Meaning |
|---|---|
| MVCC | Multi-Version Concurrency Control — PostgreSQL keeps multiple row versions so readers and writers don't block each other |
| Dead tuple | A row version no active transaction can see anymore, still occupying disk space |
| VACUUM | Reclaims dead tuple space for reuse within the same file; VACUUM FULL rewrites the file and returns space to the OS |
| Table bloat | Dead tuples accumulating faster than vacuuming reclaims them, growing the table beyond what live data needs |

## Check yourself

A table's `n_dead_tup` has been climbing for weeks while `n_live_tup` stays flat, and query
performance on that table has been degrading. Using MVCC, explain in your own words why
UPDATE and DELETE alone created this situation, and what you'd check first to find out why
vacuuming isn't keeping up.
