# Lesson 18 — The Workflows UI

**Chapter 4 · Jobs, Workflows & Orchestration · Lesson 18 of 34**

## What you'll learn

- The Workflows UI's visual DAG canvas — building a multi-task job by drawing dependencies, not writing YAML
- Where a task's type, cluster, and parameters actually live in that canvas
- The run graph view — watching a live run's tasks light up as they complete
- Why the visual canvas and Asset Bundles (Lesson 16) are two paths to the exact same job

## A job, built visually

Lesson 17 introduced a Job as tasks + a trigger + compute. The **Workflows
UI** is where that structure gets built by hand, in a workspace, visually:
each task appears as a box on a canvas, and dragging a line from one task to
another sets a dependency (Lesson 19 covers exactly what that dependency can
mean beyond "runs after"). This is the same job object Lesson 17's
screenshot showed, before and after it exists — the canvas is how a person
builds it, not a separate kind of job.

## What lives inside one task box

Clicking a task box opens its configuration: task type (notebook, SQL,
Python script, dbt, or Lesson 16's Pipeline task type), which cluster runs
it (Lesson 20 covers the real choice here), and any parameters passed in
(Lesson 11's widget-value pattern, one step up). Every setting a bundle's
YAML (Lesson 16) would declare in text has a matching field somewhere in
this same canvas — two different ways to author the identical
configuration.

## Watching a run happen

```
Task 1: ingest_orders      [running...]
Task 2: transform_orders   [waiting]
Task 3: load_gold          [waiting]
```

Once a run starts, the same canvas becomes a live status view: each task box
changes color as it queues, runs, and finishes — succeeded, failed, or still
running — the visual version of Lesson 11's Run history, but watched task by
task instead of read as a single overall result afterward.

## Two paths to the same job

Building a job by dragging boxes in the Workflows UI and declaring the exact
same job in a Databricks Asset Bundle's `databricks.yml` (Lesson 16) produce
the identical underlying job object. Neither is "the real one" — a team
iterating on a new pipeline's shape often starts in the UI, then exports or
hand-writes the equivalent YAML once the shape is settled, so it deploys
repeatably instead of living only as clicks someone remembers making.

## Key terms

| Term | Meaning |
|---|---|
| Workflows UI | The visual canvas for building and monitoring a job's tasks and dependencies |
| Task box | One task's visual representation — type, cluster, and parameters, in one place |
| Run graph | The live, per-task status view of an in-progress job run |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why do a
job built in the Workflows UI and the same job declared in a Databricks
Asset Bundle end up as the identical underlying object?
