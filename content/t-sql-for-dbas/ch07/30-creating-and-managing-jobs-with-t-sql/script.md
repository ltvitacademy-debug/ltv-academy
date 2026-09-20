# Script — Creating & Managing Jobs With T-SQL

## Segment 1 (title)

The SSMS job wizard is fine for a one-off, but it leaves no script behind for source control or disaster recovery. Every piece of an Agent job — the job, its steps, its schedule, the server it runs on — can be built with a handful of msdb stored procedures.

## Segment 2 (code: creating the shell and its step)

Sp_add_job creates the job record itself — just a name and metadata, no steps yet. Sp_add_jobstep is what actually gives it work to do: a T-SQL command, or another subsystem like PowerShell, attached as a step with a database context.

## Segment 3 (code: scheduling it)

Sp_add_schedule creates a schedule as its own independent object — daily, at 1 AM, in this example. Sp_attach_schedule then connects that schedule to the job. Because schedules are separate objects, one schedule can be attached to several jobs at once.

## Segment 4 (steps: the step everyone forgets)

A job with steps and a schedule still won't run anywhere until sp_add_jobserver targets it at a server — LOCAL for a standalone instance. Skipping this is a classic cause of "the job exists but never fires" tickets.

## Segment 5 (outro)

A job is only as good as what happens when it fails silently at 3 AM. Next up: alerts and operators — making sure someone actually finds out.
