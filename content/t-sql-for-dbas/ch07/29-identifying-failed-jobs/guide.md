# Identifying Failed Jobs

Knowing how to read job history is only useful once you can filter it down to the handful
of runs that actually need attention. This lesson narrows the last lesson's query into one
question every DBA asks first thing in the morning: what failed overnight, and why?

## What you'll learn

- How to filter `sysjobhistory` down to failures only
- Why the failing *step*, not just the failing *job*, is what you actually need
- How to join `sysjobsteps` to see the command that failed

## Filtering to failures

Filtering `run_status = 0` on the `step_id = 0` summary row tells you *that* a job failed.
It doesn't tell you *where*. For that, drop the `step_id = 0` filter and look at every step
row with a failure status instead:

```sql
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
ORDER BY run_datetime DESC;
```

The `message` column carries the actual error text Agent captured — often the same error
you'd see if you ran the failing statement by hand.

## Seeing the command that failed

`h.step_name` tells you which step failed, but not what it ran. `msdb.dbo.sysjobsteps`
stores the actual command text for every step, so joining it in shows exactly what SQL
Server was trying to execute:

```sql
SELECT
    j.name AS job_name,
    h.step_name,
    s.command,
    h.message,
    msdb.dbo.agent_datetime(h.run_date, h.run_time) AS run_datetime
FROM msdb.dbo.sysjobs AS j
JOIN msdb.dbo.sysjobhistory AS h
    ON j.job_id = h.job_id
JOIN msdb.dbo.sysjobsteps AS s
    ON h.job_id = s.job_id AND h.step_id = s.step_id
WHERE h.run_status = 0
  AND h.step_id <> 0
ORDER BY run_datetime DESC;
```

That single result set — job, step, command, error message, and timestamp — is usually
enough to diagnose a failed job without opening SSMS's job history dialog at all.

## Key terms

| Term | Meaning |
|---|---|
| `sysjobsteps` | msdb table storing each job's step definitions, including the `command` text |
| `run_status = 0` | The failure code in `sysjobhistory`, on either the summary row or a step row |
| `message` | Column in `sysjobhistory` holding the error text Agent captured for that run |

## Check yourself

Why is filtering `sysjobhistory` on `step_id = 0` not enough to find *which* step in a
multi-step job actually failed?
