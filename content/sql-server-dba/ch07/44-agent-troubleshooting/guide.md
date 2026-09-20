# Agent Troubleshooting

This lesson closes out the chapter by pulling together everything from Lessons 39–43
into a diagnostic checklist. "The job didn't run" or "the job ran but failed" are two
of the most common tickets a DBA gets, and the answer is almost always in one of a
small number of places.

## What you'll learn

- Querying `msdb.dbo.sysjobhistory` to see what actually happened on a run
- Where Agent's own error log lives, separate from the SQL Server error log
- The short list of real-world causes behind a job that silently didn't run

## sysjobhistory: what actually happened

Every job run — successful or not — logs a row per step (plus a summary row) to
`msdb.dbo.sysjobhistory`. This is the first place to look once you know a job ran but
produced the wrong result, or failed partway through:

```sql
SELECT
    j.name AS job_name,
    h.step_id,
    h.step_name,
    h.run_date,
    h.run_time,
    h.run_status,   -- 0=Failed, 1=Succeeded, 2=Retry, 3=Canceled
    h.message
FROM msdb.dbo.sysjobhistory h
JOIN msdb.dbo.sysjobs j ON j.job_id = h.job_id
WHERE j.name = N'Nightly Full Backup'
ORDER BY h.run_date DESC, h.run_time DESC;
```

The `message` column usually contains the actual error text — for a failed `TSQL`
step, that's often the T-SQL error itself; for `CmdExec`, it's frequently a Windows-level
message (like "Access is denied" — a strong hint the step is running under the wrong
identity, pointing straight back to Lesson 43's proxy setup).

## Agent's own error log

`sysjobhistory` only has entries for jobs that Agent actually attempted to run. If a
job never even attempted to start, that history table won't help — the next place is
**SQL Server Agent's own error log**, a separate log file from the SQL Server Database
Engine's error log. It's viewable in SSMS under SQL Server Agent → Error Logs, and it
logs Agent-level events: the service starting and stopping, schedule engine activity,
and Agent-level errors that happen before or outside of any individual job step (like
Agent failing to connect to the Database Engine at all).

## Common real causes of a "silent" non-run

When a job simply never ran and there's no history row for it at all, the cause is
almost always one of these:

1. **The Agent service is stopped.** Covered in Lesson 39 — this is always the first
   check, because the Engine being healthy tells you nothing about Agent.
2. **The schedule is misconfigured or disabled.** A schedule (or the job itself) can be
   disabled without anyone noticing; check `sysschedules.enabled` and `sysjobs.enabled`.
3. **A proxy permission issue.** The job attempted to run but a `CmdExec`/`PowerShell`
   step failed immediately because its proxy's credential doesn't have rights on the
   target resource — this usually *does* show up in `sysjobhistory` with an
   access-denied message, unlike causes 1 and 2.
4. **The job is targeted at the wrong server**, or `sp_add_jobserver` was never called
   — rare, but it produces the same symptom as a disabled schedule: nothing in
   `sysjobhistory` at all.

The split matters diagnostically: causes 1, 2, and 4 leave **no row** in
`sysjobhistory` because Agent never attempted the run. Cause 3 **does** leave a row,
with a specific failure message. That's the fastest way to tell which bucket a "silent"
failure falls into — check history first; an empty result narrows it to service,
schedule, or targeting, before you even open Configuration Manager.

## Key terms

| Term | Meaning |
|---|---|
| `sysjobhistory` | Per-step execution log for every job run Agent actually attempted |
| `run_status` | 0=Failed, 1=Succeeded, 2=Retry, 3=Canceled |
| Agent error log | Agent's own log file (separate from the SQL Server Engine error log), viewable in SSMS |
| Silent non-run | No sysjobhistory row at all — points to Agent service, schedule, or server-targeting problems |

## Check yourself

A job has zero rows in `sysjobhistory`, ever, since it was created. Walk through the
three most likely causes this lesson lists, in the order you'd check them.
