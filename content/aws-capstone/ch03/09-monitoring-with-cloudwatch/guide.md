# Monitoring With CloudWatch

The pipeline runs nightly and notifies on success or failure — but that notification only fires
if `northfield-pipeline-orchestrator` itself gets far enough to reach a `Notify` state. If the
Glue ETL job hangs, or the state machine itself never starts, nobody finds out. CloudWatch alarms
close that gap: they watch the pipeline from the outside, independent of whether the pipeline can
notify about itself.

## What you'll learn

- Two real alarms: Glue job failure, and Step Functions execution failure
- The CloudWatch dashboard tying the whole pipeline's health into one view
- Why alarms are a second, independent layer on top of the SNS notify states

## Alarm 1: Glue ETL job failure

```
Alarm name:   northfield-glue-etl-failure
Metric:       glue.driver.aggregate.numFailedTasks
Namespace:    Glue
Dimensions:   JobName=northfield-orders-etl
Statistic:    Sum
Period:       300 seconds
Threshold:    >= 1
Action:       Publish to northfield-pipeline-notifications (SNS)
```

This alarm watches the Glue job's own CloudWatch metrics directly — it doesn't depend on Step
Functions reaching a `Catch` state at all. Even if the state machine itself got stuck (a
misconfigured IAM permission, say) before it could route to `NotifyFailure`, this alarm still
fires because it's reading the Glue job's metrics independently.

## Alarm 2: Step Functions execution failure

```
Alarm name:   northfield-stepfunctions-failure-alarm
Metric:       ExecutionsFailed
Namespace:    AWS/States
Dimensions:   StateMachineArn=arn:aws:states:us-east-1:111122223333:
              stateMachine:northfield-pipeline-orchestrator
Statistic:    Sum
Period:       300 seconds
Threshold:    >= 1
Action:       Publish to northfield-pipeline-notifications (SNS)
```

`ExecutionsFailed` counts executions that ended in a `Failed`, `TimedOut`, or `Aborted` status —
this catches infrastructure-level failures (the state machine itself erroring) that might happen
before any of its own internal `Catch` logic gets a chance to run.

## The dashboard

```
Dashboard name: northfield-pipeline-dashboard

Widgets:
  - Glue job duration & DPU-hours (northfield-orders-etl)
  - Glue job success/failure count, last 30 runs
  - Step Functions execution status, last 30 runs
  - Step Functions execution duration (p50 / p99)
  - Redshift Serverless RPU-seconds consumed (northfield-analytics)
  - Athena bytes scanned, last 7 days (northfield-analysts workgroup)
```

One dashboard, one screen, covers every service in the chain. This is also the screen worth
having open in an interview demo (Lesson 14) — it makes the whole pipeline's health legible at a
glance instead of clicking through six separate service consoles.

## Why two independent alarms, not one

The Glue alarm and the Step Functions alarm watch different failure surfaces on purpose. A Glue
job can fail without the state machine's execution status showing `Failed` yet (mid-retry, for
example), and a state machine can fail for reasons that have nothing to do with Glue (an IAM
permission error calling the Redshift Data API). Two alarms mean a failure anywhere in the chain
is caught by at least one of them, even if the pipeline's own internal notification logic never
runs.

## Key terms

| Term | Meaning |
|---|---|
| CloudWatch alarm | A rule that watches a metric and takes an action when a threshold is breached |
| ExecutionsFailed | A Step Functions metric counting failed/timed-out/aborted executions |
| CloudWatch dashboard | A customizable, single-screen view of chosen metrics across services |
| Independent monitoring | Alarms that watch metrics directly, not dependent on the pipeline's own logic |

## Check yourself

Why does this lesson set up CloudWatch alarms in addition to the SNS `NotifyFailure` state
already built into the Step Functions state machine, instead of relying on that alone?
