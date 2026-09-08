# Lesson 16 — Building Your First End-to-End Pipeline

**Chapter 3 · Pipelines & Activities · Lesson 6 of 6**

## What you'll learn

- How to chain three activities from this chapter into one real pipeline
- Where dependency conditions control what runs next, and when
- How to run and check a pipeline in Debug mode
- Why this exact chain — Lookup, Copy, Stored Procedure — is genuinely common

## The chain this lesson builds

Three activities, chained together, each one covered earlier in this
chapter:

1. **Lookup** (Lesson 14) — reads the name of the table to copy this
   run, from a small configuration table.
2. **Copy** (Lessons 12-13) — copies that table's data from your
   `AdventureWorksDW2014` SQL Server connection (Lesson 8) into Azure
   Blob Storage (Lesson 7), using the table name the Lookup returned.
3. **Stored Procedure** (Lesson 14) — logs the run's completion back
   into SQL Server once the copy succeeds.

This is a genuinely common real-world shape: **look up what to do,
do it, record that it happened** — the same three-part rhythm shows
up constantly in production data engineering, just with different
activities filling each role.

## Building it on the canvas

Every activity you drag onto the pipeline canvas — Lookup, Copy,
Stored Procedure — lands in the same authoring surface Lesson 11
already introduced:

![Screenshot of Data Factory Studio's Author hub, showing Factory Resources on the left, an Activities pane, and a pipeline canvas with a Copy activity and its Source settings open below.](/courses/data-factory/ch03/16-first-end-to-end-pipeline/view-pipeline.png)
*The same canvas from Lesson 11's tour — this time with real activities chained together, not just one.*

Drag each activity in, connect them left to right, and configure each
one using exactly what the last five lessons already taught: a source
dataset for Lookup, a source and sink for Copy, a linked service and
procedure name for Stored Procedure.

## Dependency conditions: what runs next, and why

Every connection between two activities on the canvas carries a
**dependency condition** — one of four: **Succeeded**, **Failed**,
**Skipped**, or **Completed**. This pipeline uses two of them
deliberately:

- Copy → Stored Procedure, condition **Succeeded**: only log
  completion if the copy actually worked.
- Copy → Fail activity (Lesson 15), condition **Failed**: if the copy
  didn't work, stop the pipeline loudly with a clear message instead
  of silently doing nothing.

This is exactly the pattern Lesson 15 previewed: a pipeline that
fails on purpose, with an explanation, is far easier to debug than
one that just quietly doesn't finish.

## Running it in Debug mode

Select **Debug** on the pipeline toolbar to run it immediately,
without publishing or waiting for a trigger. Debug runs show their
progress right on the canvas — a colored border on each activity as
it runs, succeeds, or fails — and the same run details Lesson 5's
Studio tour already showed you how to read:

![Screenshot of Data Factory Studio's Monitor hub, showing a Pipeline runs list with columns for pipeline name, run start, duration, triggered by, and status.](/courses/data-factory/ch03/16-first-end-to-end-pipeline/monitor-overview.png)
*Debug runs also show up here, distinguishable from real triggered runs — Chapter 8 covers monitoring in full depth.*

## What this chapter actually taught

Look back at the six lessons in this chapter: What Is a Pipeline,
Copy, Mapping & Schema Drift, Lookup & Stored Procedure, Web/Wait/
Fail/Set Variable, and this one. Every activity type this course
touches from here forward — the control-flow activities in Chapter 4,
the transformations in Chapter 5 — builds on exactly this same
pattern: drag an activity in, configure it, chain it to the next one
with a dependency condition that means something.

## Key terms

| Term | Meaning |
|---|---|
| Dependency condition | The rule (Succeeded, Failed, Skipped, Completed) controlling whether a downstream activity runs |
| Debug | Running a pipeline immediately in the Studio, without publishing |

## Lab

1. Build the three-activity chain described above — Lookup, Copy,
   Stored Procedure — against your own AdventureWorks or Northwind
   connections from Chapter 2.
2. Set the Copy → Stored Procedure dependency to **Succeeded**, and
   add a Fail activity connected on **Failed**.
3. Run the whole pipeline in Debug mode and confirm each activity's
   status matches what you'd expect.

## Check yourself

Chapter 3 is complete when you can build a three-activity pipeline
from scratch — Lookup, Copy, and one more activity of your choice —
with a dependency condition that actually does something meaningful,
and run it successfully in Debug mode.
