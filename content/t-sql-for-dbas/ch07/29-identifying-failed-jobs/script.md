# Script — Identifying Failed Jobs

## Segment 1 (title)

Knowing how to read job history only matters once you can filter it down to what actually needs attention. This lesson answers the question every DBA asks first thing in the morning: what failed overnight, and why?

## Segment 2 (code: filtering to failures)

Filtering run_status equals zero on the step_id zero summary row tells you that a job failed. It doesn't tell you where. Drop that filter and look at every step row with a failure status instead — the message column carries the actual error text Agent captured.

## Segment 3 (code: seeing the command that failed)

Step_name tells you which step failed, but not what it ran. Join in sysjobsteps and you get the actual command text for that step — job name, step, command, error message, and timestamp, all in one result set.

## Segment 4 (steps: why this beats the SSMS dialog)

That one query gives you everything you'd normally click through several SSMS screens to find: which job, which step, what command it ran, and the exact error. It's also something you can schedule, alert on, or paste straight into a ticket.

## Segment 5 (outro)

Reading history after the fact is useful, but eventually you'll need to build and schedule the jobs themselves with T-SQL. Next up: creating and managing jobs with T-SQL.
