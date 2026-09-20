# Script — Agent Architecture

## Segment 1 (title)

SQL Server Agent runs the scheduled and event-driven work a production instance depends on — backups, index maintenance, ETL, custom T-SQL — as its own separate Windows service.

## Segment 2 (code: a separate service)

Agent is independent of the Database Engine. If the Agent service stops, the Engine keeps answering queries just fine — which means Agent can silently be down while nothing else looks wrong, until a backup job that never ran gets noticed.

## Segment 3 (code: msdb as Agent's metadata store)

Everything Agent manages lives in msdb: sysjobs, sysjobsteps, sysschedules, sysoperators, sysalerts, and sysjobhistory. The SSMS Agent interface is really just reading and writing these tables.

## Segment 4 (steps: the object model)

Five pieces work together: a job made of steps, run in sequence, a reusable schedule for when it runs, and an alert tied to an operator who actually gets notified.

## Segment 5 (outro)

Next up: creating jobs and steps directly with T-SQL, using sp_add_job and sp_add_jobstep.
