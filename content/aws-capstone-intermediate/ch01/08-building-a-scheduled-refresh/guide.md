# Lesson 8 — Building a Scheduled Refresh

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 8 of 16**

## What you'll learn

- Why "the pipeline works" and "the pipeline runs itself" are two different milestones
- EventBridge Scheduler as the trigger, and a Glue job trigger as the hand-off between steps
- The small Python Shell job that re-issues Lesson 5's `COPY` after the ETL job succeeds
- Why this simpler design is enough here, and what's deliberately left for the Advanced tier

## Everything so far has been triggered by hand

The ETL job runs when you start it. The `COPY` statement runs when you execute it in the Query
Editor. Every piece of this pipeline works — but "works when I run it" isn't what Finance asked
for back in Lesson 1. They asked for numbers that update **on their own**, every month, without
anyone remembering to kick off a job. Closing that gap is this lesson's entire job: wiring the ETL
job and the Redshift load together into one chain that starts itself, nightly, unattended.

## Piece one: a schedule that starts the chain

```text
EventBridge Scheduler rule: northfield-nightly-refresh
Schedule expression:        cron(0 5 * * ? *)   -- 5:00 AM UTC, daily
Target:                     Start the Glue job northfield-orders-etl
```

An EventBridge Scheduler rule named `northfield-nightly-refresh` fires once a day on a cron
schedule, `cron(0 5 * * ? *)` — 5 AM UTC — and its target is simply "start the Glue job
`northfield-orders-etl`." This is the entry point for the whole chain: nobody opens a console at 5
AM, EventBridge does it for them.

## Piece two: a trigger that hands off to the load

Starting the ETL job isn't the finish line — the curated Parquet it produces still needs loading
into Redshift. A Glue job trigger, `northfield-load-trigger`, type **CONDITIONAL**, watches
`northfield-orders-etl` for a **SUCCEEDED** state. The moment that condition is met, it starts a
second, much smaller Glue job: `northfield-redshift-load`, a **Python Shell** job (not Spark —
there's no large-scale transformation left to do here, just issuing a SQL command).

`northfield-redshift-load` re-issues the same `COPY` statement from Lesson 5 — via the Redshift
Data API or a `psycopg2` connection — against `analytics.fact_orders`. The chain, end to end:

```text
EventBridge (5 AM cron)
  -> starts northfield-orders-etl (Spark ETL, raw -> curated)
       -> on SUCCEEDED, northfield-load-trigger fires
            -> starts northfield-redshift-load (Python Shell)
                 -> re-runs the Lesson 5 COPY statement
```

## Why CONDITIONAL, specifically

A trigger that simply fires on a timer, independent of the ETL job, risks starting the Redshift
load **before** the curated data it depends on has finished writing — loading stale or partial
data. Watching for `northfield-orders-etl`'s `SUCCEEDED` state specifically means the load only
ever starts after there's something correct to load.

## Why this is enough for now

This deliberately isn't Step Functions. There's no state machine, no branching logic, no built-in
retry policy, no automated failure notification wired to the chain itself. For a two-step chain —
ETL, then load — a schedule plus one conditional trigger is enough to remove the "someone has to
remember to run this" problem, which was the actual gap Finance's ask exposed. What this design
doesn't give you: structured handling when a step fails partway, alerting someone when it does, or
orchestrating a longer chain with branches. That's real complexity this project isn't pretending
doesn't exist — it's explicitly the job of the Advanced tier's Step Functions and CloudWatch layer,
built on top of this exact same chain.

## Key terms

| Term | Meaning |
|---|---|
| EventBridge Scheduler | AWS's managed scheduler for firing an action (like starting a Glue job) on a cron expression |
| Glue job trigger | A rule that starts one Glue job based on another job's state, such as SUCCEEDED |
| CONDITIONAL trigger | A trigger type that only fires once its watched job reaches the specified state |
| Python Shell job | A lightweight Glue job type for simple scripted tasks, without a Spark cluster |

## Check yourself

You're ready for Lesson 9 when you can answer, without looking: why does `northfield-load-trigger`
need to be CONDITIONAL on `northfield-orders-etl` succeeding, rather than just running on its own
timer, and what real capability is this design deliberately leaving for the Advanced tier?
