# Error Handling in Step Functions

The two-stage state machine from Lesson 36 has a problem: if the Glue job fails — a bad
schema change, a transient throttling error, a timeout — the execution just stops, marked as
failed, with no retry and no cleanup step. ASL gives every Task, Parallel, and Map state two
fields built for exactly this: `Retry` and `Catch`. This is the difference between a fragile
demo pipeline and one that survives production.

## What you'll learn

- The `Retry` field: automatic retries with exponential backoff
- The `Catch` field: routing failures to a fallback state instead of stopping
- How `ErrorEquals` matches specific error types
- A realistic pattern: retry transient errors, then catch anything that still fails

## Retry: automatic retries with backoff

`Retry` lets a state retry itself automatically when it fails, instead of the whole execution
dying immediately:

```json
{
  "RunGlueJob": {
    "Type": "Task",
    "Resource": "arn:aws:states:::glue:startJobRun.sync",
    "Parameters": { "JobName": "orders-etl-job" },
    "Retry": [
      {
        "ErrorEquals": ["States.TaskFailed"],
        "IntervalSeconds": 30,
        "MaxAttempts": 3,
        "BackoffRate": 2.0
      }
    ],
    "Next": "NotifyComplete",
    "Catch": [
      {
        "ErrorEquals": ["States.ALL"],
        "Next": "NotifyFailure"
      }
    ]
  }
}
```

`ErrorEquals` lists which error types this retry rule applies to — `States.TaskFailed` here
matches a general task failure. `IntervalSeconds` is the wait before the first retry;
`BackoffRate` multiplies that interval on each subsequent attempt (30s, then 60s, then 120s
with a rate of 2.0); `MaxAttempts` caps how many times it retries before giving up. This
matters most for transient failures — a throttled API call, a momentary service blip — that
often succeed on a second or third try without any human intervention.

## Catch: routing to a fallback instead of stopping

`Catch` is what runs when a state fails and retries (if any) are exhausted. Instead of the
execution simply dying, `Catch` routes to a different state — commonly one that logs the
failure, sends an alert, or runs cleanup logic. `ErrorEquals: ["States.ALL"]` is a catch-all
that matches any error type; you can also list specific errors to handle different failure
modes differently (route a validation error one way, a timeout another).

## Retry then Catch: the realistic pattern

Production state machines almost always combine both: `Retry` absorbs the transient failures
that resolve themselves, and `Catch` is the safety net for anything that still fails after
retries are exhausted — so a human or a downstream alert finds out, instead of the pipeline
just silently stopping at 2 a.m. with no notification.

## Key terms

| Term | Meaning |
|---|---|
| Retry | ASL field that automatically retries a failed state according to defined rules |
| Catch | ASL field that routes a failed state to a fallback state instead of stopping the execution |
| ErrorEquals | List of error types a Retry or Catch rule applies to |
| BackoffRate | Multiplier applied to the retry interval after each attempt (exponential backoff) |
| States.ALL | A catch-all error matcher for any error type |

## Check yourself

A `Retry` block has `IntervalSeconds: 10`, `BackoffRate: 3.0`, and `MaxAttempts: 3`. If the
state fails every time, how long is the wait before each of the three retry attempts?
