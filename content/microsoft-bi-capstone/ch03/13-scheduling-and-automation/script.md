# Script — Scheduling & Automation

## Segment 1 (title)

A deployed package that only runs when you remember to click it isn't automated. This lesson is about making the pipeline run on its own — the SSIS side with SQL Server Agent, the Power BI side with scheduled refresh.

## Segment 2 (steps: SQL Server Agent job step)

Create a new SQL Server Agent job, add a step, and set its type to SQL Server Integration Services Package. Point the package source at the SSIS Catalog and select WorkOrderETL, deployed to SSISDB in the last lesson. Run the step as a proxy account with exactly the access the package needs — not the Agent service account itself.

## Segment 3 (code: dtexec / catalog stored procedures)

Underneath that job step is one of two calls: dtexec running against the ISServer, pointed at the package's catalog path, or a direct call to the catalog's own start_execution stored procedure. Either way, it's the same package you tested by hand, just triggered by the Agent instead of by you.

## Segment 4 (screenshot: Power BI schedule refresh menu)

On the Power BI side, open the work order dashboard's semantic model in the Service and choose Schedule refresh from the Refresh menu. This is a separate schedule from the SSIS job — the warehouse has to be refreshed first, then Power BI's refresh has to run after it.

## Segment 5 (screenshot: frequency and time slots)

Pick a frequency and add time slots. Daily is plenty for a manufacturing dashboard someone checks each morning — just make sure the slot you pick is comfortably after the SSIS job's usual finish time.

## Segment 6 (outro)

The pipeline now runs itself. Next lesson is about making sure the next person who touches it doesn't have to reverse-engineer any of what you just built.
