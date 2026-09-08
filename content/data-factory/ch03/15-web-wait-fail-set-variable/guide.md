# Lesson 15 — Web, Wait, Fail & Set Variable Activities

**Chapter 3 · Pipelines & Activities · Lesson 5 of 6**

## What you'll learn

- How the Web activity calls an external REST endpoint from a pipeline
- What Wait, Fail, and Set Variable each do, in one sentence each
- Why Fail is a deliberate design choice, not an error
- Where Set Variable previews a pattern Chapter 4 covers in full

## Web: reaching outside Data Factory entirely

The **Web activity** calls a custom REST endpoint from inside a
pipeline — GET, POST, PUT, PATCH, or DELETE — and can pass datasets
and linked services along as part of the request:

![Screenshot of the Web activity's Settings tab, showing URL, method, headers, and body configuration fields.](/courses/data-factory/ch03/15-web-wait-fail-set-variable/web-activity.png)

Real uses: triggering an external system once a load finishes,
posting a status update to a Teams or Slack webhook, or calling an
API that itself starts some other process. The endpoint must return
JSON, and the activity times out after 1 minute by default (raisable
to 10) unless the endpoint follows the asynchronous request-reply
pattern, in which case it can wait up to 7 days.

Authentication options include **Basic**, **Client Certificate**,
**Service Principal**, and **Managed Identity** — the same identity
options Lesson 7 already covered for Blob Storage, reused here for
calling out to an API instead of a storage account.

## Wait: pausing on purpose

The **Wait activity** does exactly one thing: pauses the pipeline for
a specified number of seconds before continuing to the next activity.
It's genuinely simple, but has real uses — waiting out an external
system's known processing delay, or spacing out retries deliberately
rather than hammering a flaky endpoint immediately.

## Fail: failing on purpose

The **Fail activity** deliberately fails the pipeline, with a custom
error message and error code you define:

```
{
  "name": "MyFailActivity",
  "type": "Fail",
  "typeProperties": {
    "errorCode": "500",
    "message": "Row count validation failed — see upstream Lookup output"
  }
}
```

This sounds backwards until you see it used: pair a **Fail** activity
with an **If Condition** (Chapter 4) that checks something *should*
be true before continuing — a row count above zero, a file that
actually exists — and branch to Fail with a clear, custom message when
it isn't. Without this, a pipeline that "succeeds" despite bad
upstream data is far harder to catch than one that fails loudly, with
an explanation, exactly where the problem actually was.

## Set Variable: a preview of Chapter 4

The **Set Variable activity** sets the value of a pipeline variable
that's already been defined at the pipeline level. It's one of the
simplest control activities that exists, and Chapter 4 covers pipeline
variables — and the full contrast between variables and parameters —
in real depth. For now, know it exists as the activity that actually
*writes* a variable's value, generally so a later activity can read
it back.

## How these four fit together

None of these four activities move or transform data on their own —
they're the small, deliberate pieces that make a pipeline's control
flow actually correct: reach outside the pipeline (Web), pause on
purpose (Wait), stop loudly when something's wrong (Fail), and track
state as the pipeline runs (Set Variable).

## Key terms

| Term | Meaning |
|---|---|
| Web activity | Calls a custom REST endpoint from a pipeline |
| Wait activity | Pauses the pipeline for a specified number of seconds |
| Fail activity | Deliberately fails the pipeline with a custom message and error code |
| Set Variable activity | Sets the value of an already-defined pipeline variable |

## Lab

1. Add a Wait activity to any pipeline and set it to pause for 10
   seconds — run it in Debug and confirm the delay actually happens.
2. Add a Fail activity to a separate test pipeline with a custom
   message and error code, run it, and read the resulting error in
   the run output.
3. Write one sentence explaining why deliberately failing a pipeline
   with a clear message is more useful than letting it silently
   "succeed" on bad data.

## Check yourself

You're ready for Lesson 16 when you can explain, in your own words,
why a Fail activity is a deliberate design choice rather than
something that only happens by accident.
