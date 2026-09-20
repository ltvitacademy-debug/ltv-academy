# Capacity Monitoring

Chapter 8 closes with the question every autogrowth conversation eventually leads to: how
much space is actually left, and how fast is it disappearing? This lesson builds the T-SQL a
DBA runs on a schedule to answer that before a drive fills up at 2 a.m.

## What you'll learn

- The DMV that reports live space usage inside each database file
- How to pull actual free disk space at the volume level from T-SQL
- The trending approach that turns a single snapshot into a warning system

## Space usage inside the files

`sys.dm_db_file_space_usage` reports space usage for the files of the *current* database —
critically useful for `tempdb`, where free space inside the file matters as much as free
space on disk:

```sql
SELECT
    file_id,
    (total_page_count * 8) / 1024 AS total_mb,
    (allocated_extent_page_count * 8) / 1024 AS used_mb,
    ((total_page_count - allocated_extent_page_count) * 8) / 1024 AS free_mb
FROM sys.dm_db_file_space_usage;
```

Run against `tempdb`, this is the query that answers "is tempdb actually full, or does it
just look busy?" — because tempdb space gets reused constantly, but only within the file's
already-allocated size.

## Free space at the volume level

`sys.master_files` gives file sizes; combined with `sys.dm_os_volume_stats`, T-SQL can pull
actual free disk space directly, without going outside SQL Server at all:

```sql
SELECT DISTINCT
    vs.volume_mount_point,
    vs.total_bytes / 1024 / 1024 / 1024 AS total_gb,
    vs.available_bytes / 1024 / 1024 / 1024 AS free_gb,
    CAST(vs.available_bytes AS FLOAT) / vs.total_bytes * 100 AS pct_free
FROM sys.master_files AS mf
CROSS APPLY sys.dm_os_volume_stats(mf.database_id, mf.file_id) AS vs;
```

`sys.dm_os_volume_stats` takes a `database_id` and `file_id` and returns the underlying
Windows volume's actual capacity — the same number `dir` or Explorer would show, but
queryable in T-SQL and joinable against every database file on the instance in one pass.

## Turning a snapshot into a trend

A single run of either query is a snapshot; the useful version runs on a schedule (an Agent
job, tying back to Chapter 7) and logs results to a small history table:

```sql
INSERT INTO DBAdmin.dbo.VolumeSpaceHistory (captured_at, volume_mount_point, free_gb, pct_free)
SELECT SYSUTCDATETIME(), vs.volume_mount_point,
       vs.available_bytes / 1024 / 1024 / 1024,
       CAST(vs.available_bytes AS FLOAT) / vs.total_bytes * 100
FROM sys.master_files AS mf
CROSS APPLY sys.dm_os_volume_stats(mf.database_id, mf.file_id) AS vs;
```

Logged daily, that table answers "how many days until this drive is full at the current
rate?" — a question a single point-in-time number can never answer on its own, and the
actual goal of capacity monitoring: catching the trend before autogrowth has nowhere left
to grow into.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_db_file_space_usage` | DMV reporting allocated vs. free space inside the current database's files |
| `sys.dm_os_volume_stats` | DMF returning actual Windows volume capacity/free space for a given database file |
| Capacity trend | Space-usage history over time, used to project when a volume runs out rather than just its current state |

## Check yourself

Why does a single snapshot of free disk space matter less to a DBA than a trend logged over
time?
