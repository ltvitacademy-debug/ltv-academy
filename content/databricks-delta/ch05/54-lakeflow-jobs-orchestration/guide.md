# Lesson 54 — Lakeflow Jobs — Orchestration

**Chapter 5 · Lakeflow · Lesson 54 of 57**

## What you'll learn

- A pipeline as one task — treating Lesson 51's whole `@dlt` pipeline as a single job step
- Combining a Lakeflow Pipeline task with ordinary notebook tasks, in one job
- Why orchestration still matters even with a fully declarative pipeline
- What Lakeflow Jobs is really renaming, versus what it's genuinely adding

## A pipeline, as one task

```
Job: nyc_taxi_orchestration
  Task 1: run_pipeline        (type: Lakeflow Pipeline — Lesson 50's whole @dlt pipeline)
  Task 2: send_notification   (type: Notebook — depends on Task 1)
```

This is Lesson 11's job/task structure again, with a genuinely new
task **type**: a "Pipeline" task runs Lesson 50's entire declarative
pipeline — every `@dlt.table`, in its inferred dependency order — as
a single step, exactly the way `run_pipeline` here treats bronze,
silver, and gold together as one unit, rather than three separate
tasks the way Lesson 30's manual pipeline required.

## Mixing pipeline tasks with ordinary tasks

A Lakeflow Job isn't limited to pipeline tasks alone. `send_
notification` here is an ordinary notebook task (Lesson 11) — maybe
posting a Slack message, or triggering a downstream dashboard
refresh, once the pipeline finishes. This is the real, practical
answer to "the pipeline handles bronze/silver/gold, but what about
everything around it?" — orchestration still coordinates whatever
isn't itself expressible as a `@dlt.table`.

## Why orchestration still matters

Lesson 50's declarative pipeline solved dependency ordering
*within* the pipeline. It doesn't solve *when* the whole thing runs,
what happens *after* it finishes, or how it relates to work that
isn't a Lakeflow Pipeline at all (a legacy notebook, an external
API call). Lakeflow Jobs is where those broader concerns still live
— the same job/task/schedule vocabulary from Lesson 11, applied one
level up from any single pipeline.

## What's actually new, versus what's renamed

The scheduling, the task dependency chains, the run history
(Lesson 11) — all of that is genuinely the same underlying job
system, under Lakeflow's current name. What's new is the "Pipeline"
task type itself: the ability to point a single task at an entire
declarative pipeline, rather than only at individual notebooks or
scripts.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline task | A job task type that runs an entire `@dlt` pipeline as one step |
| Mixed job | A Lakeflow Job combining pipeline tasks with ordinary notebook tasks |
| Orchestration's remaining job | Scheduling, sequencing, and coordinating work outside any single pipeline |

## Check yourself

You're ready for Lesson 55 when you can explain, without looking: what
does a "Pipeline" task type let one job task do that Lesson 11's
original task types couldn't?
