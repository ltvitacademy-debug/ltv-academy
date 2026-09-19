# Lesson 68 — Elastic Jobs & Azure Database Tasks

**Chapter 11 · Azure Automation & Infrastructure as Code · Lesson 68 of 95**

## What you'll learn

- Why Elastic Jobs exist: SQL Server Agent's limited Azure SQL Database support (Lesson 59)
- The three pieces of an elastic job: job agent, target group, job
- Real T-SQL for creating a target group and a scheduled job

## The gap this fills

Lesson 59 already established the real limit: SQL Server Agent, as a
full on-server scheduler, doesn't run the way you'd expect inside Azure
SQL Database itself. That leaves a real gap — how do you run the same
maintenance script across an elastic pool of forty databases, or across
every database on three different servers, on a schedule, without
writing and babysitting forty separate connections by hand? **Elastic
Jobs** is Microsoft's purpose-built answer: an Agent-like job scheduler
that runs a single T-SQL script against a defined group of target
databases.

## The three pieces

- **Job agent database** — a small, dedicated database (on its own
  elastic pool or single database) that stores job definitions,
  schedules, and execution history. It doesn't hold your data; it holds
  the automation metadata.
- **Target group** — the list of databases (or an entire elastic pool,
  or every database on a server) the job should run against. You define
  this once, then every job just points at the group.
- **Job** — the actual T-SQL script plus a schedule. One job, one script,
  potentially dozens or hundreds of databases.

## Building a target group and a job

```sql
-- Add a target group, then a member database to run against
EXEC jobs.sp_add_target_group 'ProductionPool';
EXEC jobs.sp_add_target_group_member
    'ProductionPool',
    @target_type = 'SqlDatabase',
    @server_name = 'myserver.database.windows.net',
    @database_name = 'SalesDB';

-- Create a weekly job and point one step at that target group
EXEC jobs.sp_add_job
    @job_name = 'WeeklyIndexMaintenance',
    @enabled = 1,
    @schedule_interval_type = 'Week',
    @schedule_interval_count = 1;

EXEC jobs.sp_add_jobstep
    @job_name = 'WeeklyIndexMaintenance',
    @command = N'EXEC dbo.IndexMaintenance;',
    @target_group_name = 'ProductionPool';
```

Every one of those stored procedures lives in the `jobs` schema, inside
the job agent database — not inside `SalesDB` itself. Add more member
databases to `ProductionPool` later, and the same weekly job runs against
all of them without a single change to the job definition.

## Where the T-SQL comes from

Notice `@command = N'EXEC dbo.IndexMaintenance;'` — that's just a stored
procedure call. Elastic Jobs doesn't ask you to learn new scripting; it
asks you to already have working T-SQL (a maintenance procedure,
Lesson 53) and hands you a scheduler that runs it everywhere it needs to
run. That's the direct parallel to SQL Server Agent jobs from Lesson 60:
same idea, aimed at Azure SQL Database's actual architecture.

## Key terms

| Term | Meaning |
|---|---|
| Elastic Jobs | Azure SQL Database's job scheduler, running one script against many target databases |
| Job agent database | The dedicated database storing job definitions and history |
| Target group | The named set of databases/pools/servers a job runs against |

## Check yourself

Name the three pieces of an elastic job, and explain what changes (and
what doesn't) when you add a new database to an existing target group
that already has a weekly job running against it.
