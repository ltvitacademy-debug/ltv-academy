# Orchestrating With Step Functions

Every piece exists now: ingestion, crawler, ETL job, Redshift load, Athena queries. But nothing
runs any of it automatically yet, and nothing decides what happens if a step fails partway
through. `northfield-pipeline-orchestrator` — a Step Functions state machine — is the piece that
turns four manual steps into one reliable, scheduled pipeline.

## What you'll learn

- The state machine that chains crawler → ETL job → Redshift load → notification
- Real Amazon States Language (ASL), not pseudocode
- How EventBridge triggers it nightly, and how failures get caught

## The state machine, in ASL

```json
{
  "Comment": "northfield-pipeline-orchestrator",
  "StartAt": "CrawlRawZone",
  "States": {
    "CrawlRawZone": {
      "Type": "Task",
      "Resource": "arn:aws:states:::aws-sdk:glue:startCrawler",
      "Parameters": { "Name": "northfield-raw-crawler" },
      "Next": "WaitForCrawler",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "NotifyFailure" }]
    },
    "WaitForCrawler": {
      "Type": "Wait",
      "Seconds": 60,
      "Next": "RunETLJob"
    },
    "RunETLJob": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",
      "Parameters": { "JobName": "northfield-orders-etl" },
      "Next": "LoadRedshift",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "NotifyFailure" }]
    },
    "LoadRedshift": {
      "Type": "Task",
      "Resource": "arn:aws:states:::aws-sdk:redshiftdata:executeStatement",
      "Parameters": {
        "WorkgroupName": "northfield-analytics",
        "Database": "northfielddw",
        "Sql": "COPY analytics.fact_orders FROM 's3://northfield-curated-zone/orders/' IAM_ROLE 'arn:aws:iam::111122223333:role/northfield-redshift-copy-role' FORMAT AS PARQUET;"
      },
      "Next": "NotifySuccess",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "NotifyFailure" }]
    },
    "NotifySuccess": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:111122223333:northfield-pipeline-notifications",
        "Message": "Northfield pipeline completed successfully."
      },
      "End": true
    },
    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:111122223333:northfield-pipeline-notifications",
        "Message": "Northfield pipeline failed — check CloudWatch Logs."
      },
      "End": true
    }
  }
}
```

## What each state actually does

Four real states carry the pipeline: `CrawlRawZone` starts the Glue crawler and moves on
(crawlers don't have a native `.sync` integration, so a short `WaitForCrawler` state gives it
time before the ETL job assumes fresh partitions exist). `RunETLJob` uses `glue:startJobRun.sync`
— the `.sync` suffix means Step Functions actually waits for the Glue job to finish, not just
fire it and move on. `LoadRedshift` calls the Redshift Data API to run the same `COPY` statement
from Lesson 6. Every task state has a `Catch` that routes any error straight to `NotifyFailure`,
so a failure anywhere in the chain still ends with a human getting told.

## The nightly trigger

```
EventBridge rule: northfield-nightly-trigger
Schedule:          cron(0 6 * * ? *)     # 6:00 AM UTC daily
Target:            northfield-pipeline-orchestrator
```

6 AM UTC gives the SQL Server export (Lesson 3) overnight to finish and land its `_SUCCESS`
marker well before the state machine starts. If the marker isn't there yet, `CrawlRawZone` still
runs — the crawler simply finds no new partition, and the ETL job's bookmark means it reprocesses
nothing new, so a slightly-late export just produces an uneventful run rather than a broken one.

## Key terms

| Term | Meaning |
|---|---|
| Amazon States Language (ASL) | The JSON-based language defining a Step Functions state machine |
| .sync integration | A service integration where Step Functions waits for the job to complete |
| Catch | A state machine's declared error handler, routing failures to a specific next state |
| EventBridge rule | The scheduled trigger that starts a state machine execution |

## Check yourself

Why does `RunETLJob` use `glue:startJobRun.sync` instead of the plain `glue:startJobRun` action?
