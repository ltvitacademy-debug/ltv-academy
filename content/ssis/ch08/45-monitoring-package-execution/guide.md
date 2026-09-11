# Lesson 45 — Monitoring Package Execution

**Chapter 8 · Deployment & Administration · Lesson 45 of 49**

## What you'll learn

- Where every execution's history actually lives once a package runs
  through the SSISDB catalog
- The **Active Operations** dialog for what's running right now
- The **Integration Services Dashboard** and its standard reports for
  what already ran
- How the logging level you set in Lesson 44 changes what these reports
  can actually show you

## Everything gets logged to one place

Every deployment, validation, and package execution against the SSIS
Catalog writes its history into the **SSISDB** database — not into
scattered log files you have to go hunting for. That single source of
truth is what makes the tools in this lesson possible: SSMS just reads
and presents data that's already sitting in SSISDB's internal tables
(exposed through public catalog views, if you ever need to query them
directly instead).

## Watching what's running right now

Right-click **SSISDB** under **Integration Services Catalogs** in Object
Explorer and choose **Active Operations** to see every currently-running
operation on the server — deployments, validations, and package
executions alike — with a **Stop** button if you need to kill one. This
is your "what's happening on this server at this exact moment" view.

## Reviewing what already ran

For history, SSMS ships a set of **standard reports**, opened the same
way: right-click **SSISDB → Reports → Standard Reports**.

- **Integration Services Dashboard** — the default landing view: how
  many executions failed, succeeded, or are still running in the last 24
  hours, plus which connections failed. From here you can drill into any
  package's **Overview** (task-by-task status), **All Messages** (every
  event and error message), or **Execution Performance** report.
- **All Executions** — every execution across a date range you choose
  (not locked to the last 24 hours like the Dashboard), including the
  exact parameter values used for each run — useful for confirming which
  environment's values actually applied to a specific historical run.
- **All Connections** — every connection that has *failed* across
  executions, with the connection string and how many times it failed.
- **All Operations** / **All Validations** — the broader picture beyond
  just package execution: deployments, restores, and project validations.

## Why the logging level from Lesson 44 matters here

The **Execution Performance** report's Active Time / Total Time
breakdown per data flow component — genuinely useful for finding your
slowest transformation — only appears **if the logging level was set to
Performance or Verbose** for that run. Choose `Basic` (the default) and
that detail simply isn't there to look at later, no matter how badly you
need it after the fact. This is the direct payoff of Lesson 44's
logging-level decision: choose it with monitoring in mind, not just at
random.

## Key terms

| Term | Meaning |
|---|---|
| SSISDB | The catalog database storing every deployment, validation, and execution's history |
| Active Operations | The SSMS dialog showing (and letting you stop) currently-running operations |
| Integration Services Dashboard | The default standard report — last-24-hours execution overview with drill-down links |
| All Executions report | A configurable date-range report of every execution, including the parameter values used |
| Execution Performance report | Per-component Active Time/Total Time detail — only populated when logging level was Performance or Verbose |

## Lab

1. Right-click **SSISDB → Active Operations** while a package is
   running (or immediately after kicking one off from Lesson 44's job)
   to see it listed.
2. Open **SSISDB → Reports → Standard Reports → Integration Services
   Dashboard** and drill into your most recent execution's **Overview**,
   then **All Messages**.
3. Re-run the same package with the job step's logging level set to
   `Verbose`, then open its **Execution Performance** report and confirm
   the per-component Active Time/Total Time detail now actually appears.

## Check yourself

You're ready for Chapter 9's capstone when you can explain, without
looking: where does every execution's history actually get stored, and
why might the Execution Performance report show no per-component detail
at all for a given run?
