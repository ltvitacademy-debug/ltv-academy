# Job Creation

Lesson 39 introduced the object model: jobs are made of steps, run on schedules, tied
to alerts and operators. This lesson gets hands-on with the first piece — creating a
job and its steps directly with T-SQL, the same system stored procedures the SSMS
"New Job" dialog calls behind the scenes.

## What you'll learn

- Creating a job with `sp_add_job`
- Adding one or more steps with `sp_add_jobstep`, and the subsystems a step can run under
- Targeting the job at a server with `sp_add_jobserver`
- Why step order and on-success/on-failure actions matter for multi-step jobs

## Creating the job itself

`sp_add_job` creates the job row in `msdb.dbo.sysjobs` but doesn't define what it does
yet — that's the steps. A minimal call:

```sql
EXEC msdb.dbo.sp_add_job
    @job_name = N'Nightly Full Backup',
    @enabled = 1,
    @description = N'Full backup of all user databases',
    @owner_login_name = N'sa';
```

At this point the job exists but has no steps and isn't targeted at any server — it
won't run until both of those are in place.

## Adding steps with sp_add_jobstep

A job can have multiple steps, each executed by a specific **subsystem**. The most
common subsystems are:

| Subsystem | Runs |
|---|---|
| `TSQL` | A T-SQL batch, against a specified database |
| `CmdExec` | An operating-system command or executable |
| `PowerShell` | A PowerShell script |
| `SSIS` | An Integration Services package |

A T-SQL step:

```sql
EXEC msdb.dbo.sp_add_jobstep
    @job_name = N'Nightly Full Backup',
    @step_name = N'Backup user databases',
    @subsystem = N'TSQL',
    @command = N'EXEC master.dbo.sp_MSforeachdb ''BACKUP DATABASE [?] TO DISK = ''''D:\Backups\?.bak'''''';',
    @database_name = N'master',
    @on_success_action = 3,   -- go to next step
    @on_fail_action = 2;      -- quit the job reporting failure
```

A CmdExec step (this is the one that needs a proxy — Lesson 43 covers why):

```sql
EXEC msdb.dbo.sp_add_jobstep
    @job_name = N'Nightly Full Backup',
    @step_name = N'Compress backup folder',
    @subsystem = N'CmdExec',
    @command = N'robocopy D:\Backups E:\BackupArchive /MIR';
```

Steps run in the order of their `step_id` (assigned automatically in creation order
unless you specify `@step_id`), and `@on_success_action` / `@on_fail_action` control
whether the job moves to the next step, quits reporting success, or quits reporting
failure. This branching is what lets a job skip a step, retry, or stop cleanly instead
of always running every step top to bottom.

## Targeting the job with sp_add_jobserver

A job with steps still won't run anywhere until it's targeted at a server:

```sql
EXEC msdb.dbo.sp_add_jobserver
    @job_name = N'Nightly Full Backup',
    @server_name = N'(local)';
```

For a standalone instance this is always the local server. `sp_add_jobserver` matters
more in multi-server administration (a master/target Agent topology), which is out of
scope for this course, but the call is required even on a single server — it's the
step that actually attaches the job to an instance to execute against.

## Key terms

| Term | Meaning |
|---|---|
| `sp_add_job` | Creates the job definition row in `msdb.dbo.sysjobs` |
| `sp_add_jobstep` | Adds a step to a job, run by a specific subsystem (TSQL, CmdExec, PowerShell, SSIS) |
| Subsystem | The execution engine a step runs under |
| `sp_add_jobserver` | Targets the job at a server so it can actually run |
| `on_success_action` / `on_fail_action` | Per-step branching: next step, quit reporting success, or quit reporting failure |

## Check yourself

You run `sp_add_job` and `sp_add_jobstep` for a new job, but it never shows up as
scheduled to run anywhere. What's the missing call, and what does it actually do?
