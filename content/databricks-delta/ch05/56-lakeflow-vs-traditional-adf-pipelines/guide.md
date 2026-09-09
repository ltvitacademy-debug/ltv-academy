# Lesson 56 — Lakeflow vs. Traditional ADF Pipelines

**Chapter 5 · Lakeflow · Lesson 56 of 57**

## What you'll learn

- Two genuinely different tools, not competing versions of the same one
- Where transformation logic actually lives, in each
- Orchestrating across both — a real, common pattern, not an either/or choice
- When to reach for each, based on what's actually needed

## Two different centers of gravity

If you've taken this track's Data Factory course, ADF's core unit is
the **pipeline**: activities wired together visually, a **Copy
Activity** moving data between systems, a **Lookup** or **Web**
activity calling out to something else, orchestrated primarily
around *movement* between systems. Lakeflow's core unit is the
**declarative pipeline** (Lesson 50): transformation logic, written
in PySpark/SQL, with dependency order inferred from the code itself
— orchestrated primarily around *transformation* within Databricks.

## Where transformation logic actually lives

An ADF Copy Activity moves bytes; it generally isn't where row-level
casting, deduplication, or business aggregation happens — that logic
typically lives in a Databricks notebook activity *called by* ADF,
or, in this course's own terms, in the exact `@dlt.table` functions
Lessons 50–52 covered. A Lakeflow pipeline's transformation logic
lives directly in its own Python/SQL definitions — no separate
orchestration tool required just to express the transformation
itself.

## A real, common combined pattern

```
ADF Pipeline: nightly_data_movement
  Activity 1: Copy from on-prem SQL Server -> ADLS Gen2 landing zone
  Activity 2: Trigger Databricks job/Lakeflow Pipeline (Lesson 54's Pipeline task)
```

This is genuinely common in real organizations already using both
tools: ADF handles moving data from systems Databricks can't reach
directly (on-prem databases, legacy FTP servers), then hands off to
a Lakeflow pipeline for the actual bronze→silver→gold transformation
work this course has built throughout. Neither tool disappears; each
does what it's actually better at.

## When to reach for each

| Need | Reach for |
|---|---|
| Moving data between many different, often non-Databricks systems | ADF |
| Complex, code-based transformation logic (Chapters 2–4 material) | Lakeflow |
| Both, in the same real organization | Both, handing off between them |

Choosing "Lakeflow vs. ADF" as an exclusive either/or is usually the
wrong framing — the real question is which tool is actually doing
which job, in a pipeline that may legitimately use both.

## Key terms

| Term | Meaning |
|---|---|
| ADF's center of gravity | Movement between systems, via visual activities |
| Lakeflow's center of gravity | Transformation within Databricks, via code-based declarative pipelines |
| Combined pattern | ADF moves data in; Lakeflow transforms it — a real, common handoff |

## Check yourself

You're ready for Lesson 57 when you can explain, without looking: why
is "ADF or Lakeflow" often the wrong question to ask, for a real
organization using both?
