# Script — Creating Jobs, Steps & Schedules

## Segment 1 (title)

SSMS's job wizard is a UI wrapped around a fixed sequence of msdb system stored procedures — sp_add_job, sp_add_jobstep, sp_add_schedule. Knowing them directly matters because it's exactly what you'd script for source control or repeat across environments.

## Segment 2 (code: the real workflow)

sp_add_job creates the container, sp_add_jobstep adds a T-SQL, PowerShell, CmdExec, or SSIS step, sp_add_schedule and sp_attach_schedule define and attach recurrence, and sp_add_jobserver targets a server — skip that last one and the job never actually runs anywhere.

## Segment 3 (steps: a step's real structure)

Every step has an independent on-success action and on-fail action — quit reporting success, quit reporting failure, go to the next step, or go to a specific step. That's what makes multi-step jobs genuinely useful: jump straight to an alert step on failure instead of continuing into a rebuild against a database that just failed CHECKDB.

## Segment 4 (outro)

A schedule is a standalone, reusable object — one "every night at 2 AM" schedule can attach to several unrelated jobs instead of redefining the same recurrence repeatedly. Next up: alerts, operators, and tying a job failure to a real notification.
