# Script — Troubleshooting Failed SQL Agent Jobs

## Segment 1 (title)

Every job run writes history automatically. Before checking permissions, before checking the underlying object, before assuming anything, look at what actually happened — the message column usually contains the real T-SQL error, verbatim.

## Segment 2 (code: isolating the step)

A job with five steps failing tells you almost nothing on its own. The step_id in the history tells you exactly which one, and once you know the step, you know exactly what to test manually, outside of Agent, as the same account Agent uses to run it.

## Segment 3 (code: the Agent service account)

This is the cause that catches DBAs who assume a job's T-SQL is the problem when it isn't. A CmdExec or PowerShell step runs as the SQL Server Agent service account by default, not as your own login — if that account lacks permission to write to a share or call an endpoint, the step fails with nothing wrong in the logic at all. A dedicated proxy account, scoped to only what the step needs, is the correct fix.

## Segment 4 (steps: other frequent causes)

Schedule conflicts between two maintenance jobs, a dependent resource not ready yet when the job assumes it is, and context differences between running a query manually in SSMS versus under the job owner's actual default database and permissions.

## Segment 5 (outro)

Job history first, isolate the step, check the account it actually ran as. Next up: automating DBA maintenance — turning what you'd do by hand into a scheduled job.
