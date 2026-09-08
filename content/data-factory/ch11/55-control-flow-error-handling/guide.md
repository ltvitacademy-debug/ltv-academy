# Lesson 55 — Add Control Flow & Error Handling

**Chapter 11 · Capstone Project · Lesson 3 of 6**

## What you'll learn

- What actually breaks in Lesson 54's pipeline, and why
- Wrapping the Copy activity in a real Try-Catch-Proceed pattern
- Retrying transient failures automatically before anyone's paged
- Alerting the right person when retries genuinely aren't enough

## What Lesson 54 left unfinished

Run Lesson 54's pipeline enough nights in a row, and eventually
something breaks: the on-premises SQL Server is mid-restart during a
patch window, or a brief network blip drops the self-hosted IR's
connection for thirty seconds. Right now, that pipeline run simply
**fails** — no retry, no notification, no record of what actually
happened beyond a red status in the Monitor hub the next morning.
That's not acceptable for something running unattended at 3 AM.

## Layer one: a retry policy on the Copy activity

The cheapest fix goes directly on the activity itself, from Chapter
8's policy block:

```
"policy": {
  "timeout": "00:15:00",
  "retry": 3,
  "retryIntervalInSeconds": 60,
  "secureOutput": false
}
```

A brief network blip or a server finishing its restart thirty seconds
late now gets silently absorbed — three retries, a minute apart,
before the activity is even considered failed. Most of Northwind's
real 3 AM problems are exactly this transient, and this one policy
block handles them with zero human involvement.

## Layer two: Try-Catch-Proceed for genuine failures

Retries handle *transient* failures. For a real, sustained failure —
the SQL Server is actually down for the night — the pipeline needs
Chapter 8's error-handling pattern:

```
CopySalesToRawZone
  |-- Upon Failure --> LogFailureToTable
  |-- Upon Skip -----> (from LogFailureToTable's success)
        v
  NotifyOnCallViaEmail
```

`LogFailureToTable` runs a stored procedure recording the failure —
timestamp, error message, which table — into a monitoring table
Northwind's team can query later. Because this is Try-Catch, not
Do-If-Else, a *handled* failure still lets the pipeline complete
without erroring the whole run, while still leaving a genuine audit
trail of what happened and when.

## Layer three: an alert for what retries can't fix

Some failures are too serious to just log and move past — Northwind
losing an entire night's sales data is exactly one of them. Chapter
8's alert pattern closes that gap:

- **Metric**: Failed activity runs metrics.
- **Dimension filter**: scoped to `CopySalesToRawZone` specifically,
  not every activity in every pipeline Northwind runs.
- **Action group**: emails the on-call data engineer immediately.

This is the layer that actually wakes someone up — deliberately the
last resort, only firing after retries and logging have both already
had their chance.

## Why three layers, not one

| Layer | Catches | Human involved? |
|---|---|---|
| Retry policy | Brief, transient blips | No |
| Try-Catch-Proceed | Sustained but survivable failures | No, but leaves a record |
| Alert | Failures serious enough to need attention now | Yes, deliberately |

Each layer only escalates to the next when the one before it
genuinely couldn't handle the problem — exactly the design principle
behind not paging a human for something that fixes itself thirty
seconds later.

## Key terms

| Term | Meaning |
|---|---|
| Transient failure | A brief, self-resolving error — network blip, momentary unavailability |
| Sustained failure | A real, ongoing failure that retries won't fix |
| Escalation layer | A tier of error handling that only engages when the previous tier fails |

## Lab

1. Add a retry policy to your own Copy activity with `retry: 3` and a
   60-second interval.
2. Sketch the Try-Catch-Proceed branch you'd add for a failure that
   survives all three retries.
3. Write the alert scoping you'd use so only `CopySalesToRawZone`
   failures — not every pipeline in the factory — trigger a
   notification.

## Check yourself

You're ready for Lesson 56 when you can explain, in one sentence, why
a retry policy alone isn't sufficient error handling for a pipeline
running unattended overnight.
