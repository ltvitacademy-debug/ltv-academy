# Lesson 10 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 10 of 10**

## What you'll learn

- A full recap of the pipeline you built, lesson by lesson, in the order the decisions actually happened
- The honest limitations this version carries, named again rather than hidden
- How the Intermediate project picks up exactly where this one stops

## What you actually built

Ten lessons ago, this started as a one-sentence hallway question: *"Can you tell me how we did
yesterday?"* Here's everything that question turned into:

```text
Lesson 1  -- Turned a vague ask into a specific requirement
Lesson 2  -- Planned the Bronze / Silver / Gold layers in plain English
Lesson 3  -- Landed raw POS and online data, untouched, in Bronze
Lesson 4  -- Cleaned, deduplicated, and typed it into Silver
Lesson 5  -- Aggregated Silver into Gold: one row per day
Lesson 6  -- Validated row counts across all three layers
Lesson 7  -- Scheduled the whole thing to run itself, every morning
Lesson 8  -- Connected Power BI to the Gold table, in Import mode
Lesson 9  -- Presented the one number this project was actually asked for
```

Every one of those steps used real PySpark and Delta Lake syntax that runs the same way on an Azure
Databricks notebook or a Microsoft Fabric Lakehouse notebook — nothing in this pipeline depends on
which platform you're running it on.

## The skills underneath the pipeline

Strip away the retail example and what's left is the actual transferable skill set: requirements
clarification before code, the medallion architecture pattern, reading and writing Delta tables,
writing a deduplication and type-casting transformation, writing a correct aggregation (and knowing
when `countDistinct` matters), validating a pipeline's own correctness instead of trusting that it
ran, orchestrating dependent tasks on a schedule, and connecting a BI tool to the result. That list
is the real deliverable of this course, not the specific retail numbers.

## The limitations, named one more time

This pipeline is honest about what it doesn't do:

- **No incremental loading.** Every run rebuilds Silver and Gold from the entirety of Bronze. That's
  fine at this size; it would not stay fine as the business grows.
- **One stakeholder, one question.** The Store Operations lead got exactly the one number they asked
  for — nothing was built to serve a second audience with a different question.
- **No returns or refunds logic**, and no real-time streaming — both named back in Lesson 1 and never
  revisited.

Naming these out loud, again, at the end, is the same discipline Lesson 9 taught for handling
follow-up questions live: a project you can't honestly describe the limits of isn't one you've fully
understood yet.

## What's next: the Intermediate project

The next project in this track picks up exactly these three limitations. It introduces **a second
stakeholder with a different question** — not just "how did we do," but something that needs a
different grain or a different cut of the same underlying data — which means reconciling two sets of
requirements against one set of source data, the way real data engineering work actually layers up.
And it replaces this project's full-rebuild `overwrite` pattern with **incremental loading**, using
Delta's `MERGE` to update Silver and Gold with only the new or changed rows each run, instead of
recomputing everything from scratch every single day.

## Key terms

| Term | Meaning |
|---|---|
| Transferable skill | A technique (medallion architecture, validation, scheduling) independent of the specific business example |
| Named limitation | A deliberate scope boundary stated out loud, not hidden |
| Incremental loading | Processing only new or changed rows each run, via Delta MERGE, instead of a full rebuild |

## Lab

Write a short paragraph, as if explaining this project in an interview: what you built, the specific
techniques you used (name at least four), and one limitation you'd fix first if given more time.

## Check yourself

You've completed this capstone when you can describe, from memory and without looking back, all ten
lessons' worth of decisions in order, and state exactly which two limitations the Intermediate project
is built to fix.
