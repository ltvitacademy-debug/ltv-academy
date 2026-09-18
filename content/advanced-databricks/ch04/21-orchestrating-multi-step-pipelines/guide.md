# Lesson 21 — Orchestrating Multi-Step Pipelines

**Chapter 4 · Jobs, Workflows & Orchestration · Lesson 21 of 34**

## What you'll learn

- Tying together ingestion (Chapter 2), transformation (Chapter 3), and serving as one orchestrated Job
- What each task in that Job actually is, using this chapter's own vocabulary
- Where `Run if` conditions (Lesson 19) and cluster choice (Lesson 20) actually apply in a real multi-step design
- Chapter 4 close: what Chapter 5 covers next

## The whole shape, in one job

Everything this chapter's ideas are actually for is one job that spans all
three concerns this course has built separately so far:

```
Job: nyc_taxi_full_pipeline
  Task 1: ingest_raw_files       (Chapter 2 — Auto Loader, file-arrival trigger)
  Task 2: run_lakeflow_pipeline  (Chapter 3 — bronze -> silver -> gold, one Pipeline task)
  Task 3: refresh_dashboard      (serving — depends_on Task 2, notebook task)
  Task 4: send_failure_alert     (depends_on Task 2, Run if: At least one failed)
```

Task 1 is Chapter 2's Auto Loader work (Lessons 7-11), started by a
file-arrival trigger (Lesson 17) rather than a fixed schedule. Task 2 is
Chapter 3's declarative pipeline (Lessons 12-16), run as a single Pipeline
task, exactly as Lesson 54 first showed. Task 3 and Task 4 are ordinary
notebook tasks depending on Task 2 — one for the normal case, one that only
fires when Task 2 actually fails (Lesson 19's `Run if: At least one
failed`).

## Where this chapter's ideas actually apply

- **Task dependencies** (Lesson 19): Task 3 and Task 4 both `depend_on`
  Task 2, but with different `Run if` conditions — a real fan-out into
  "happy path" and "failure path," from one upstream task.
- **Cluster choice** (Lesson 20): Task 2's pipeline is compute-heavy and
  benefits from its own job cluster; Task 3's dashboard refresh and Task
  4's alert are both lightweight enough to share one small cluster between
  them.
- **Trigger type** (Lesson 17): a file-arrival trigger on Task 1 means the
  whole job starts the moment new data actually lands, not on a guessed
  schedule.

## Why this is the real integration point

Chapter 2 solved ingestion. Chapter 3 solved transformation, declaratively.
Neither chapter, on its own, said how a new file landing in cloud storage
actually becomes a refreshed dashboard, end to end, unattended, with a real
failure path. That's what a Job (Chapter 4) is actually for — not a fourth
new concept, but the orchestration layer tying the other three together
into one thing that runs itself.

## Chapter 4 close

Chapter 4 covered Databricks Jobs beyond Lesson 11's basics (Lesson 17),
the Workflows UI (Lesson 18), task dependencies and `Run if` conditions
(Lesson 19), job cluster strategy (Lesson 20), and now the full multi-step
integration. Chapter 5, **Performance at Scale**, picks up next: the Photon
engine, adaptive query execution, caching, cluster sizing, and cost
optimization — making everything this job actually runs, run faster and
cheaper.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline task | A job task type running an entire Lakeflow Declarative Pipeline as one step |
| Fan-out with different `Run if` | Multiple tasks depending on the same upstream task, each firing under different conditions |
| Orchestration's real role | Tying ingestion, transformation, and serving into one unattended, end-to-end job |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: in the
four-task job above, what makes Task 4 only run when Task 2 fails, instead
of every time?
