# Lesson 29 — Ingesting and Transforming Data — Exam Focus

**Chapter 2 · DP-700 Certification Prep · Lesson 29 of 81**

## What you'll learn

- Domain 2's checklist: pipelines, Dataflows, Eventstreams, notebooks, Spark
- How to pick the right ingestion tool for a scenario, exam-style
- Where Delta Lake mechanics from the Databricks course reappear here
- The batch-vs-streaming distinction DP-700 tests hardest

## Domain 2's real checklist

Domain 2 — "Ingest and transform data" — covers moving data into
Fabric and reshaping it once it's there:

```
- Data Factory pipelines (Fabric Lesson 8) — orchestrated, batch
- Dataflows Gen2 (Fabric Lesson 9) — low-code, Power Query-style
- Eventstreams (Fabric Lesson 19) — streaming ingestion
- Event sources: Event Hubs / IoT Hub (Fabric Lesson 20)
- Fabric Notebooks (Fabric Lesson 6) and Spark transformations
- Delta table mechanics underneath every write (Databricks L.13-24)
```

## Picking the right tool, exam-style

DP-700 scenario questions in this domain almost always reduce to
"which ingestion tool fits this description." The batch-vs-streaming
distinction is the single hardest-tested split:

```
Scenario cue words -> tool to pick:
"Nightly/scheduled batch load, orchestration, retries" -> Pipeline
"Low-code, transform-as-you-load, business analyst"     -> Dataflow Gen2
"Continuous events, IoT sensors, click data"             -> Eventstream
"Custom PySpark logic, complex joins, ML prep"           -> Notebook
```

A pipeline can *call* a notebook or a Dataflow as one of its
activities — that composability is itself an exam-tested fact.
Fabric Data Factory pipelines are the orchestration layer; notebooks
and Dataflows are often steps *inside* them, not competitors to them.

## Where Delta mechanics reappear

Every write into a Lakehouse table, regardless of which tool did the
writing, lands as a Delta table under OneLake. That means the ACID
transaction guarantees, schema enforcement, and time travel from
Databricks & Delta Lake Lessons 17–21 are silently in effect on every
Fabric ingestion path — DP-700 will ask what happens if a pipeline
write's schema doesn't match the target table, and the answer is
schema enforcement (Databricks Lesson 19) rejecting the mismatched
write, not a silent corruption.

## The streaming half

Eventstreams (Fabric Lesson 19) sit in front of Eventhouse/KQL
databases (Fabric Lesson 21) or route directly into a Lakehouse.
Windowing concepts — tumbling, hopping/sliding, and session windows
(Fabric Lessons 30–32) — are Domain 2 material too: a scenario that
says "aggregate sensor readings into fixed five-minute, non-
overlapping buckets" is describing a tumbling window by definition,
not asking you to pick from a live list.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline | Orchestrated, typically batch data movement; can call notebooks/Dataflows as steps |
| Dataflow Gen2 | Low-code, Power Query-style transformation, good for business-analyst-authored logic |
| Eventstream | Streaming ingestion path, feeding Eventhouse/KQL or a Lakehouse directly |
| Tumbling window | Fixed-size, non-overlapping time buckets for streaming aggregation |

## Check yourself

You're ready for Lesson 30 when you can answer, without looking: a
scenario describes a nightly scheduled load with retry logic that
also needs to call a custom PySpark transformation — what's the
right combination of Fabric tools?
