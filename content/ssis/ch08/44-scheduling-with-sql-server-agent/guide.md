# Lesson 44 — Scheduling With SQL Server Agent

**Chapter 8 · Deployment & Administration · Lesson 44 of 49**

## What you'll learn

- Why deploying a project to the SSIS Catalog is only half the job —
  something still has to actually run it, on a schedule, unattended
- The exact steps to create a SQL Server Agent job step that runs a
  deployed package
- How that job step resolves parameters through an environment
  reference (tying together Lesson 30 and Lesson 43)
- Where to look when a package runs fine in SSDT but fails from a job

## Deployed isn't the same as scheduled

Everything through Chapter 8 so far gets a package built, deployed to
the SSIS Catalog, and configured with environments and parameters. None
of that makes it run on its own. **SQL Server Agent** — the Windows
service installed alongside SQL Server that runs scheduled jobs — is
what actually triggers execution on a recurring schedule, with no one
sitting at a keyboard.

## Creating the job step

In SQL Server Management Studio, under the **SQL Server Agent** node in
Object Explorer:

1. Right-click **Jobs → New Job**, give it a name, and select **Enabled**.
2. On the **Steps** page, add a **New** step and set its **Type** to
   **SQL Server Integration Services Package**.
3. Set **Run as** to either the SQL Server Agent Service Account, or (the
   more common, more secure real-world choice) a **proxy account** with
   its own credentials — this avoids a whole class of permission
   failures that show up specifically when a package runs fine
   interactively but fails from the job.
4. Set **Package Source** to **SSIS Catalog** (matching this whole
   course's Project Deployment Model), then browse to the deployed
   package under Integration Services Catalogs in Object Explorer.

## Where parameters and environments plug in

This is where Lesson 30 and Lesson 43 connect directly to scheduling:
on the job step's **Configuration** tab, the **Parameters** and
**Connection Managers** sub-tabs let you set each value either as a
literal, or — the pattern this course uses — by selecting **Environment**
and pointing at the SSISDB environment (e.g. `PROD`) whose environment
variables should resolve those values for this specific job's runs.

## Scheduling and logging level

Once the step is configured, the **Schedules** page attaches a recurring
schedule (daily, weekly, or a custom recurrence) to the job — this is
what makes it actually unattended. On the step's **Configuration** tab,
you also pick a **logging level** (`None`, `Basic`, `Performance`, or
`Verbose`) that controls how much detail the SSISDB catalog records for
each run — Lesson 45 uses exactly this logged data.

## When a job step fails but SSDT runs fine

This is one of the single most common real-world SSIS problems: a
package runs perfectly when you execute it inside SSDT, then fails the
instant SQL Server Agent tries to run it. The most frequent root cause
is **permissions** — SSDT runs as you, with your Windows credentials and
your mapped drives; SQL Server Agent's job step runs as whatever account
you set on **Run as**, which may not have access to the same file paths,
network shares, or database permissions. A dedicated **proxy account**
with exactly the access the package actually needs is the standard fix.

## Key terms

| Term | Meaning |
|---|---|
| SQL Server Agent | The Windows service that runs scheduled SQL Server jobs |
| Job step type: SQL Server Integration Services Package | The job step type that runs an SSIS package as part of a job |
| Run as / Proxy account | The identity a job step executes under — often a dedicated proxy, not the Agent service account |
| Package Source: SSIS Catalog | The job step setting pointing at a package deployed to SSISDB, matching the Project Deployment Model |
| Logging level | The Basic/Performance/Verbose/None setting controlling how much execution detail SSISDB records |

## Lab

1. Create a new SQL Server Agent job with one step, type **SQL Server
   Integration Services Package**, pointing at a package you deployed
   earlier in this chapter.
2. On the Configuration tab's Parameters sub-tab, map at least one
   parameter to an environment variable from the `DEV` environment you
   created in Lesson 30's lab.
3. Run the job step manually (right-click the job → **Start Job at
   Step**) and confirm it succeeds — then check the job's history to see
   what got logged.

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: what
job step type runs an SSIS package, and what's the single most common
reason a package that runs fine in SSDT fails when SQL Server Agent
tries to run it?
