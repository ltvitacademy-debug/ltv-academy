# Lesson 13 — Scheduling & Automation

**Chapter 3 · Production Practices · Lesson 13 of 25**

## What you'll learn

- How to run the deployed `WorkOrderETL` package on a schedule using a
  **SQL Server Agent job**, calling the SSISDB catalog via `dtexec` or
  its own stored procedures
- The basics of a SQL Agent job step and schedule
- How to schedule **dataset refresh** for the Power BI dashboard in
  the Power BI Service, under Settings → Scheduled refresh

## Deployed isn't scheduled

Lesson 12 got `WorkOrderETL.dtsx` into the SSISDB catalog and the work
order dashboard into a Power BI Service workspace. Neither one runs on
its own yet. Someone — or something — still has to trigger them, and
in a real job that's never a person remembering to click a button
every morning.

## A SQL Server Agent job for the SSIS package

In SSMS, under **SQL Server Agent → Jobs**, a new job needs at least
one step. Set that step's **Type** to **SQL Server Integration
Services Package**, and its **Package Source** to **SSIS Catalog** —
pointing directly at the `WorkOrderETL` package sitting in SSISDB.

Just as important: set **Run as** to a dedicated **proxy account**,
not the SQL Server Agent service account itself. This is the single
most common SSIS scheduling failure — a package that runs perfectly
inside SSDT (as you, with your own permissions) but fails the moment
the job runs it, because the Agent service account doesn't have the
access your account had. A proxy scoped to exactly what the package
needs avoids that gap entirely.

Underneath that job step, one of two things actually happens:

```
dtexec /ISServer "\SSISDB\WorkOrders\WorkOrderETL\WorkOrderETL.dtsx"

-- or, calling the catalog's own stored procedure directly:
EXEC [SSISDB].[catalog].[start_execution] @execution_id
```

Either way, it's the exact same deployed package — the job step is
just what triggers it unattended.

Once the step exists, the job's **Schedule** tab is where the actual
timing lives: a recurring schedule (daily, at a set time, for
example) that the SQL Server Agent service checks and fires on its
own.

## Scheduled refresh for the Power BI dashboard

The work order dashboard's semantic model needs its own schedule,
separate from the SSIS job. In the Power BI Service, open the
semantic model and use the **Refresh** menu's **Schedule refresh**
option.

![The semantic model's Refresh menu, with Schedule refresh highlighted.](/courses/microsoft-bi-capstone/ch03/13-scheduling-and-automation/semantic-model-schedule-refresh.png)
*Schedule refresh lives on the semantic model itself, not on the report.*

From there, pick a **frequency** — Daily is normal for a dashboard
someone checks each morning — and add one or more **time slots**.

![The Scheduled refresh configuration pane, showing frequency and time-slot selection.](/courses/microsoft-bi-capstone/ch03/13-scheduling-and-automation/scheduled-refresh.png)
*Every time slot added counts against the workspace's daily refresh quota.*

The one thing to get right: the Power BI refresh has to run **after**
the SSIS job has finished populating the warehouse, or the dashboard
refreshes against yesterday's — or half-loaded — data. If the SSIS job
usually finishes by 5 AM, don't schedule the Power BI refresh for
4:30.

## Key terms

| Term | Meaning |
|---|---|
| SQL Server Agent job | A scheduled unit of work in SQL Server, made of one or more steps and a schedule |
| SSIS Package job step | A job step type that runs a deployed SSIS package, sourced from the SSIS Catalog |
| Proxy account | A dedicated credential a job step runs as, scoped to exactly the access that step's task needs |
| Scheduled refresh | The Power BI Service setting, on a semantic model, that refreshes its data on a recurring schedule |

## Lab

1. Create a SQL Server Agent job with one step, type **SQL Server
   Integration Services Package**, pointed at the `WorkOrderETL`
   package deployed to SSISDB in Lesson 12. Give the job a daily
   schedule and confirm it's enabled.
2. Run the job manually once (right-click → Start Job at Step) and
   check its outcome — success or failure — before trusting the
   schedule.
3. In the Power BI Service, open the work order dashboard's semantic
   model, choose Schedule refresh, and set a daily frequency with a
   time slot scheduled comfortably after the SSIS job's usual finish
   time.

## Check yourself

You're ready for Lesson 14 when you can explain what job step type
runs a catalog-deployed SSIS package, why the step should run as a
proxy account instead of the Agent service account, and where Power
BI's scheduled refresh setting actually lives.
