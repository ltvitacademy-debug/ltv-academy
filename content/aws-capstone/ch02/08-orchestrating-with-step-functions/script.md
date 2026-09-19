# Script — Orchestrating With Step Functions

## Segment 1 (title)

Every piece exists now: ingestion, crawler, ETL job, Redshift load. But nothing runs any of it automatically yet. northfield-pipeline-orchestrator is the Step Functions state machine that turns four manual steps into one reliable, scheduled pipeline.

## Segment 2 (code: the state machine)

The state machine starts the crawler, waits briefly, runs the Glue ETL job with a sync integration so Step Functions actually waits for it to finish, then calls the Redshift Data API to run the COPY statement. Every state has a catch handler routing failures to a notification step.

## Segment 3 (code: the nightly trigger)

An EventBridge rule fires the state machine every day at 6 AM UTC — enough overnight time for the SQL Server export to land its success marker before the pipeline starts.

## Segment 4 (steps: why .sync matters)

Using startJobRun.sync instead of the plain fire-and-forget action means Step Functions actually waits for the Glue job to finish before moving on. A catch on every task state routes any failure to notify failure. And SNS fires on both success and failure, so someone always finds out what happened.

## Segment 5 (outro)

Next up: monitoring with CloudWatch, the start of Chapter Three, where we make this pipeline production-grade.
