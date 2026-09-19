# Orchestrating Glue & Lambda

This lesson closes out the chapter by putting everything together: a complete, production-shaped
state machine that starts a Glue crawler, waits for it to finish, runs a Glue ETL job against
the freshly-crawled data, and finishes with a Lambda function that sends a completion
notification — with retries and a failure path, using what Lessons 35 through 37 covered.

## What you'll learn

- Chaining a Glue crawler into a Glue ETL job into a Lambda notification
- Why this belongs in Step Functions instead of one Lambda calling the next
- The full three-stage ASL definition, with `Retry` and `Catch` applied
- Reading the execution in the Step Functions console

## The three-stage pipeline

1. **StartCrawler** — runs a Glue crawler (`arn:aws:states:::aws-sdk:glue:startCrawler`) to
   discover or refresh schema for newly-landed data in S3, and waits for it to finish.
2. **RunETLJob** — runs the Glue ETL job (`glue:startJobRun.sync`) that transforms the
   crawled data, now that the Data Catalog is current.
3. **NotifyComplete** — invokes a Lambda function that posts a completion message, only once
   the ETL job has actually succeeded.

```json
{
  "Comment": "Crawl, transform, notify",
  "StartAt": "StartCrawler",
  "States": {
    "StartCrawler": {
      "Type": "Task",
      "Resource": "arn:aws:states:::aws-sdk:glue:startCrawler",
      "Parameters": { "Name": "orders-raw-crawler" },
      "Retry": [
        { "ErrorEquals": ["States.TaskFailed"], "IntervalSeconds": 20, "MaxAttempts": 2, "BackoffRate": 2.0 }
      ],
      "Next": "RunETLJob",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "NotifyFailure" }]
    },
    "RunETLJob": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",
      "Parameters": { "JobName": "orders-etl-job" },
      "Next": "NotifyComplete",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "NotifyFailure" }]
    },
    "NotifyComplete": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:notify-slack",
      "Parameters": { "message": "orders pipeline finished successfully" },
      "End": true
    },
    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:notify-slack",
      "Parameters": { "message": "orders pipeline FAILED — check CloudWatch Logs" },
      "End": true
    }
  }
}
```

Notice both `StartCrawler` and `RunETLJob` catch into the same `NotifyFailure` state — one
fallback path handles a failure at either stage, rather than duplicating notification logic.
This is a genuinely common production pattern: several stages sharing one failure handler.

## Why this belongs in Step Functions, not chained Lambdas

You could technically have `StartCrawler`'s Lambda invoke the ETL-starting Lambda, which
invokes the notification Lambda. But then retry logic, timeouts, and failure branching all
live as scattered code inside each function, invisible from the outside — and there's no
single place to see "did last night's pipeline finish, and if not, where did it stop?" The
Step Functions console shows exactly that, as a visual diagram of the actual path an
execution took, state by state, with the input and output at each hop.

## Key terms

| Term | Meaning |
|---|---|
| Service integration | A direct ASL `Resource` ARN that calls an AWS service API without a wrapper Lambda |
| Shared Catch target | Multiple states routing failures to the same fallback state |
| Execution | One run of a state machine, visible as a diagram in the Step Functions console |

## Check yourself

In the example, both `StartCrawler` and `RunETLJob` have a `Catch` pointing to
`NotifyFailure`. What's the advantage of one shared failure-notification state over giving
each stage its own separate failure Lambda?
