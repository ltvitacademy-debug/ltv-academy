# Step Functions Fundamentals

Every pipeline so far in this course has been a single service doing a single job: a Glue
crawler inferring schema, a Lambda reacting to an S3 event, a Redshift `COPY` loading a
table. Real pipelines are rarely one step — they're a sequence: crawl, then transform, then
load, then notify, with retries and failure handling at every hop. AWS Step Functions is the
service that turns that sequence into a single, observable, declarative workflow instead of
a pile of Lambda functions calling each other.

## What you'll learn

- What Step Functions is and the problem it solves
- Amazon States Language (ASL) — the JSON format state machines are written in
- Standard vs. Express workflows, and when to reach for each
- Why orchestration belongs in Step Functions, not in application code

## What Step Functions actually is

Step Functions is a **serverless orchestration service**. You define a **state machine** — a
sequence of **states** — in JSON using **Amazon States Language (ASL)**. Each state does one
thing: run a Lambda function, start a Glue job, wait, branch on a condition, or run steps in
parallel. Step Functions executes the state machine, tracks exactly which state is running,
retries states that fail according to rules you define, and gives you a visual diagram in the
console showing the live (or historical) path an execution took through the workflow.

The core value isn't running the steps — Lambda could technically call another Lambda. It's
that Step Functions makes the *orchestration logic itself* visible and declarative: retries,
timeouts, branching, and error handling live in the state machine definition, not buried in
`try/catch` blocks scattered across functions.

```json
{
  "Comment": "Skeleton of a two-state machine",
  "StartAt": "FirstStep",
  "States": {
    "FirstStep": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:my-function",
      "Next": "SecondStep"
    },
    "SecondStep": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:another-function",
      "End": true
    }
  }
}
```

`StartAt` names the first state. Every state either points to the next state with `Next` or
terminates the machine with `End: true`. Lesson 36 builds a complete, working example.

## Standard vs. Express workflows

Step Functions offers two workflow types, and picking the right one matters for both cost
and correctness:

- **Standard workflows** run up to one year, use **exactly-once** execution semantics, keep a
  full execution history you can inspect in the console after the fact, and are priced per
  state transition. This is the default choice for most data pipeline orchestration — Glue
  jobs and DMS tasks can run for minutes to hours, and you want a durable, auditable record of
  what ran.
- **Express workflows** run for at most five minutes, use **at-least-once** semantics (a state
  could theoretically execute more than once), don't keep the same detailed execution history,
  and are priced by number of executions and duration rather than per transition. They're built
  for high-volume, short-duration work — processing a stream of individual events at large
  scale — where Standard's per-transition pricing and execution-history overhead would be
  wasteful.

For orchestrating Glue jobs, DMS tasks, and multi-step ETL pipelines — this chapter's focus —
Standard workflows are almost always the right choice.

## Key terms

| Term | Meaning |
|---|---|
| State machine | A workflow defined in ASL as a set of states and the transitions between them |
| ASL (Amazon States Language) | The JSON-based language used to define Step Functions state machines |
| State | A single step in a state machine (Task, Choice, Parallel, Wait, etc.) |
| Standard workflow | Long-running (up to 1 year), exactly-once, full execution history, per-transition pricing |
| Express workflow | Short-running (up to 5 min), at-least-once, priced by execution count/duration |

## Check yourself

You're orchestrating a nightly pipeline: a Glue crawler, then a Glue ETL job, then a Lambda
that sends a completion notification. The whole thing typically takes 20 minutes but you want
a durable record you can inspect the next morning if something fails. Standard or Express —
and why?
