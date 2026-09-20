# Agent Architecture

Chapter 6 covered maintenance jobs assuming they just "run on a schedule." Now it's time
to open up the thing that actually runs them: SQL Server Agent. Everything from here through
the end of this chapter — job creation, schedules, alerts, proxies, troubleshooting — sits on
top of the architecture in this lesson.

## What you'll learn

- Why SQL Server Agent is a separate Windows service, not part of the Database Engine
- Where Agent stores its configuration (it's a database, not a config file)
- The object model that every Agent job is built from: jobs, steps, schedules, alerts, operators

## A service of its own

SQL Server Agent runs as its own Windows service, independent of the Database Engine service.
For a default instance it's **SQLSERVERAGENT**; for a named instance it's
**SQLAgent$\<InstanceName\>**. That separation matters operationally: you can stop and start
Agent without touching the Engine, and — critically for troubleshooting — Agent can be
stopped while the Engine keeps serving queries just fine, which means "my job didn't run"
and "my database is down" are two completely different problems with two completely
different first checks. Agent's startup type should be **Automatic**, same as the Engine
service, so it comes back up after a reboot without a manual step.

Agent is not required to run SQL Server at all — a server can host databases and answer
queries with Agent stopped indefinitely. It exists specifically to run scheduled and
event-driven work: backups, index maintenance, ETL steps, custom T-SQL, and anything else
that shouldn't require a human to kick it off.

## msdb: Agent's metadata store

Agent doesn't keep its configuration in a file — it keeps it in tables inside the **msdb**
system database, the same database that holds backup/restore history (Lesson 6 in Chapter 1
touched on this). The core tables:

- `msdb.dbo.sysjobs` — one row per job
- `msdb.dbo.sysjobsteps` — one row per step within a job
- `msdb.dbo.sysschedules` — reusable schedule definitions
- `msdb.dbo.sysjobschedules` — the link between a job and a schedule
- `msdb.dbo.sysoperators` — people (or distribution lists) who get notified
- `msdb.dbo.sysalerts` — conditions that trigger a notification or a job
- `msdb.dbo.sysjobhistory` — the execution log for every job run

You will query most of these directly when troubleshooting later in this chapter — Agent
gives you a GUI in SSMS, but the GUI is just reading and writing these same tables.

## The object model

Every piece of Agent's functionality is built from five object types working together:

1. **Job** — the unit of scheduled work, identified by name
2. **Step** — one action within a job; a job can have many steps, run in sequence, with
   configurable success/failure branching between them
3. **Schedule** — when a job runs; schedules are reusable and can be attached to more than
   one job
4. **Alert** — a condition (a specific error number, or any error at a given severity) that
   Agent watches for
5. **Operator** — a person or team who receives a notification, almost always by email via
   Database Mail today (the old pager and net send notification methods are effectively
   retired)

A job runs its steps on its schedule; separately, an alert fires when its condition occurs
and can notify an operator, run a job, or both. Jobs and alerts are related but independent
— most jobs never involve an alert at all, and most alerts aren't tied to a job.

## Key terms

| Term | Meaning |
|---|---|
| SQLSERVERAGENT / SQLAgent$\<Instance\> | The Windows service name for Agent on a default vs. named instance |
| msdb | The system database holding Agent's entire configuration and job history |
| Job | The named unit of scheduled work, made of one or more steps |
| Step | A single action within a job, executed by a specific subsystem (T-SQL, CmdExec, etc.) |
| Alert | A watched condition (error number or severity) that can trigger a notification or a job |
| Operator | The person or distribution list Agent notifies |

## Check yourself

The Database Engine service is running fine and queries are answering normally, but a
nightly backup job silently didn't run last night. Based on this lesson's architecture,
what's the very first service you'd check — and why doesn't a healthy Engine guarantee a
healthy Agent?
