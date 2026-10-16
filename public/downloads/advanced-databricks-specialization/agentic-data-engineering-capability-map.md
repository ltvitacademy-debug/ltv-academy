# Agentic Data Engineering Capability Map

Compiled from Chapter 8 (Agentic Data Engineering & What's New) — the seven genuinely new Data + AI
Summit 2026 capabilities this course's final chapter covers, with the real published specs kept in
one place instead of scattered across eight lessons.

## The three areas Lakeflow now spans

| Area | What it covers | New in Chapter 8? |
|---|---|---|
| Unified data engineering | Connecting to sources, transforming Bronze/Silver/Gold across batch and streaming | No — this is Chapters 2-4 |
| Agentic development | Context-aware AI agents helping author, optimize, and manage transformations | Yes — Lakeflow Designer, Genie Code |
| Autonomous operations | A control plane that understands data readiness, monitors production, traces root causes | Yes — Genie ZeroOps |

## The four pressures this chapter responds to

- **Tool sprawl** — fragmented ETL tools and custom in-house solutions blocking AI work before it starts
- **The maintenance burden** — teams reporting 50%+ of time spent firefighting silent failures
- **Blind orchestration** — cron-based scheduling guessing at data readiness instead of reacting to it
- **Dual-engine complexity** — a second specialized engine (e.g., Flink) bolted on for low-latency streaming

## Capability quick reference

| Capability | Lesson | Solves | Real published spec |
|---|---|---|---|
| Zerobus Ingest | 36 | Message-bus hop for high-volume event ingestion | <5 sec latency, 100 MB/sec per client, thousands of concurrent clients |
| Lakebase | 37 | Reverse-ETL for operational/transactional workloads | Continuous sync: 10-15 sec lag; `ForeachWriter` real-time mode: 200-300 ms |
| Auto Loader with File Events | 38 | Blind, time-based orchestration | Reacts to actual file-arrival events |
| Real-Time Mode for Spark Declarative Pipelines | 39 | Dual-engine complexity for ultra-low-latency streaming | Removes the need for a bolted-on second engine (e.g., Flink) |
| Lakeflow Designer | 40 | Authoring burden for non-code-first builders | Visual, context-aware pipeline authoring |
| Agent Bricks & Document Intelligence | 41 | Unstructured document processing at scale | Agent-driven extraction grounded in Unity Catalog context |
| Genie Code & Genie ZeroOps | 42 | Authoring and operating/troubleshooting, respectively | Operate directly on Unity Catalog's lineage and governance |

## Why this requires a unified foundation

> An agent can write flawless Python and still fail if it doesn't know which upstream definition of
> "revenue" to use.

A generic coding agent has no access to a lineage graph, no idea which of several same-named columns
across schemas is canonical, and no visibility into governance policy. Every capability above is
built directly into the platform that already holds Unity Catalog's lineage and governance (Chapter
1), rather than bolted on from outside — which is exactly why none of them work as a standalone
product disconnected from that foundation.

## The real end-to-end architecture pattern (Zerobus -> Lakebase -> app)

```
1. Producer writes events directly to a Delta table via the Zerobus SDK (no message bus)
2. A continuous sync pipeline pushes updated records from Delta into Lakebase (Postgres)
3. An application backend connects to Lakebase for low-latency operational reads
4. A front end visualizes the live data for end users
```

This is Databricks' own published "Data Diners" pattern (food-delivery driver-location tracking),
generalizable to any case where lakehouse-curated data needs to reach an operational app without a
hand-built reverse-ETL pipeline.

## Related course material

- Lesson 35 — Agentic Data Engineering: The New Paradigm
- Lesson 36 — Zerobus Ingest
- Lesson 37 — Lakebase
- Lessons 38-42 — Auto Loader with File Events, Real-Time Mode, Lakeflow Designer, Agent Bricks, Genie Code & ZeroOps
