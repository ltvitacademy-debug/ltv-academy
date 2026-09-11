# Lesson 15 — Basic Monitoring

**Chapter 3 · Production Practices · Lesson 15 of 25**

## What you'll learn

- How to check whether the pipeline actually ran and worked, using
  each tool's own built-in history — the **SSIS Integration Services
  catalog**, **SQL Server Agent job history**, and **Power BI's
  dataset refresh history**
- What success, failure, duration, and row counts each look like in
  practice
- Why this is a practical, BI-developer-scoped check, not a full
  observability platform

## The question this lesson answers

Deployment moved the pipeline into production. Scheduling made it run
without you. The last piece is knowing, without waiting for someone to
complain, whether it's actually healthy. That's monitoring — and at
this scope, it means knowing where each tool already keeps its own
history, not standing up a separate platform to watch them.

## Checking SSIS: the Integration Services catalog

Every run of `WorkOrderETL.dtsx` — whether the Agent job triggered it
or you ran it by hand — is logged inside **SSISDB** itself. In SSMS,
expand **Integration Services Catalogs**, the same place the project
was deployed to in Lesson 12.

![SSISDB nested under Integration Services Catalogs in SSMS's Object Explorer.](/courses/microsoft-bi-capstone/ch03/15-basic-monitoring/ssisdb-catalog-object-explorer.png)
*The same catalog you deployed into is also where every run gets logged.*

From there, three built-in reports cover the day-to-day check:

| Report | What it shows |
|---|---|
| Active Operations | What's running right now, with a Stop button if something's stuck |
| Dashboard | A summary of the last 24 hours — drill into Overview / Messages for one run |
| All Executions | Any date range, with the exact parameter values a given run used |

Whether `WorkOrderETL` succeeded, how long it took, and — if logging
is set above the Basic default — per-component row counts and timing,
all live in these three reports.

## Checking SQL Server Agent's job history

The Agent job itself keeps a separate history from the package it
runs. **Job Activity Monitor** shows which jobs ran, succeeded, or are
still running right now, across every job on the instance.
Right-clicking the `WorkOrderETL` job specifically and choosing **View
History** shows every past run, its outcome, and per-step detail — the
first place to check if the job didn't fire at all, as opposed to
firing and the package itself failing.

## Checking Power BI's refresh history

The Power BI half of this pipeline closes the loop the same way.
Opening the work order dashboard's semantic model in the Service and
checking its **refresh history** shows status, duration, and — for any
failed attempt — the exact error message, all in one grid.

![A refresh history grid, listing each refresh attempt with its status, start time, duration, and any error message.](/courses/microsoft-bi-capstone/ch03/15-basic-monitoring/refresh-history.png)
*Start here first whenever the dashboard looks like it's showing stale data.*

## Putting the three together

A pipeline actually being healthy means all three of these agree: the
SSIS job ran and succeeded, the warehouse tables got refreshed, and
Power BI's refresh afterward also succeeded. If the dashboard looks
wrong, checking these three — in this order — is almost always faster
than guessing.

## Key terms

| Term | Meaning |
|---|---|
| Integration Services catalog reports | SSISDB's built-in Active Operations, Dashboard, and All Executions reports for a deployed project |
| Job Activity Monitor | SQL Server Agent's live view of which jobs are running, succeeded, or failed right now |
| View History | The per-job history of every past run, its outcome, and step-level detail |
| Refresh history | The Power BI Service's per-semantic-model log of every scheduled refresh attempt, its status, and any error |

## Lab

1. In SSMS, open the SSISDB catalog's Dashboard report for the folder
   `WorkOrderETL` was deployed into, and drill into the most recent
   execution's Overview and Messages tabs.
2. Right-click the SQL Server Agent job from Lesson 13 and choose View
   History. Confirm it shows the run(s) you triggered.
3. In the Power BI Service, open the work order dashboard's semantic
   model and check its refresh history. If you haven't run a scheduled
   refresh yet, trigger a manual refresh first so there's a row to
   look at.

## Check yourself

You're ready for Chapter 4 when you can name which of the three tools
— SSISDB, SQL Server Agent, or Power BI — you'd check first for each
of: a package that never ran, a package that ran but failed halfway
through, and a dashboard showing data that looks a day out of date.
