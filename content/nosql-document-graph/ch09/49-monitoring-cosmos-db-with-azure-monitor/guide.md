# Monitoring Cosmos DB with Azure Monitor

Every Cosmos DB account integrates natively with Azure Monitor, the same platform-wide
observability service used across Azure resources. For a DBA moving from watching SQL
Server DMVs and Extended Events to watching a PaaS database, this lesson covers what's
actually available: the metrics worth watching, and the diagnostic logs that capture
per-request detail.

## What you'll learn

- The core metrics Azure Monitor surfaces for Cosmos DB, especially RU consumption
- What diagnostic logs capture that metrics alone don't
- How to route this data to Log Analytics for real querying and alerting

## Metrics: the account-level pulse

Azure Monitor collects metrics automatically for every Cosmos DB account, visible under
**Metrics** in the portal or queryable via the Azure Monitor Metrics API. The ones that
matter most day to day:

- **Total Request Units** — RU consumption over time, sliced by database, container, or
  operation type; this is the single most important metric for a Cosmos DB workload,
  the rough equivalent of watching CPU/IO on a SQL Server instance
- **Normalized RU Consumption** — the percentage of provisioned throughput actually being
  used, which is the fastest way to see whether a container is under-provisioned (running
  hot, near 100%) or over-provisioned (wasting money)
- **Total Requests** — request volume, broken down by status code, making it easy to spot a
  spike in `429` (throttled) or `404`/`400` responses
- **Server Side Latency** — how long Cosmos DB itself took to process a request, useful for
  separating "the database is slow" from "the network or client is slow"
- **Storage** — data and index storage consumed per container

These are all available as **alerts**: a metric alert can page someone when normalized RU
consumption crosses 90% sustained, or when the 429 rate spikes, the same instinct as a SQL
Server alert on a busy waits threshold or low disk space.

## Diagnostic logs: per-request detail

Metrics tell you *that* something happened; **diagnostic logs** tell you what actually
happened, request by request. Cosmos DB supports sending diagnostic logs to a **Log
Analytics workspace**, Azure Storage, or an Event Hub, and the log categories include:

- **DataPlaneRequests** — every individual data-plane operation (read, write, query),
  including the RU charge, status code, and duration of that specific request
- **QueryRuntimeStatistics** — detailed execution statistics for SQL API queries, useful for
  understanding why a specific query is expensive
- **ControlPlaneRequests** — account-level management operations (creating a container,
  changing throughput, updating an indexing policy)

Once routed to Log Analytics, this data becomes queryable with **Kusto Query Language
(KQL)** — for example, finding the top 10 most RU-expensive queries in the last hour, or
every request that returned a 429 broken down by partition key range. This is the closest
Cosmos DB equivalent to querying `sys.dm_exec_query_stats` in SQL Server: instead of
guessing what's expensive, you query the actual request history.

## Putting it together

A reasonable baseline for a production Cosmos DB account: enable diagnostic settings to
route logs to Log Analytics, set alerts on normalized RU consumption and 429 rate, and
build a small Log Analytics dashboard or workbook surfacing RU trends per container. None of
this requires third-party tooling — it's the built-in Azure-native path, and it's the
foundation the next lesson (diagnosing throttling) builds directly on.

## Key terms

| Term | Meaning |
|---|---|
| Total Request Units | The core Cosmos DB metric — RU consumption over time, sliced by container/operation |
| Normalized RU Consumption | Percentage of provisioned throughput actually used; the fastest signal for under/over-provisioning |
| Diagnostic logs | Per-request detail (DataPlaneRequests, QueryRuntimeStatistics) routable to Log Analytics, Storage, or Event Hubs |
| KQL (Kusto Query Language) | The query language used to analyze Cosmos DB diagnostic logs once they're in Log Analytics |

## Check yourself

What's the practical difference between what Azure Monitor's metrics tell you about a
Cosmos DB account and what diagnostic logs tell you, and why would you need both?
