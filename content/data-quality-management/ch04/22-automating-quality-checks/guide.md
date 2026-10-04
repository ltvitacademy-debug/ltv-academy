# Lesson 22 — Automating Quality Checks

**Chapter 4 · Rules and Checks · Lesson 22 of 30**

## What you'll learn

- Why a check that only runs when someone remembers isn't really a
  quality program
- How to schedule a T-SQL check as a SQL Server Agent job
- How a check makes its failure *loud* enough that someone notices
- When to reach for an orchestration tool (like Azure Data Factory)
  instead of — or alongside — SQL Server Agent

## Why automation is the point

Every check, rule, and threshold built so far in this chapter is only
as good as how reliably it actually runs. A brilliant referential
integrity check that one person remembers to run every couple of
weeks isn't a quality program — it's a habit that will eventually
lapse, usually right before the week something actually breaks.
Automation isn't a nice-to-have on top of Chapter 4's work; it's what
turns detection from "sometimes" into "always."

## Scheduling a check with SQL Server Agent

SQL Server Agent — the same service visible in Object Explorer's tree
— runs jobs on a schedule, in response to an alert, or on demand.

![SQL Server Management Studio's Object Explorer tree with a connected server expanded, showing the SQL Server Agent node near the bottom, alongside Databases, Security, and Replication.](/courses/data-quality-management/ch04/22-automating-quality-checks/ssms.png)
*SQL Server Agent — the node where every scheduled job in this lesson gets created and managed.*

A job built around a data quality check is a **T-SQL job step** whose
command is the check itself, wired into a schedule:

```sql
USE msdb;
GO

EXECUTE dbo.sp_add_job
    @job_name = N'DQ_Check_MissingShippingAddress';
GO

EXECUTE sp_add_jobstep
    @job_name = N'DQ_Check_MissingShippingAddress',
    @step_name = N'Run threshold check',
    @subsystem = N'TSQL',
    @command = N'
        IF EXISTS (
            SELECT 1 FROM dbo.Orders
            HAVING SUM(CASE WHEN ShippingAddress IS NULL
                            THEN 1 ELSE 0 END) > 50
        )
        RAISERROR(''DQ check failed: missing shipping address threshold exceeded'', 16, 1);
    ',
    @retry_attempts = 0;
GO

EXECUTE dbo.sp_add_schedule
    @schedule_name = N'Nightly_0200',
    @freq_type = 4,              -- daily
    @freq_interval = 1,
    @active_start_time = 020000; -- 2:00 AM
GO

EXECUTE sp_attach_schedule
    @job_name = N'DQ_Check_MissingShippingAddress',
    @schedule_name = N'Nightly_0200';
GO

EXECUTE dbo.sp_add_jobserver
    @job_name = N'DQ_Check_MissingShippingAddress';
GO
```

## Making failure loud

The `RAISERROR` call above is the critical detail: a `SELECT` that
just *returns rows* doesn't make a scheduled job fail — nothing
downstream notices unless something actually raises an error. A job
step only shows as **Failed** in SQL Server Agent's history when the
T-SQL it ran raises an error (`RAISERROR` or `THROW`) or returns a
non-zero exit code. Pair that failed job state with an **operator**
and a **notification** (configured on the job's Notifications page)
and the right person gets an email the moment a threshold is crossed —
not whenever they next happen to check.

## When to reach for an orchestration tool instead

SQL Server Agent is the right default when every table involved lives
in the same SQL Server environment. When a check needs to validate
data arriving through a broader pipeline — a file landing in storage
before it's even loaded, or a step that has to gate whether downstream
pipeline activities run at all — an orchestration tool's own
validation step is often a better fit. Azure Data Factory (and Fabric
pipelines, built on the same engine) has a dedicated **Validation**
activity for exactly this:

![Azure Data Factory's pipeline canvas with a Validation activity added, its Settings tab open showing a Dataset selector, a Timeout field, and Child items options.](/courses/data-quality-management/ch04/22-automating-quality-checks/validation-activity.png)
*The Validation activity — delays a pipeline until a dataset exists and meets defined criteria, or times out.*

The Validation activity pauses the *pipeline itself* until a dataset
reference is confirmed to exist (and optionally meets size or
modified-date criteria) — a natural fit when the quality gate needs to
block downstream activities, not just alert someone after the fact.
SQL Server Agent and pipeline-native validation aren't competitors;
most real data platforms use both, for different stages of the same
pipeline.

## Key terms

| Term | Meaning |
|---|---|
| SQL Server Agent job | A scheduled, named unit of work made of one or more steps |
| Job step | One unit of work inside a job — here, the T-SQL check itself |
| Operator / notification | The contact and alert mechanism tied to a job's failure |
| Validation activity | An Azure Data Factory/Fabric pipeline activity that gates execution on a dataset condition |

## Lab

1. Take one threshold check you wrote in Lesson 21 and wrap it in an
   `IF EXISTS (...) RAISERROR(...)` pattern, the same shape shown
   above.
2. Write the `sp_add_job` / `sp_add_jobstep` / `sp_add_schedule` /
   `sp_attach_schedule` / `sp_add_jobserver` script to schedule it
   nightly (you don't need a live SQL Server Agent service running to
   write and review this script correctly).
3. In a comment, explain what would happen — in SQL Server Agent's job
   history — if the `RAISERROR` line were removed and the step was
   left as a plain `SELECT`.

## Check yourself

- Why doesn't a plain `SELECT` that returns violating rows cause a
  SQL Server Agent job step to fail?
- What's the difference in purpose between a SQL Server Agent job and
  an Azure Data Factory Validation activity?
- Why is "someone remembers to run it" not a real automation strategy?
