# Lesson 48 — What Is Lakeflow?

**Chapter 5 · Lakeflow · Lesson 48 of 57**

## What you'll learn

- Lakeflow: Databricks' current, unified name for ingestion + pipelines + orchestration
- The three pieces this course's own pipeline already built, separately, now unified
- Why "Delta Live Tables" is a name this chapter needs to acknowledge
- What this final chapter covers, lesson by lesson

## Naming the gap Chapter 4's finale flagged

Lesson 47 ended by naming a real gap: this course's entire pipeline
still runs as separately-managed pieces — Autoloader configured by
hand (Lesson 32), cleaning logic wrapped in `foreachBatch` (Lesson
34), jobs and tasks chained manually (Lesson 11, 29-30).
**Lakeflow** is Databricks' current umbrella term for a unified
system covering exactly this: ingestion, declarative pipeline
definitions, and orchestration, as one coherent product rather than
three things you separately wire together.

## The three pieces, now unified

| This course already built | Lakeflow's name for it |
|---|---|
| Autoloader (Lesson 32) | **Lakeflow Connect** — managed ingestion |
| `foreachBatch` + `MERGE` pipeline logic (Lesson 34) | **Lakeflow Declarative Pipelines** |
| Jobs and chained tasks (Lesson 11, 29–30) | **Lakeflow Jobs** — orchestration |

Nothing here is a brand-new concept arriving out of nowhere — it's
this course's own Chapters 1–4 material, given a real product name
and a more declarative way to express it, covered in depth across
this chapter's remaining lessons.

## A naming note worth knowing

Lakeflow Declarative Pipelines was previously called **Delta Live
Tables (DLT)** — real, current Databricks documentation, job
listings, and existing production code all still reference DLT by
that older name. `@dlt.table` (Lesson 51) is the actual decorator
you'll write in code; recognizing that "DLT" and "Lakeflow
Declarative Pipelines" refer to the same underlying feature matters
for reading anything written before this rename.

## What this chapter covers

Lesson 49 covers Lakeflow Connect's ingestion side properly.
Lessons 50–53 cover Declarative Pipelines: the `@dlt.table` syntax,
declarative data-quality `Expectations`, and pipeline execution
modes. Lessons 54–55 cover Lakeflow Jobs and monitoring. Lesson 56
compares this to the Data Factory course elsewhere in this track.
Lesson 57 is this **entire course's** finale.

## Key terms

| Term | Meaning |
|---|---|
| Lakeflow | Databricks' unified name for ingestion, pipelines, and orchestration |
| Lakeflow Declarative Pipelines | The current name for what was previously "Delta Live Tables (DLT)" |
| Lakeflow Connect / Jobs | Ingestion and orchestration, the other two pieces of the same system |

## Check yourself

You're ready for Lesson 49 when you can explain, without looking: what
older Databricks name refers to the same feature as "Lakeflow
Declarative Pipelines"?
