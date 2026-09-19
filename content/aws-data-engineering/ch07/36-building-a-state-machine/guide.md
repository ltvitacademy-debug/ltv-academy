# Building a State Machine

Lesson 35 covered what Step Functions is and the ASL skeleton. Now build a real one: a state
machine with two Task states that runs a Glue job, then a Lambda function, in sequence. This
is the exact shape you'll extend with error handling in Lesson 37 and a third stage in Lesson
38.

## What you'll learn

- The state types that matter for data pipelines: Task, Choice, Parallel, Wait
- A complete, working ASL definition chaining a Glue job into a Lambda
- How `Parameters` passes data into a Task state's target service
- How execution input and output flow between states

## The state types you'll actually use

ASL defines several state types, but four cover nearly every data pipeline:

- **Task** — does work: invokes a Lambda function, starts a Glue job, starts a DMS task, or
  calls dozens of other supported AWS service integrations directly (no Lambda needed as glue
  code).
- **Choice** — branches based on a condition evaluated against the input, like an `if/else` in
  the workflow itself (e.g., route differently depending on a job's output status).
- **Parallel** — runs multiple branches of states at the same time and waits for all of them to
  finish before continuing.
- **Wait** — pauses the execution for a fixed duration or until a specific timestamp before
  moving to the next state.

## A real two-stage state machine

Here's a complete state machine that starts a Glue ETL job and, once it succeeds, invokes a
Lambda function to send a notification. Step Functions has a direct service integration for
Glue, so no wrapper Lambda is needed to kick off the job:

```json
{
  "Comment": "Run a Glue job, then notify via Lambda",
  "StartAt": "RunGlueJob",
  "States": {
    "RunGlueJob": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",
      "Parameters": {
        "JobName": "orders-etl-job"
      },
      "Next": "NotifyComplete"
    },
    "NotifyComplete": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:notify-slack",
      "Parameters": {
        "message": "orders-etl-job finished successfully"
      },
      "End": true
    }
  }
}
```

Two details matter here. First, `Resource` uses the `arn:aws:states:::glue:startJobRun.sync`
service-integration ARN rather than a plain job ARN — the `.sync` suffix tells Step Functions
to wait for the Glue job to actually finish (not just accept the start request) before moving
to `Next`. Second, `Parameters` is how you pass structured input into whatever the Task calls
— the Glue job name, or the payload a Lambda function receives as its event.

## How data flows between states

By default, each state receives the full JSON output of the previous state as its input, and
its own output becomes the input to the next state. This is what lets `NotifyComplete` know
the Glue job succeeded — if `RunGlueJob` had failed, the execution would never reach
`NotifyComplete` at all (Lesson 37 covers catching that failure instead of just stopping).

## Key terms

| Term | Meaning |
|---|---|
| Task state | A state that does work — invokes a Lambda, starts a Glue job, etc. |
| Choice state | A state that branches based on a condition |
| Parallel state | A state that runs multiple branches concurrently and waits for all to finish |
| Wait state | A state that pauses for a duration or until a timestamp |
| `.sync` integration | A service-integration ARN suffix that makes Step Functions wait for the called job to finish, not just start |

## Check yourself

In the two-stage example above, why does `RunGlueJob`'s `Resource` end in
`glue:startJobRun.sync` instead of just `glue:startJobRun`? What would change about the state
machine's behavior if you dropped the `.sync` suffix?
