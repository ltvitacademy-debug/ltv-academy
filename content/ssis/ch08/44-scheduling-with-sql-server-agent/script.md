# Script — Scheduling With SQL Server Agent

## Segment 1 (title)

Deploying a project to the SSIS Catalog is only half the job. This lesson is about the piece that actually makes it run, unattended, on a schedule: SQL Server Agent.

## Segment 2 (screenshot: new-job-menu.png)

It starts under the SQL Server Agent node in Object Explorer: right-click Jobs, choose New Job, give it a name, and make sure Enabled is checked. That's the shell — nothing runs yet until a step is added.

## Segment 3 (screenshot: job-step-package-tab.png)

On the Steps page, add a new step and set its Type to SQL Server Integration Services Package — that's the one setting that turns a generic job step into one that runs a deployed SSIS package. Set Package Source to SSIS Catalog, matching this whole course's deployment model, then browse to the package you deployed back in Lesson 42.

## Segment 4 (screenshot: job-step-configuration-environment.png)

Flip to the step's Configuration tab, and this is where Lesson 43 plugs straight in: check Environment, and pick the SSISDB environment — Dev, Production, whichever one this job's runs should pull their parameter values from. Every parameter or connection manager value mapped to Use environment variable now resolves through that one environment, every time this job runs.

## Segment 5 (screenshot: new-job-schedules-page.png)

Back on the New Job dialog's own page list, the Schedules page is what actually makes this unattended. Click New, set a recurrence — daily, weekly, whatever the real-world cadence is — and from here the job runs itself, with nobody watching a clock.

## Segment 6 (steps: parameters and failure)

And here's the classic real-world gotcha — a package that runs perfectly in SSDT and then fails the moment SQL Server Agent tries to run it. Almost always, that's permissions: SSDT ran as you, the job step runs as whatever account you configured, and a dedicated proxy account with the right access is the standard fix.

## Segment 7 (outro)

Next lesson, we look at what happens after a package runs — monitoring package execution, and reading exactly what the logging level you set here actually recorded.
