# Lesson 14 — Lineage Architecture

**Chapter 3 · Metadata and Catalog Architecture · Lesson 14 of 30**

## What you'll learn

- The difference between table-level and column-level lineage, and why the granularity you choose changes your architecture significantly
- Three real ways lineage actually gets captured: query log parsing, static code parsing, and runtime instrumentation
- OpenLineage as an example of a vendor-neutral standard for emitting lineage events
- Why lineage is fundamentally a graph-traversal problem, and what that means for how you store it

## Table-level vs. column-level lineage

- **Table-level lineage** records that "table B was built from table A" — coarse, relatively cheap to capture, and good enough for a first pass at impact analysis ("if table A breaks, table B is at risk").
- **Column-level lineage** records that "column B.customer_name was built from A.cust_nm, via a rename," down to the individual field. Far more useful for precise impact analysis — "if I drop this one column, these three specific downstream columns break" — but dramatically more expensive to capture, because the architecture has to actually parse the transformation logic itself, not just note that a job ran and touched two tables.

Most real architectures start with table-level lineage, because it's achievable quickly and broadly, and add column-level lineage selectively for the highest-value or highest-risk pipelines rather than attempting it everywhere at once.

## Three ways lineage actually gets captured

- **Query log parsing** — after the fact, parse the SQL query history a warehouse or database already keeps, reconstructing what read from what and wrote to what. Cheap and retroactive — it works on history you already have — but limited to whatever's expressible and visible in the logged SQL text itself.
- **Static code parsing** — parse pipeline code (SQL files, transformation models, job definitions) before it even runs, building lineage directly from the code's own structure. This catches lineage for things that haven't executed yet, but struggles when the real transformation logic is decided dynamically at runtime rather than written plainly in the code.
- **Runtime instrumentation** — an agent or library embedded in the pipeline framework itself emits lineage events as a job actually executes. This captures what truly happened, including dynamic logic static parsing would miss, at the cost of needing that instrumentation present in every framework you want covered.

## OpenLineage: a standard for emitting lineage events

OpenLineage is an open, vendor-neutral specification for lineage events: which job ran, as part of which run, consuming which input datasets, producing which output datasets, and when. Its core event fields include `eventType` (the run's stage, such as `START` or `COMPLETE`), `eventTime`, a `run` object carrying a unique `runId`, a `job` object identifying the work being done, and `inputs`/`outputs` arrays listing the datasets involved. Several real tools in this catalog's own path — dbt, Spark, and Airflow among the ecosystem's integrations — can emit OpenLineage-formatted events, which means a lineage store can receive consistent events from different tools without needing a bespoke parser written for each one.

```
{
  "eventType": "COMPLETE",
  "eventTime": "2026-10-05T09:15:00Z",
  "run": { "runId": "a1b2c3d4-1111-2222-3333-444455556666" },
  "job": { "namespace": "analytics", "name": "build_customer_orders" },
  "inputs": [{ "namespace": "warehouse", "name": "raw.orders" }],
  "outputs": [{ "namespace": "warehouse", "name": "analytics.customer_orders" }]
}
```

This snippet is an illustrative example built around OpenLineage's real, documented field names (`eventType`, `eventTime`, `run.runId`, `job`, `inputs`, `outputs`) — the values themselves are invented for this lesson, not a captured real event.

## Why lineage is a graph problem

Lineage questions — "show everything downstream of this column," "show everything that could have contributed to this report being wrong" — are traversals across a directed graph of assets and transformations, the same point Lesson 12 made about metadata generally, sharpened specifically for lineage. A storage layer that can only answer "what does this one table point to" one hop at a time will struggle the moment a real question needs five or six hops traced automatically.

## Key terms

| Term | Meaning |
|---|---|
| Table-level lineage | Lineage recorded at the whole-table level: table B was built from table A |
| Column-level lineage | Lineage recorded down to individual fields, including the transformation applied |
| Query log parsing | Reconstructing lineage after the fact from a system's existing SQL query history |
| Runtime instrumentation | An agent embedded in a pipeline framework that emits lineage events as a job executes |
| OpenLineage | An open, vendor-neutral specification for emitting standardized lineage events |

## Lab

Pick one pipeline or report you rely on (work or personal). Without any tooling, write out its lineage by hand, two hops upstream and one hop downstream: what feeds it, what that in turn is fed by, and what consumes its output. Note whether you could answer this at the column level or only at the table level — that gap is exactly what Lesson 14's architecture choice is about.

## Check yourself

Can you explain the cost difference between table-level and column-level lineage, name the three ways lineage actually gets captured, and say why a lineage store needs to support multi-hop graph traversal rather than single-hop lookups?
