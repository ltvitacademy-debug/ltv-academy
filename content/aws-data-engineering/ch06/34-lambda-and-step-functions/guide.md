# Lambda + Step Functions

Lesson 33 drew Lambda's ceiling: it's built for small, fast, event-driven work, not one
function trying to do everything. But real pipelines are rarely a single step — validate,
then transform, then load, then notify, each with its own chance to fail. **Step Functions** is
AWS's answer to orchestrating a sequence like that across multiple Lambda invocations, instead
of cramming it all into one monolithic function.

## What you'll learn

- The problem with one Lambda function doing everything
- What a Step Functions state machine actually is
- Built-in retry and error handling per step
- Why this beats a single giant function, concretely

## The problem with one giant function

Imagine a single Lambda function that validates an uploaded file, transforms it, loads it into
Redshift, and sends a notification — all in one handler. If the load step fails after
validation and transformation already succeeded, there's no clean way to retry *just* the
failed step; you either retry the whole function from scratch (redoing work that already
succeeded) or write custom checkpointing logic by hand. As steps get added, the function grows
harder to reason about, harder to test in isolation, and more likely to bump against the
15-minute timeout from Lesson 33.

## State machines and the Amazon States Language

**Step Functions** lets you define a **state machine**: a sequence of **states**, each one
typically invoking a separate Lambda function, described in JSON using the **Amazon States
Language (ASL)**:

```
{
  "StartAt": "ValidateFile",
  "States": {
    "ValidateFile": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:validate-file",
      "Next": "TransformData"
    },
    "TransformData": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:transform-data",
      "Next": "LoadToRedshift"
    },
    "LoadToRedshift": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:load-redshift",
      "End": true
    }
  }
}
```

Each state is its own Lambda function, doing one job, with Step Functions coordinating what
runs next.

## Retry and catch, per state

Each state can define its own **Retry** rules (retry this specific step up to N times, with a
backoff, on specific error types) and **Catch** rules (route to a different state — e.g. a
"SendFailureAlert" state — if this step ultimately fails). If `LoadToRedshift` fails, Step
Functions retries *just that state*, not the entire pipeline from the beginning — the
validation and transform work already done isn't repeated.

## Why this beats one giant function

Beyond retry granularity: each Lambda function stays small, focused, and independently
testable. Step Functions gives you a visual execution history showing exactly which state
failed and why, instead of digging through one function's combined logs. And a state machine
can include **parallel** states (running independent steps concurrently) and **choice** states
(branching based on data), letting the orchestration logic live in the state machine's
definition instead of as nested if/else code inside a single sprawling handler.

## Key terms

| Term | Meaning |
|---|---|
| Step Functions | AWS orchestration service for coordinating multiple steps (often Lambda functions) |
| State machine | The defined sequence/graph of states a Step Functions execution runs through |
| Amazon States Language (ASL) | The JSON language used to define a state machine |
| Retry / Catch | Per-state rules for retrying a failed step or routing to a failure-handling state |

## Check yourself

A three-step pipeline — validate, transform, load — is built as one Lambda function today, and
the load step keeps failing intermittently. If it were rebuilt as a Step Functions state
machine instead, what would change about how a failure in the load step is handled?
