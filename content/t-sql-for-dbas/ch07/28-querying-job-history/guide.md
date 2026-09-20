# Querying Job History

Every SQL Server Agent job leaves a trail. Whether a job ran fine or blew up at 2 AM, the
outcome is sitting in `msdb` waiting to be queried. This lesson is about reading that trail
with T-SQL instead of clicking through the Agent's "View History" dialog in SSMS one job at
a time.

## What you'll learn

- The two `msdb` tables that hold every job and its run history
- How `run_status` encodes success, failure, retry, and cancellation as integers
- How to convert Agent's packed `run_date`/`run_time` integers into a real datetime

## sysjobs and sysjobhistory

Two tables do almost all the work:

- **`msdb.dbo.sysjobs`** — one row per job: `job_id`, `name`, `enabled`, `description`.
- **`msdb.dbo.sysjobhistory`** — one row per job *step* execution, plus one summary row per
  job run where `step_id = 0`. That summary row is what most monitoring queries want.

```sql
SELECT
    j.name AS job_name,
    h.step_name,
    h.run_date,
    h.run_time,
    h.run_status,
    h.run_duration
FROM msdb.dbo.sysjobs AS j
JOIN msdb.dbo.sysjobhistory AS h
    ON j.job_id = h.job_id
WHERE h.step_id = 0
ORDER BY h.run_date DESC, h.run_time DESC;
```

## Decoding run_status

`run_status` is an integer, not a word, and every DBA has to memorize the mapping at some
point:

| run_status | Meaning |
|---|---|
| 0 | Failed |
| 1 | Succeeded |
| 2 | Retry |
| 3 | Canceled |
| 4 | In Progress |

A `CASE` expression turns that into something readable:

```sql
CASE h.run_status
    WHEN 0 THEN 'Failed'
    WHEN 1 THEN 'Succeeded'
    WHEN 2 THEN 'Retry'
    WHEN 3 THEN 'Canceled'
    WHEN 4 THEN 'In Progress'
END AS status
```

## Turning run_date and run_time into a real datetime

Agent stores `run_date` as an integer like `20260919` and `run_time` as `91530` for
9:15:30 AM — not a `datetime`, and not zero-padded. Don't hand-roll the string parsing;
`msdb` ships a function that already does it:

```sql
SELECT
    j.name AS job_name,
    msdb.dbo.agent_datetime(h.run_date, h.run_time) AS run_datetime,
    h.run_duration
FROM msdb.dbo.sysjobs AS j
JOIN msdb.dbo.sysjobhistory AS h
    ON j.job_id = h.job_id
WHERE h.step_id = 0
ORDER BY run_datetime DESC;
```

`agent_datetime` returns a proper `datetime` value, which makes filtering with `WHERE` and
sorting behave the way you'd expect.

## Key terms

| Term | Meaning |
|---|---|
| `sysjobs` | msdb table holding one row per Agent job |
| `sysjobhistory` | msdb table holding one row per job step execution, plus a `step_id = 0` summary row per run |
| `run_status` | Integer outcome code: 0 failed, 1 succeeded, 2 retry, 3 canceled, 4 in progress |
| `agent_datetime` | msdb function converting packed `run_date`/`run_time` integers into a `datetime` |

## Check yourself

Why does a query against `sysjobhistory` usually filter on `step_id = 0` rather than
pulling every row?
