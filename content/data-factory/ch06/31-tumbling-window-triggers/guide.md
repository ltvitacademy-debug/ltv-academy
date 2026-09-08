# Lesson 31 — Tumbling Window Triggers

**Chapter 6 · Triggers & Scheduling · Lesson 2 of 4**

## What you'll learn

- What makes a tumbling window genuinely different from a schedule
- The real properties: delay, maxConcurrency, retryPolicy
- Backfill — running past windows automatically
- Exactly when to reach for this over a Schedule trigger

## Fixed, non-overlapping, contiguous windows

A **tumbling window trigger** fires at a periodic interval from a
specified start time, while **retaining state** — the windows are
fixed-size, non-overlapping, and contiguous, covering time
continuously with no gaps and no overlap:

![Screenshot of the New trigger configuration for a Tumbling window trigger, showing Start Date, Recurrence, and Advanced options.](/courses/data-factory/ch06/31-tumbling-window-triggers/create-tumbling-window-trigger.png)

Where a Schedule trigger has a **many-to-many** relationship with
pipelines, a tumbling window trigger has a strict **one-to-one**
relationship — it can only ever reference a single pipeline.

## The properties that make it heavier — and more reliable

- **`delay`** — how long the trigger waits past a window's due time
  before actually firing. Doesn't shift the window itself, just when
  it's evaluated.
- **`maxConcurrency`** — the maximum number of windows allowed to run
  simultaneously, from 1 to 50. Genuinely essential for backfill: if
  10 windows are ready and `maxConcurrency` is 10, all 10 fire at
  once; an 11th window waits for one to finish.
- **`retryPolicy`** — automatically retries a failed pipeline run
  using the *same* input parameters, no manual intervention required.

## Backfill: running the past automatically

Set a `startTime` in the past, and a tumbling window trigger
automatically generates every missed window between then and now, in
order, from oldest to newest — honoring `maxConcurrency` the whole
way. This is genuinely useful for a new pipeline that needs to
process several months of historical data on its first real run,
without you writing a single extra line of orchestration.

## `WindowStart` and `WindowEnd`

Every tumbling window trigger exposes `trigger().outputs.windowStartTime`
and `trigger().outputs.windowEndTime` — pass these into your
pipeline's parameters, and every activity inside can know precisely
which time window it's processing:

```
"parameters": {
  "windowStart": "@trigger().outputs.windowStartTime",
  "windowEnd": "@trigger().outputs.windowEndTime"
}
```

## Tumbling window vs. Schedule trigger

| | Tumbling window | Schedule |
|---|---|---|
| Backfill | Supported | Not supported |
| Reliability | No gaps, guaranteed | Less reliable |
| Retry | Built-in `retryPolicy` | Not supported |
| Concurrency limit | 1-50, explicit | Not supported |
| Pipeline relationship | One-to-one | Many-to-many |
| On failure | Trigger run reflects pipeline failure | "Fire and forget" — succeeds once started |

Reach for a tumbling window trigger specifically when you need
**reliable, gap-free, retryable** time-series processing — not just
"run this sometime around 9 AM."

## Key terms

| Term | Meaning |
|---|---|
| Tumbling window | A fixed-size, non-overlapping, contiguous time interval |
| Backfill | Automatically running every missed window between a past start time and now |
| maxConcurrency | The upper limit on simultaneously running windows, 1-50 |

## Lab

1. Create a tumbling window trigger with a `startTime` a few hours in
   the past, and a small `interval` — watch it backfill missed
   windows automatically.
2. Set `maxConcurrency` to a low number and observe how windows queue.
3. Write one sentence explaining why a tumbling window trigger's run
   state reflects its pipeline's actual success or failure, unlike a
   Schedule trigger's "fire and forget" behavior.

## Check yourself

You're ready for Lesson 32 when you can explain, in one sentence,
why you'd choose a tumbling window trigger over a Schedule trigger
for a pipeline that absolutely can't have gaps in its processing.
