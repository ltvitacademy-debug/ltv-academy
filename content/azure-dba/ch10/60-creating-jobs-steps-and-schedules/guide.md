# Lesson 60 — Creating Jobs, Steps & Schedules

**Chapter 10 · SQL Server Agent & Automation · Lesson 60 of 95**

## What you'll learn

- The real stored-procedure workflow for building a job: `sp_add_job`, `sp_add_jobstep`, `sp_add_jobschedule`
- A step's on-success and on-failure actions — not just "run this T-SQL"
- Step types beyond T-SQL: PowerShell, CmdExec, and why that range matters
- How schedules actually recur, and the one-time/on-Agent-start options

## The real system stored procedures

SSMS's job wizard is a UI wrapped around a fixed sequence of system
stored procedures in `msdb`. Knowing them directly matters because
this is also exactly what you'd script for source control or repeat
across environments:

```sql
USE msdb;
EXEC sp_add_job
    @job_name = N'Nightly Index Maintenance';

EXEC sp_add_jobstep
    @job_name = N'Nightly Index Maintenance',
    @step_name = N'Rebuild Fragmented Indexes',
    @subsystem = N'TSQL',
    @command = N'EXEC dbo.usp_RebuildFragmentedIndexes;',
    @on_success_action = 3,  -- go to next step
    @on_fail_action = 2;     -- quit the job, reporting failure

EXEC sp_add_schedule
    @schedule_name = N'Nightly2AM',
    @freq_type = 4,          -- daily
    @freq_interval = 1,
    @active_start_time = 020000;

EXEC sp_attach_schedule
    @job_name = N'Nightly Index Maintenance',
    @schedule_name = N'Nightly2AM';

EXEC sp_add_jobserver
    @job_name = N'Nightly Index Maintenance';
```

`sp_add_jobserver` with no `@server_name` targets the local server —
this last step is easy to forget, and a job with no server target
never actually runs anywhere.

## A step's real structure: more than just "run this"

Every step has an **on-success action** and an **on-fail action**,
and they're independent of each other:

```
on_success_action:              on_fail_action:
1 = Quit reporting success      1 = Quit reporting success
2 = Quit reporting failure      2 = Quit reporting failure (the usual default)
3 = Go to next step             3 = Go to next step
4 = Go to step N                4 = Go to step N
```

This is what makes multi-step jobs genuinely useful instead of just
"one long script": a maintenance job might run integrity checks first
and, on failure, jump straight to an alerting step instead of
continuing on to a rebuild against a database that just failed
`CHECKDB`. Designing failure paths deliberately, step by step, is a
real DBA design skill, not a syntax detail.

## Step types beyond T-SQL

```sql
EXEC sp_add_jobstep
    @job_name = N'Nightly Index Maintenance',
    @step_name = N'Compress Log Archive',
    @subsystem = N'PowerShell',
    @command = N'Compress-Archive -Path C:\Logs\*.log -DestinationPath C:\Archive\logs.zip';
```

`@subsystem` is what makes Agent more than a T-SQL runner:
`TSQL`, `CmdExec` (any OS-level command or executable),
`PowerShell`, and `SSIS` packages are all valid step types inside the
same job. A real maintenance job commonly mixes these — a T-SQL step
to do the database work, then a PowerShell or CmdExec step to move a
log file or call an external notification endpoint.

## How schedules actually work

`sp_add_schedule`'s `@freq_type` controls the whole recurrence model:
`1` = one-time, `4` = daily, `8` = weekly, `16` = monthly, and `64` =
runs whenever SQL Server Agent starts (useful for jobs that should
always run once after a service restart). A schedule is a standalone
object — `sp_attach_schedule` is a separate step specifically because
one schedule can be reused across multiple jobs (a shared "every
night at 2 AM" schedule attached to several unrelated maintenance
jobs, instead of redefining the same recurrence over and over).

## Key terms

| Term | Meaning |
|---|---|
| `sp_add_job` | Creates the job container |
| `sp_add_jobstep` | Adds one step, with its own subsystem, command, and on-success/on-fail actions |
| `sp_add_schedule` / `sp_attach_schedule` | Creates a reusable schedule, then attaches it to a job |
| `sp_add_jobserver` | Targets the job at a server — required or the job never runs |

## Check yourself

You're ready for Lesson 61 when you can explain, without looking: what
are the four system stored procedures needed to fully create and
schedule a working job, and why are on-success and on-fail actions
set independently per step instead of one setting per job?
