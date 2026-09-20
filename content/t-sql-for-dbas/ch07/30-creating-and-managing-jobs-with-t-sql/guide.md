# Creating & Managing Jobs With T-SQL

SSMS's job wizard is fine for a one-off, but it doesn't scale, and it leaves no script
behind for source control or disaster recovery. Every piece of a SQL Server Agent job —
the job itself, its steps, its schedule, and the server it runs on — can be created with a
handful of `msdb` stored procedures. This lesson builds one job end to end.

## What you'll learn

- The four `msdb` stored procedures that assemble a job from scratch
- Why a job needs `sp_add_jobserver` before it will actually run
- How to script a job so it's reproducible, not just clickable

## sp_add_job: creating the job shell

`sp_add_job` creates the job record itself — a name and metadata, no steps yet:

```sql
EXEC msdb.dbo.sp_add_job
    @job_name = N'Nightly Index Maintenance',
    @enabled = 1,
    @description = N'Rebuilds/reorganizes fragmented indexes nightly.';
```

## sp_add_jobstep: adding what it actually does

A job with no steps does nothing. `sp_add_jobstep` attaches a T-SQL command (or another
subsystem, like PowerShell or SSIS) to the job:

```sql
EXEC msdb.dbo.sp_add_jobstep
    @job_name = N'Nightly Index Maintenance',
    @step_name = N'Run maintenance',
    @subsystem = N'TSQL',
    @command = N'EXEC dbo.IndexMaintenance;',
    @database_name = N'AdventureWorks2019';
```

`@subsystem = N'TSQL'` is the common case for a DBA script; `@database_name` sets the
context the command runs in.

## sp_add_schedule and sp_attach_schedule: when it runs

A schedule is created independently of any job, then attached to one:

```sql
EXEC msdb.dbo.sp_add_schedule
    @schedule_name = N'Nightly 1AM',
    @freq_type = 4,           -- 4 = daily
    @freq_interval = 1,       -- every 1 day
    @active_start_time = 010000; -- 01:00:00

EXEC msdb.dbo.sp_attach_schedule
    @job_name = N'Nightly Index Maintenance',
    @schedule_name = N'Nightly 1AM';
```

Because schedules are separate objects, one schedule can be attached to several jobs —
useful when a maintenance window needs to run more than one thing at the same time.

## sp_add_jobserver: don't skip this

A job with steps and a schedule still won't run anywhere until it's targeted at a server.
For a standalone instance, that's always `(LOCAL)`:

```sql
EXEC msdb.dbo.sp_add_jobserver
    @job_name = N'Nightly Index Maintenance';
```

Forgetting this step is a common source of "the job exists, has a schedule, but never
fires" tickets — the job simply isn't assigned to run anywhere.

## Key terms

| Term | Meaning |
|---|---|
| `sp_add_job` | msdb procedure creating the job record itself |
| `sp_add_jobstep` | msdb procedure attaching a command/subsystem to a job as a step |
| `sp_add_schedule` / `sp_attach_schedule` | Create a reusable schedule, then attach it to a job |
| `sp_add_jobserver` | Targets the job at a server so it actually runs; easy to forget |

## Check yourself

A job has steps and a schedule attached but never actually runs. What's the most likely
missing piece?
