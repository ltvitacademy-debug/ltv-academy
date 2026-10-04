# Script — Monitoring Package Execution

## Segment 1 (title)

A package running is one thing. Knowing what it actually did — or is doing right now — is another. This lesson is about the tools SSMS gives you to monitor SSISDB execution.

## Segment 2 (screenshot: ssisdb-reports-context-menu.png)

Everything writes to one place: the SSISDB database. For history, right-click SSISDB under Integration Services Catalogs, go to Reports, Standard Reports, and you'll see the full set — Integration Services Dashboard, All Executions, All Validations, All Operations, All Connections, all reading from that same catalog data.

## Segment 3 (screenshot: integration-services-dashboard.png)

The Dashboard is the default landing view: Failed, Running, and Succeeded counts for the last 24 hours, which connections failed, and a table of every package that's executed recently — each row links straight into its own Overview, All Messages, or Execution Performance report.

## Segment 4 (screenshot: all-executions-report.png)

When 24 hours isn't enough, the All Executions report covers any date range you pick, with the same per-row links into Overview, All Messages, and Execution Performance for each historical run — useful for confirming exactly what happened on a specific day, not just today.

## Segment 5 (screenshot: execution-performance-report.png)

And here's the direct payoff from Lesson 44's logging level decision: open the Execution Performance report for a run, and you can see which environment resolved its parameters, plus a duration chart against past executions. But look at the Data Flow Components table at the bottom — it's empty. That per-component timing breakdown only shows up if that run's logging level was set to Performance or Verbose. Leave it at the default Basic, like this run was, and that detail was never recorded in the first place, no matter how badly you need it after the fact.

## Segment 6 (steps: logging level payoff)

Performance or Verbose logs the per-component Active Time and Total Time for every data flow. Basic — the default — simply doesn't record it. There's no getting it back after the run; the choice has to be made before the package executes.

## Segment 7 (outro)

That wraps up Chapter 8. Next, the capstone — building a real end-to-end ETL package that pulls together everything from control flow through deployment.
