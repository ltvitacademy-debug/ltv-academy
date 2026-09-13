# Lesson 52 — Snowflake + ADF, dbt, Python & Airflow — Where Each Tool Fits

**Chapter 13 · Snowflake in the Modern Data Stack · Lesson 52 of 60**

## What you'll learn

- Why Snowflake is the storage/compute engine at the center of a stack, not the whole stack
- What Azure Data Factory, dbt, Python, and Airflow each actually do around it
- Why "ELT" specifically means the T happens inside Snowflake, not before it
- How these four tools combine in a realistic pipeline, without overlap or redundancy

## Snowflake is the engine, not the whole car

Everything in this course so far — loading, transforming, modeling,
securing, connecting to Power BI — happens *inside* Snowflake. But a
real production data platform is never just Snowflake. It's Snowflake
plus a small set of tools that each do one job well around it. Four of
those tools are entire courses of their own in this catalog: **Data
Factory**, **dbt (Analytics Engineering)**, **Python for Power BI**,
and **Airflow**. This lesson is about the seams between them.

## Where each tool actually fits

| Tool | Job | Where it touches Snowflake |
|---|---|---|
| **Azure Data Factory** | Orchestration and ingestion — moving raw data from source systems (SQL Server, APIs, files) into Snowflake on a schedule or trigger | The "E" and "L" in ELT: gets raw data landed into staging tables |
| **dbt** | Transformation and testing — SQL models, version-controlled, with built-in data tests | The "T" in ELT: runs entirely as SQL executed *by* Snowflake warehouses, transforming staging into the warehouse/reporting layers from Chapters 5–6 |
| **Python** | Custom logic that doesn't fit cleanly in SQL — calling external APIs, ML scoring, complex branching logic | Reads/writes Snowflake via the Snowflake Connector for Python or Snowpark, usually as one step a pipeline calls out to |
| **Airflow** | Orchestration and dependency management across the whole pipeline — "run dbt only after the ADF load finishes," retries, alerting | Coordinates the other three; often triggers Snowflake Tasks (Chapter 8) or dbt runs directly, rather than moving data itself |

## Why "ELT" means the T happens inside Snowflake

This is the detail that trips people up coming from an on-prem ETL
background: in the modern stack, transformation isn't a separate
server doing work *before* data reaches the warehouse — it's SQL that
Snowflake itself executes, usually generated and version-controlled by
dbt, running on a Snowflake warehouse like any other query. That's why
dbt shows up as a transformation *tool*, not a transformation *engine*
— the engine doing the actual compute is still Snowflake, billing
credits exactly the way Lesson 47 described.

## A realistic pipeline, end to end

1. **Airflow** kicks off a scheduled pipeline run.
2. **Azure Data Factory** extracts data from a source SQL Server
   database and lands it in a Snowflake staging schema.
3. Airflow waits for that to succeed, then triggers **dbt**, which
   runs SQL transformations — staging into warehouse, warehouse into
   reporting views (Lesson 51) — as Snowflake queries.
4. A **Python** step, also triggered by Airflow, calls an external API
   to enrich a dimension table, writing results back to Snowflake via
   Snowpark.
5. **Power BI** (Chapters 12) queries the finished reporting views —
   the destination this entire pipeline exists to feed.

Notice none of these tools compete for the same job. ADF doesn't
transform, dbt doesn't orchestrate across systems, Python doesn't
replace SQL for set-based transformations, and Airflow doesn't touch
data directly. Overlap between them is usually a sign the stack was
assembled without a plan, not that the stack needs more tools.

## Key terms

| Term | Meaning |
|---|---|
| Modern data stack | A small set of specialized tools (ingestion, warehouse, transformation, orchestration, BI) instead of one monolithic platform |
| ELT | Extract, Load, then Transform — transformation happens inside the warehouse, not before it |
| Orchestration | Scheduling, sequencing, and monitoring dependent steps across multiple tools |
| Snowpark | Snowflake's framework for running Python (and other languages) against Snowflake data |

## Lab

1. Sketch the five-step pipeline above as a simple numbered list for a
   pipeline you're familiar with (real or hypothetical) — name which
   tool would own each step.
2. For one step in your sketch, write one sentence explaining why that
   specific tool (not one of the other three) is the right fit for it.

## Check yourself

You're ready for Lesson 53 when you can explain, without looking it
up, why dbt is described as running "inside" Snowflake rather than as
a separate transformation engine, and can name which of the four tools
in this lesson would own a step that calls an external REST API.
