# Backup Status & Failed Jobs Scripts

This is the script every DBA should run before coffee finishes brewing. It combines two
things you've already built separately: backup history from `msdb.dbo.backupset`
(Lesson 23) and failed Agent job steps from `msdb.dbo.sysjobhistory` (Lesson 29). On their
own, each answers one question. Combined into one script, they answer the two questions
that actually determine whether last night went fine: *is every database backed up on
schedule*, and *did anything fail while I was asleep*.

## What you'll learn

- Reading `msdb.dbo.backupset`'s `type` column to tell full, differential, and log backups apart
- Flagging a database as overdue instead of just listing its last backup date
- Bounding the failed-jobs check to a lookback window instead of "all of history"

## Section 1: backup status per database

`msdb.dbo.backupset` logs one row per backup that ever completed, tagged with a `type`
code: `D` for a full database backup, `I` for differential, `L` for a transaction log
backup. A `LEFT JOIN` from `sys.databases` — not an inner join — matters here: a database
that has *never* been backed up won't have a matching row in `backupset` at all, and an
inner join would silently drop it from the results instead of flagging it as the problem
it is.

```sql
-- =====================================================================
-- Script:         backup-status-and-failed-jobs.sql
-- Purpose:        Morning check: last full/diff/log backup per database,
--                 flagged overdue past a threshold, plus every Agent job
--                 step that failed in the lookback window.
-- Usage:          Run as-is against any instance. Adjust
--                 @FullBackupThresholdHours and @JobLookbackHours to
--                 match your backup and job schedule.
-- Last verified:  SQL Server 2019 / 2022, September 2026
-- =====================================================================

DECLARE @FullBackupThresholdHours int     = 24;   -- flag if no full backup within this many hours
DECLARE @JobLookbackHours         int     = 24;   -- how far back to check for failed job steps
DECLARE @DatabaseName             sysname = NULL; -- NULL = every database

-- Section 1: backup status per database
SELECT
    d.name AS database_name,
    d.recovery_model_desc,
    MAX(CASE WHEN b.type = 'D' THEN b.backup_finish_date END) AS last_full_backup,
    MAX(CASE WHEN b.type = 'I' THEN b.backup_finish_date END) AS last_diff_backup,
    MAX(CASE WHEN b.type = 'L' THEN b.backup_finish_date END) AS last_log_backup,
    DATEDIFF(HOUR,
        MAX(CASE WHEN b.type = 'D' THEN b.backup_finish_date END), GETDATE())
        AS hours_since_full_backup,
    CASE
        WHEN MAX(CASE WHEN b.type = 'D' THEN b.backup_finish_date END) IS NULL
            THEN 'NEVER BACKED UP'
        WHEN DATEDIFF(HOUR,
                MAX(CASE WHEN b.type = 'D' THEN b.backup_finish_date END), GETDATE())
             > @FullBackupThresholdHours
            THEN 'OVERDUE'
        ELSE 'OK'
    END AS full_backup_status
FROM sys.databases AS d
LEFT JOIN msdb.dbo.backupset AS b
    ON b.database_name = d.name
WHERE d.name NOT IN ('tempdb')
  AND (@DatabaseName IS NULL OR d.name = @DatabaseName)
GROUP BY d.name, d.recovery_model_desc
ORDER BY full_backup_status DESC, d.name;
```

`hours_since_full_backup` turns "when was the last backup" into a number you can sort and
threshold, and the `full_backup_status` column means you don't have to do that math
yourself while scanning a results grid at 7 a.m.

## Section 2: failed job steps in the lookback window

Lesson 29's failed-jobs query had no time filter — it returned every failure in
`sysjobhistory`'s entire retention window, however long that happens to be on this
instance. For a morning check, that's noise: you want *last night*, not *since 2019*.
Bounding it to `@JobLookbackHours` keeps the second half of this script focused on what
actually needs a response today.

```sql
-- Section 2: failed job steps in the lookback window
SELECT
    j.name AS job_name,
    h.step_id,
    h.step_name,
    msdb.dbo.agent_datetime(h.run_date, h.run_time) AS run_datetime,
    h.message
FROM msdb.dbo.sysjobs AS j
JOIN msdb.dbo.sysjobhistory AS h
    ON j.job_id = h.job_id
WHERE h.run_status = 0
  AND h.step_id <> 0
  AND msdb.dbo.agent_datetime(h.run_date, h.run_time)
      >= DATEADD(HOUR, -@JobLookbackHours, GETDATE())
ORDER BY run_datetime DESC;
```

`step_id <> 0` is the same habit from Lesson 29: the `step_id = 0` row is only a summary,
and the actual failing step — and the `message` explaining why — lives on the step-level
rows underneath it.

## Reading the two sections together

Run in order, this script answers the two questions a DBA gets asked first after any
overnight incident: *were we backed up*, and *did the scheduled jobs run clean*. A
database sitting at `OVERDUE` right next to a failed backup job in the second result set
isn't a coincidence you have to notice yourself — the two sections sitting in one script
output put the cause and the symptom on the same screen.

## Key terms

| Term | Meaning |
|---|---|
| `backupset.type` | Column tagging each backup row: `D` full, `I` differential, `L` transaction log |
| `full_backup_status` | This script's computed flag: `OK`, `OVERDUE`, or `NEVER BACKED UP` |
| Lookback window | A bounded time range (`@JobLookbackHours`) that keeps a check focused on recent history instead of an entire retention period |

## Check yourself

Why does Section 1 use a `LEFT JOIN` from `sys.databases` to `msdb.dbo.backupset` instead
of an inner join?
