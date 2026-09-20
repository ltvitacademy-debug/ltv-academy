# Backup History & Recovery Validation

"Did the backup job run last night?" is really two separate questions: did the *Agent job*
report success, and did a *backup* actually land on disk for every database that needs one?
`msdb` keeps a full, queryable history of every backup SQL Server has taken, independent of
whatever the job history says — which makes it the source of truth when the two disagree.

## What you'll learn

- The `msdb.dbo.backupset` and `msdb.dbo.backupmediafamily` tables
- A real query to find the last successful backup of every type, per database
- Why "the job succeeded" and "a usable backup exists" aren't always the same fact

## The tables behind backup history

Every completed backup — full, differential, or log — writes a row into
`msdb.dbo.backupset`, regardless of whether it was run manually, from a script, or by a SQL
Server Agent job:

| Column | Meaning |
|---|---|
| `database_name` | The database that was backed up |
| `type` | `D` = full (database), `I` = differential, `L` = log |
| `backup_start_date` / `backup_finish_date` | When the backup ran |
| `backup_size` | Size in bytes of the backup |
| `is_copy_only` | Whether it was a `COPY_ONLY` backup (doesn't break the log/differential chain) |

`msdb.dbo.backupmediafamily` links each `backupset` row to the physical file(s) it was written
to, via `physical_device_name`.

## Last successful backup per database

```sql
SELECT
    d.name AS database_name,
    MAX(CASE WHEN b.type = 'D' THEN b.backup_finish_date END) AS last_full,
    MAX(CASE WHEN b.type = 'I' THEN b.backup_finish_date END) AS last_diff,
    MAX(CASE WHEN b.type = 'L' THEN b.backup_finish_date END) AS last_log
FROM sys.databases d
LEFT JOIN msdb.dbo.backupset b ON b.database_name = d.name
WHERE d.name NOT IN ('tempdb')
GROUP BY d.name
ORDER BY last_full DESC;
```

This is one of the most useful queries a DBA runs, because it answers the real question
directly: for every database on the instance, when was the last full, differential, and log
backup — and a database with a `NULL` in `last_full` has never been backed up at all, which is
worth finding out before an incident, not during one.

## Backup file path

```sql
SELECT
    b.database_name,
    b.backup_start_date,
    m.physical_device_name
FROM msdb.dbo.backupset b
JOIN msdb.dbo.backupmediafamily m ON b.media_set_id = m.media_set_id
WHERE b.database_name = 'AdventureWorks2012'
ORDER BY b.backup_start_date DESC;
```

This tells you exactly which file each backup landed in — essential when a backup job writes
to a rotating set of files or a network share, and you need to know which specific file to
restore from.

## Why this beats trusting job history alone

SQL Server Agent job history (in `msdb.dbo.sysjobhistory`) tells you whether the *job step*
reported success. But a job can report success while the underlying `BACKUP` statement silently
skipped a database, or a job can be reported as failed due to an unrelated step even though the
backup itself completed and is sitting in `backupset` just fine. Querying `backupset` directly
confirms a backup actually exists — it's the definitive record, not a proxy for one.

## Key terms

| Term | Meaning |
|---|---|
| `msdb.dbo.backupset` | The system table recording metadata for every backup SQL Server has ever taken |
| `msdb.dbo.backupmediafamily` | Links a backup set to its physical file location(s) |
| `type` column | `D` = full, `I` = differential, `L` = log, in `backupset` |
| `is_copy_only` | Flags a backup taken with `COPY_ONLY`, which doesn't affect the normal backup chain |

## Check yourself

A SQL Server Agent job's history shows "Succeeded" for last night's backup job. Why might you
still want to query `msdb.dbo.backupset` directly before trusting that?
