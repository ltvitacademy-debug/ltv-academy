# Lesson 11 — Scheduling the Maintenance Job

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 11 of 16**

## What you'll learn

- Why classic SQL Server Agent isn't the right answer on Azure SQL Database specifically
- Elastic Jobs: the three pieces, and why this is the real PaaS-native mechanism
- Scheduling Lesson 10's script for real, in a genuine low-traffic window
- Verifying the schedule actually ran, not just that it was created

## Why not just use SQL Server Agent

On a Managed Instance or a VM-hosted SQL Server, `sp_add_job` and
`sp_add_jobstep` would be the natural next step. `OverlookClinicalDB`
is Azure SQL Database — a true PaaS database, not a managed instance
— and SQL Server Agent doesn't run the way you'd expect there at all.
Reaching for the on-prem Agent pattern on Azure SQL Database
specifically is the wrong tool for this platform, not just an
old-fashioned one.

## Elastic Jobs: the real Azure SQL Database answer

**Elastic Jobs** is Microsoft's purpose-built scheduler for exactly
this platform: a job agent database holds job definitions and
history, a target group defines which database(s) the job runs
against, and a job is the T-SQL script plus its schedule:

```sql
-- Target group: just OverlookClinicalDB for now
EXEC jobs.sp_add_target_group 'OverlookMaintenanceGroup';
EXEC jobs.sp_add_target_group_member
    'OverlookMaintenanceGroup',
    @target_type = 'SqlDatabase',
    @server_name = 'overlookclinical.database.windows.net',
    @database_name = 'OverlookClinicalDB';
```

## Scheduling Lesson 10's script

```sql
-- A weekly job, run in a genuine low-traffic window: Sunday 2 AM
EXEC jobs.sp_add_job
    @job_name = 'WeeklyIndexMaintenance',
    @enabled = 1,
    @schedule_interval_type = 'Week',
    @schedule_interval_count = 1,
    @schedule_start_time = '2026-01-04T02:00:00';

EXEC jobs.sp_add_jobstep
    @job_name = 'WeeklyIndexMaintenance',
    @command = N'EXEC dbo.RunIndexMaintenance;', -- Lesson 10's script, as a proc
    @target_group_name = 'OverlookMaintenanceGroup';
```

Scheduling for Sunday 2 AM, rather than a weekday mid-morning,
matters for the exact same reason this chapter started: a `REBUILD`
consumes real CPU, I/O, and log throughput — the same resources
Billing and Scheduling need during the day. Running maintenance
against the clinic's quietest hour avoids competing with the exact
traffic that caused this chapter's problems in the first place.

## Verifying it actually ran

```sql
SELECT job_execution_id, job_name, lifecycle, start_time, end_time
FROM jobs.job_executions
WHERE job_name = 'WeeklyIndexMaintenance'
ORDER BY start_time DESC;
```

Creating a job is not the same as confirming it ran successfully —
`jobs.job_executions` is the real execution-history view, and
`lifecycle` showing `Succeeded` (not `Failed` or `InProgress`
indefinitely) is the actual proof the schedule is working, the same
discipline as Lesson 7's re-tested execution plan.

## Key terms

| Term | Meaning |
|---|---|
| Elastic Jobs | Azure SQL Database's own job scheduler, purpose-built for PaaS databases |
| Target group | The named set of databases a job runs against |
| `jobs.job_executions` | The real history view confirming a scheduled job actually ran and succeeded |

## Lab

Create a target group and a weekly job pointing at your own practice
database, running Lesson 10's maintenance script. Query
`jobs.job_executions` afterward and confirm a `Succeeded` row.

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
is classic SQL Server Agent the wrong tool specifically on Azure SQL
Database, and why does scheduling the job for Sunday 2 AM matter for
the same reason this whole chapter started?
