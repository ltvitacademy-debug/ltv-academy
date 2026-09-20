# DIY Monitoring Scripts

T-SQL for Database Administrators built a troubleshooting toolkit: a set of scripts a DBA keeps
handy for when something's already wrong. This lesson takes that same instinct — your own
scripts, no vendor required — and turns it into something that runs continuously in the
background rather than only when someone's on fire. It's the free alternative to Lesson 45's
commercial category: less polished, but built entirely from things this chapter has already
covered, and something you fully understand because you wrote it.

## What you'll learn

- How to combine a scheduled Agent job with a permanent logging table into a working monitor
- A concrete, real T-SQL pattern for logging DMV snapshots on a schedule
- Why retention (deleting old rows) matters just as much as capturing new ones

## The pattern: a scheduled job, a stored procedure, a table

Lesson 43 already introduced the pieces — a history table and a recurring capture. A DIY
monitoring setup wires them together into something that runs unattended:

```sql
CREATE TABLE dba.PerfLog (
    LogID        INT IDENTITY PRIMARY KEY,
    CapturedAt   DATETIME2      NOT NULL DEFAULT SYSDATETIME(),
    MetricName   NVARCHAR(128)  NOT NULL,
    MetricValue  BIGINT         NOT NULL
);

CREATE OR ALTER PROCEDURE dba.CapturePerfSnapshot
AS
BEGIN
    INSERT INTO dba.PerfLog (MetricName, MetricValue)
    SELECT counter_name, cntr_value
    FROM sys.dm_os_performance_counters
    WHERE object_name LIKE '%Buffer Manager%'
       OR object_name LIKE '%SQL Statistics%';
END;
```

A SQL Server Agent job with a single T-SQL step — `EXEC dba.CapturePerfSnapshot;` — scheduled to
recur every 15 minutes turns this into exactly the kind of continuous collection Lesson 45
described commercial tools providing, minus the dashboard and the invoice.

## Retention matters as much as capture

A table that only ever grows eventually becomes its own performance problem. A second Agent job
step, or a separate scheduled job, should regularly prune old rows:

```sql
DELETE FROM dba.PerfLog
WHERE CapturedAt < DATEADD(DAY, -60, SYSDATETIME());
```

Sixty days is a reasonable starting retention window — long enough to compare "this Monday"
against several previous Mondays, short enough that the table doesn't grow without bound. This
is the same discipline any production table needs, just applied to a table the DBA created for
monitoring rather than one the application owns.

## From logging to actually reviewing it

A logging table sitting untouched is no better than the raw DMVs it snapshots. The real payoff
comes from querying it deliberately: a weekly review comparing this week's PLE and batch
requests/sec against the trailing average, or building the baseline-comparison alert from
Lesson 44 directly against this table. The scripts don't have to be sophisticated to be useful —
a table, a stored procedure, an Agent job, and a habit of actually looking at it gets a DBA most
of the practical value of a commercial tool, built from parts already covered in this course.

## Key terms

| Term | Meaning |
|---|---|
| DIY monitoring | A self-built monitoring setup using a scheduled Agent job, a logging procedure, and a permanent table |
| Logging procedure | A stored procedure that inserts a DMV snapshot into a permanent table, called on a schedule |
| Retention window | How long old monitoring rows are kept before being deleted, balancing history against table growth |
| Toolkit script | A reusable, DBA-authored script kept on hand and understood in full, as opposed to a vendor's black box |

## Check yourself

Why does the retention cleanup job (deleting rows older than 60 days) matter just as much as the
capture job itself, in a DIY monitoring setup?
