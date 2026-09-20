# Query Store in Production

This chapter has treated Query Store as a data source. Now treat it as a thing you operate:
Query Store itself has storage overhead, can fill up, and can silently stop capturing new
data if you don't watch it. This lesson closes the chapter with the operational
considerations that keep it healthy long-term.

## What you'll learn

- Query Store's own storage footprint and how to monitor it
- What actually happens when Query Store hits its size cap
- How to tune the cleanup policy deliberately instead of hitting the limit

## Query Store costs storage and I/O

Query Store isn't free. It writes plan and runtime-stats data into the user database on an
interval you control (`DATA_FLUSH_INTERVAL_SECONDS`), and that data itself takes space,
governed by `MAX_STORAGE_SIZE_MB`. On a busy database capturing every query
(`QUERY_CAPTURE_MODE = ALL`), that overhead is real — both in database file growth and in
the write activity to persist it.

Check current usage against the configured cap directly:

```sql
SELECT
    actual_state_desc,
    current_storage_size_mb,
    max_storage_size_mb,
    readonly_reason
FROM sys.database_query_store_options;
```

`current_storage_size_mb` climbing steadily toward `max_storage_size_mb` is the early warning
sign every DBA running Query Store in production should be watching, ideally through the same
monitoring/alerting approach Chapter 9 covers for the rest of the system.

## What happens when it fills up

If `current_storage_size_mb` reaches the configured maximum, Query Store's behavior depends
on `SIZE_BASED_CLEANUP_MODE`:

- `AUTO` (the recommended default) — Query Store proactively cleans up the oldest, least
  useful data to stay under the cap, so it keeps capturing new data continuously.
- `OFF` — no automatic cleanup happens, and once the cap is genuinely hit, Query Store flips
  `actual_state_desc` to `READ_ONLY`. It keeps serving historical data for reports and
  queries, but **stops capturing anything new** — silently, unless you're watching for it.
  `readonly_reason` on `sys.database_query_store_options` tells you why.

A Query Store stuck in read-only mode because of `SIZE_BASED_CLEANUP_MODE = OFF` is a common,
avoidable production surprise: everything looks fine because old data is still there and
queryable, but you've lost visibility into anything that's happened since it filled up.

## Tuning the cleanup policy deliberately

Rather than reacting to a full Query Store, tune retention on purpose:

```sql
ALTER DATABASE CURRENT SET QUERY_STORE
(
    CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 14),
    SIZE_BASED_CLEANUP_MODE = AUTO,
    MAX_STORAGE_SIZE_MB = 2000
);
```

Lowering `STALE_QUERY_THRESHOLD_DAYS` keeps less history but reduces steady-state size.
Raising `MAX_STORAGE_SIZE_MB` buys more room before cleanup or read-only mode kicks in, but
only if the database has the disk space to spare. There's a real tradeoff here: enough
retention to catch a regression that developed over a few weeks (Lesson 36's baseline
comparisons need history to compare against), against the overhead of keeping that much data
captured and current.

## A production checklist

- Confirm `SIZE_BASED_CLEANUP_MODE = AUTO` on every production database running Query Store —
  `OFF` should be a deliberate, understood choice, not an accident.
- Monitor `current_storage_size_mb` against `max_storage_size_mb` on a schedule, not just when
  something feels wrong.
- Set `QUERY_CAPTURE_MODE = AUTO` (not `ALL`) unless you have a specific reason to capture
  every ad hoc query, to reduce overhead on busy systems.
- Periodically check `actual_state_desc` and `readonly_reason` — a silent flip to read-only is
  the failure mode this lesson exists to prevent.

## Key terms

| Term | Meaning |
|---|---|
| `current_storage_size_mb` | Query Store's actual current storage footprint in the database |
| `SIZE_BASED_CLEANUP_MODE` | Setting controlling whether Query Store auto-cleans as it nears its size cap |
| Read-only mode | State where Query Store still serves historical data but has stopped capturing new data |
| `readonly_reason` | Column on `sys.database_query_store_options` explaining why Query Store went read-only |

## Check yourself

A production database's Query Store shows `actual_state_desc = READ_ONLY` and
`readonly_reason` pointing at the size cap. What's still true about the data already in
Query Store, and what silently stopped happening the moment it flipped to read-only?
