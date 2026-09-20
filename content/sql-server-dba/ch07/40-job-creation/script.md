# Script — Job Creation

## Segment 1 (title)

This lesson gets hands-on with the first piece of Agent's object model — creating a job and its steps directly with T-SQL, the same system stored procedures the SSMS New Job dialog calls behind the scenes.

## Segment 2 (code: sp_add_job)

sp_add_job creates the job row in msdb.dbo.sysjobs — but at this point the job has no steps and isn't targeted at any server, so it can't run anything yet.

## Segment 3 (code: sp_add_jobstep)

sp_add_jobstep adds a step, executed by a specific subsystem — TSQL, CmdExec, PowerShell, or SSIS. On_success_action and on_fail_action control whether the job moves to the next step or quits, reporting success or failure.

## Segment 4 (steps: assembling a job)

Three calls assemble a runnable job: sp_add_job creates it, sp_add_jobstep adds each action in order, and sp_add_jobserver targets it at a server so it can actually execute.

## Segment 5 (outro)

Next up: attaching recurring schedules to a job with sp_add_schedule.
