# Lesson 7 — Scheduling the Pipeline to Run Daily

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 7 of 10**

## What you'll learn

- The orchestration concepts that turn three notebooks you run by hand into a pipeline that runs
  itself every morning
- Why task dependencies matter: Silver must never start before Bronze finishes successfully
- Why this lesson stays conceptual rather than click-by-click, since this course serves both Azure
  Databricks and Microsoft Fabric students

## From "I ran it" to "it runs itself"

Everything built in Lessons 3 through 6 works the moment you click run in a notebook. That's not
good enough for a real daily sales table — the Store Operations lead checks it every morning, which
means it has to be ready every morning, without anyone remembering to click anything. That's what a
**scheduled job** solves: a notebook (or a short sequence of notebooks) that a platform's job
scheduler triggers automatically, on a timer, without a person involved.

Both Azure Databricks and Microsoft Fabric have their own job/pipeline scheduling systems, with
different screens and different names for the same idea. This lesson deliberately stays at the
concept level — the orchestration *shape* — rather than walking through either platform's specific
UI, because that shape is identical no matter which one you're using.

## The shape of a scheduled pipeline

```text
job: daily-sales-pipeline
schedule: every day at 05:00 (after the POS export lands)
tasks:
  - name: land-bronze
    notebook: 01_land_bronze
  - name: clean-silver
    notebook: 02_bronze_to_silver
    depends_on: [land-bronze]
  - name: aggregate-gold
    notebook: 03_silver_to_gold
    depends_on: [clean-silver]
  - name: validate
    notebook: 04_validate_row_counts
    depends_on: [aggregate-gold]
on_failure: alert the on-call channel
```

This isn't real platform syntax — it's a plain-English sketch of the shape every real job scheduler
on either platform actually implements: a trigger, a list of tasks, and dependencies between them.

## Why `depends_on` matters

Without an explicit dependency chain, a scheduler might try to run `clean-silver` and `land-bronze` at
the same time, or run `aggregate-gold` against yesterday's Silver table because today's Bronze load
hadn't finished yet. Naming the dependency — Silver depends on Bronze, Gold depends on Silver,
validation depends on Gold — guarantees each task only starts after the one before it has actually
succeeded, which is exactly the Bronze → Silver → Gold order this whole course has built in.

## Why the trigger time matters

Scheduling "every day at 05:00" only works if the in-store POS export has actually landed by then.
Picking a schedule time isn't arbitrary — it depends on knowing when upstream data is guaranteed to
be available, which is a real-world constraint this lesson names rather than glosses over: a pipeline
scheduled too early will run against yesterday's incomplete data and nobody will notice until someone
asks why the number looks wrong.

## Why `on_failure: alert`

A scheduled job that silently fails is worse than no automation at all — the Store Operations lead
would keep trusting a Gold table that stopped updating days ago. Wiring a failure alert into the last
task (or the job as a whole) means a broken run gets a human's attention the same morning, not weeks
later when someone finally notices the numbers look stale.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled job | A pipeline triggered automatically on a timer, not run by hand |
| Task dependency | A rule that one task can only start after another has finished successfully |
| Trigger time | The schedule time a job is set to run, chosen based on when upstream data is actually ready |
| Failure alert | A notification sent when a scheduled run fails, so someone finds out the same day |

## Lab

Sketch your own version of this job definition, adding a fifth task that only runs if `validate`
succeeds: sending a short "pipeline refreshed" notification. Where in the dependency chain does it
go, and why does it need to depend on `validate` specifically, not just `aggregate-gold`?

## Check yourself

You're ready for Lesson 8 when you can explain, from memory, why each task in this pipeline needs an
explicit dependency on the one before it, and why the schedule's trigger time has to account for when
the upstream POS export actually lands.
