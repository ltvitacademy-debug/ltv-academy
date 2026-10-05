# Lesson 14 — Lineage Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson is about lineage — not what it's for, but how the architecture underneath it actually captures and stores it.

## S2 · STEPS — Table vs column-level

Lineage comes in two grains. Table-level — table B was built from table A — coarse, cheap, good for a first pass. Column-level — this exact column came from that exact column, via this transform — far more useful for precise impact analysis, far more expensive to capture, because you have to parse the actual transformation logic, not just note a job ran.

## S3 · STEPS — Three capture methods

Lineage gets captured three real ways. Query log parsing — reconstruct it after the fact from logs you already have. Static code parsing — read the pipeline code before it even runs. Runtime instrumentation — an agent embedded in the framework itself, emitting events as the job actually executes, catching dynamic logic the other two would miss.

## S4 · CODE — OpenLineage event shape

OpenLineage is an open, vendor-neutral spec for lineage events — eventType, eventTime, a run with a unique runId, a job, and inputs and outputs. Tools across this catalog's own path, like dbt, Spark, and Airflow, can emit events in this shape, so a lineage store gets consistent events without a custom parser per tool.

## S5 · STEPS — Why it's a graph problem

Lineage questions — what's downstream of this column, what could have broken this report — are multi-hop traversals across a graph of assets and transformations. A store that only answers "what does this one thing point to" one hop at a time breaks down the moment a real question needs five or six hops traced automatically.

## S6 · OUTRO

Next lesson: what happens when more than one platform has its own catalog, and they all need to connect.
