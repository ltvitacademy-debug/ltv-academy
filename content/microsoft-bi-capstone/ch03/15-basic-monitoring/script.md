# Script — Basic Monitoring

## Segment 1 (title)

Deployed, scheduled, documented — the last question is simpler than any of that. How do you know, on an ordinary Tuesday, that the pipeline actually ran and actually worked?

## Segment 2 (screenshot: SSISDB catalog in Object Explorer)

Every run of WorkOrderETL.dtsx is logged inside SSISDB itself, whether the Agent job triggered it or you ran it by hand. Expand Integration Services Catalogs in Object Explorer and you're looking at the same catalog you deployed the project into.

## Segment 3 (steps: three catalog reports)

Three reports cover the day-to-day check. Active Operations shows what's running right now, with a Stop button if something's stuck. The Dashboard summarizes the last 24 hours. All Executions lets you pick any date range and see the exact parameter values a run used.

## Segment 4 (steps: SQL Server Agent job history)

SQL Server Agent has its own half of this. Job Activity Monitor shows which jobs ran, succeeded, or are still running right now. Right-click the WorkOrderETL job itself and choose View History for every past run, its outcome, and per-step detail.

## Segment 5 (screenshot: Power BI refresh history)

Power BI closes the loop on its own side. Open the semantic model in the Service and check its refresh history — status, duration, and the exact error message for any failed attempt, all in one grid.

## Segment 6 (outro)

That's the whole production-practices picture — deploy it, schedule it, document it, and know how to check it's healthy. Next chapter turns this finished, working capstone into a resume and a job search.
