# Script — Scheduling With SQL Server Agent

## Segment 1 (title)

Deploying a project to the SSIS Catalog is only half the job. This lesson is about the piece that actually makes it run, unattended, on a schedule: SQL Server Agent.

## Segment 2 (steps: creating the job step)

Under the SQL Server Agent node in SSMS, you create a new job, add a step, and set its type to SQL Server Integration Services Package. You pick a Run as identity — often a dedicated proxy account rather than the Agent service account itself — and set Package Source to SSIS Catalog, matching this whole course's deployment model, then browse to the package you deployed.

## Segment 3 (steps: parameters and failure)

This is where earlier lessons plug straight in: on the Configuration tab, you can map each parameter to a specific SSISDB environment, so the same deployed package resolves different values depending on which environment the job points at. And here's the classic real-world gotcha — a package that runs perfectly in SSDT and then fails the moment SQL Server Agent tries to run it. Almost always, that's permissions: SSDT ran as you, the job step runs as whatever account you configured, and a proxy account with the right access is the standard fix.

## Segment 4 (outro)

Next lesson, we look at what happens after a package runs — monitoring package execution, and reading exactly what the logging level you set here actually recorded.
