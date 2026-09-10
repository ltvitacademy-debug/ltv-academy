# Lesson 8 — Fabric Data Factory — Pipelines

**Chapter 1 · Microsoft Fabric · Lesson 8 of 70**

## What you'll learn

- Fabric pipelines: activities wired together visually, the same shape as Azure Data Factory
- Copy activity — moving data into a lakehouse, no code required
- Chaining a pipeline into a notebook activity
- Scheduling a pipeline, the same underlying idea as Databricks & Delta Lake Lesson 11's jobs

## Activities, wired together visually

A **Fabric pipeline** is built from **activities** connected in a
visual canvas — Copy activities, notebook activities, conditional
logic — the exact orchestration shape this track's separate Data
Factory course covers for Azure Data Factory itself. Fabric's
pipelines aren't a new invention; they're the same ADF pipeline
model, running inside Fabric's own workspace instead of a standalone
ADF resource.

## Copy activity — moving data, no code

1. Create a new **Data pipeline**, add a **Copy data** activity.
2. Configure a **source** (an HTTP endpoint, a database, a storage
   account — this course's NYC Taxi monthly files, say).
3. Configure a **destination**: this course's lakehouse (Lesson 4),
   `Files` or `Tables` directly.
4. Run it — the Copy activity moves bytes, with no PySpark or SQL
   written at all.

This is genuinely the same job Databricks & Delta Lake Lesson 56's
"ADF vs. Lakeflow" comparison described ADF doing: **movement**
between systems, not transformation. A Copy activity into a
lakehouse's `Files` area is this course's own version of that
course's "land the file, then transform it separately" pattern.

## Chaining into a notebook activity

```
Pipeline: monthly_ingest
  Activity 1: Copy data       (source file -> lakehouse Files)
  Activity 2: Notebook        (Lesson 6's notebook, transforms Files -> Tables)
```

A **Notebook activity** runs an actual Fabric notebook as one step
in the pipeline — this is where the real transformation logic from
Lesson 6 (and, eventually, this chapter's medallion-style work)
actually executes, chained after the Copy activity finishes. Same
idea as Databricks & Delta Lake Lesson 54's Lakeflow Job chaining a
"Pipeline" task after a notebook task — just the two task types
swapped in order and in name.

## Scheduling

A pipeline gets a **schedule** (a trigger, in Fabric's own
vocabulary) — run every day at 2 AM, say — the same underlying
concept as Databricks & Delta Lake Lesson 11's job schedule, just
named differently and configured in Fabric's own pipeline UI
instead of the Jobs UI.

## Key terms

| Term | Meaning |
|---|---|
| Fabric pipeline | Activities wired together visually — the same shape as ADF |
| Copy activity | Moves data between systems, no code required |
| Notebook activity | Runs a real Fabric notebook as one pipeline step |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
does a Copy activity typically get chained with a separate notebook
activity, rather than doing everything in one step?
