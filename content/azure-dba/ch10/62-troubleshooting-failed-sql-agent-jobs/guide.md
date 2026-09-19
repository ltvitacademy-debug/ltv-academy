# Lesson 62 — Troubleshooting Failed SQL Agent Jobs

**Chapter 10 · SQL Server Agent & Automation · Lesson 62 of 95**

## What you'll learn

- The real troubleshooting flow: job history first, always
- How to isolate exactly which step failed and why
- The most common real-world cause — Agent service account permissions — and why it's so often overlooked
- Other frequent causes: schedule conflicts, dependent resources not yet available, and step-level context differences

## Start at job history — always

Every job run writes history automatically. Before checking
permissions, before checking the underlying object, before assuming
anything, look at what actually happened:

```sql
SELECT
    j.name AS job_name,
    h.step_id,
    h.step_name,
    h.run_date,
    h.run_time,
    h.run_status,   -- 0 = failed, 1 = succeeded, 3 = cancelled
    h.message
FROM msdb.dbo.sysjobhistory h
JOIN msdb.dbo.sysjobs j ON h.job_id = j.job_id
WHERE j.name = N'Nightly Index Maintenance'
ORDER BY h.run_date DESC, h.run_time DESC;
```

The `message` column is not decoration — it usually contains the
actual T-SQL error, the OS-level error for a CmdExec step, or a
PowerShell exception, verbatim. Most job troubleshooting mistakes
come from skipping straight to "let me re-run it and see" instead of
reading what SQL Server already told you the first time.

## Isolate the specific step

A job with five steps failing tells you almost nothing on its own —
`step_id` in the history tells you exactly which one, and multi-step
jobs commonly fail on step 3 while steps 1 and 2 succeeded cleanly.
Once you know the step, you know its `@subsystem` and `@command`,
which tells you exactly what to test manually (run that same T-SQL,
that same PowerShell script, or that same CmdExec command) outside of
Agent, as the same account Agent uses to run it.

## The most common real-world cause: the Agent service account

This is the cause that catches DBAs who assume a job's T-SQL is the
problem when it isn't. SQL Server Agent's job steps don't
automatically run as *your* login — they run as whatever security
context that step's subsystem is configured for:

- A **TSQL** step runs as the job owner (or, for `sysadmin`-owned
  jobs, potentially in the context you specify).
- A **CmdExec** or **PowerShell** step runs as the SQL Server Agent
  **service account** by default, unless a proxy account is
  configured.

If that service account doesn't have permission to write to a
network share, call an external endpoint, or read a file the step
references, the step fails with a permissions error that has nothing
to do with the T-SQL or script's logic being wrong. This is a real,
frequent, and frequently misdiagnosed failure — the fix is either
granting the service account the access it genuinely needs, or (the
more secure, more correct answer) configuring a dedicated **proxy
account** scoped to only what that step needs, rather than widening
the Agent service account's own permissions.

```sql
-- See what account a CmdExec/PowerShell step actually runs as:
EXEC msdb.dbo.sp_help_jobstep
    @job_name = N'Nightly Index Maintenance',
    @step_id = 2;
-- Check @proxy_id: NULL means it ran as the Agent service account itself.
```

## Other frequent causes

- **Schedule conflicts**: two maintenance jobs scheduled for the same
  window, one blocking a resource (a table lock, a backup device) the
  other needs.
- **Dependent resource not ready yet**: a job assumes a linked server,
  a file share, or an upstream ETL job's output exists by the time it
  runs, and a timing shift breaks that assumption silently until the
  job fails.
- **Context differences**: a T-SQL step that works fine when you run
  it manually in SSMS (your login, your default database) can fail
  under the job owner's different default database or permission set.

## Key terms

| Term | Meaning |
|---|---|
| `sysjobhistory` | msdb table recording every job run, per step, with status and message |
| Agent service account | The Windows/service identity CmdExec and PowerShell steps run as by default |
| Proxy account | A scoped, dedicated identity for a step instead of widening the service account's permissions |
| `sp_help_jobstep` | Shows a step's configuration, including whether a proxy is in use |

## Check yourself

You're ready for Lesson 63 when you can explain, without looking: why
does a job's T-SQL logic being perfectly correct not rule out a
permissions-related failure, and what's the first table you'd query
the moment a job fails?
