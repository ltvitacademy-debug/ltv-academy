# Lesson 5 — Azure Monitor: Metrics vs. Logs, and Where Each One Lives

**Chapter 2 · Azure Monitor & Log Analytics in Depth · Lesson 1 of 4**

## What you'll learn

- What Azure Monitor actually is: the umbrella platform, not a single
  tool, that every other Azure monitoring feature sits on top of
- The real architectural difference between **metrics** and **logs**
  in Azure Monitor — where each one is stored, how it gets there, and
  why that storage choice drives everything else about how you use it
- What a **diagnostic setting** does, and why most resource logs are
  invisible until you configure one
- How to decide, for a given question, whether you reach for Metrics
  Explorer or a Log Analytics query

## Azure Monitor is the platform, not one dashboard

Azure Monitor isn't a single pane of glass — it's the collection
platform underneath nearly everything you'll touch in this chapter and
the next two: Log Analytics, Application Insights, Container Insights,
alerts, and workbooks are all features built on top of the same two
underlying data stores. Understanding those two stores — and which one
a given piece of telemetry lands in — is what makes the rest of this
chapter make sense instead of feeling like a pile of unrelated tools.

## The metrics store: numeric, time-series, near-real-time

Azure Monitor Metrics is a dedicated time-series database, separate
from Log Analytics, purpose-built for one thing: numeric values
collected at regular intervals and indexed by timestamp. Most Azure
resources emit **platform metrics** automatically, with no
configuration required — a VM's `Percentage CPU`, a storage account's
transaction count, an App Service's response time are all collected by
the platform itself at a default one-minute frequency. Because the
data is purely numeric and pre-aggregated, it's cheap to store and
fast to query, which is exactly why metrics are what you alert on and
what you put on a live dashboard — Metrics Explorer can render a chart
across dozens of resources in seconds.

The trade-off is that metrics are narrow by design. A metric is a
number with a timestamp and a small set of dimensions (resource,
region, instance) — it can tell you *that* CPU spiked at 2:14 PM, but
it has no room to carry a stack trace, a request ID, or free-text
detail. For that, you need the other store.

## The logs store: a Log Analytics workspace

**Log Analytics** is the query and storage engine for everything that
isn't a clean numeric time series: structured records with arbitrary
shape, queried with **KQL** (Kusto Query Language, the subject of
Lesson 6). Data lands in a **Log Analytics workspace** — the container
resource you provision once per environment — organized into tables:
`AzureActivity` (every control-plane operation across a subscription),
`Perf` (performance counters, when the Azure Monitor agent is
collecting them), `Event` (Windows event logs), `Heartbeat` (agent
health), and custom `_CL` tables for anything you ingest yourself.

Unlike platform metrics, most **resource logs** (sometimes called
diagnostic logs — the data-plane detail a specific resource type
emits, like a SQL Database's query store or an NSG's flow logs) don't
automatically land anywhere. You have to tell Azure Monitor where to
send them.

## Diagnostic settings: the pipe that actually moves the data

A **diagnostic setting** is the configuration object, attached to a
specific resource, that says "send these log categories and these
metric categories to this destination." Destinations include a Log
Analytics workspace, a Storage account (for cheap long-term archive),
an Event Hub (for streaming to a third-party SIEM), or a partner
solution. Without a diagnostic setting configured on a resource, most
of its resource-level logs are simply never captured anywhere queryable
— this is the single most common reason a team "has Azure Monitor" but
still can't answer a basic operational question: the diagnostic
setting routing that specific resource's logs into the workspace was
never created.

The one exception is the **Activity Log**, which Azure retains and
exposes for 90 days automatically at the subscription level with no
diagnostic setting needed — it's always there if you need to see who
deleted a resource group last Tuesday.

## Choosing between Metrics Explorer and a log query

In practice the decision is about what question you're asking:

- **"Is something wrong right now, across many resources?"** →
  Metrics Explorer. Cheap, fast, good for live dashboards and
  high-frequency alert rules (can evaluate every minute).
- **"What exactly happened, and can I slice it any way I want?"** →
  a Log Analytics (KQL) query. More expensive and higher latency
  (data typically lands within a few minutes, not seconds), but it
  can join across tables, filter on any field, and answer a question
  nobody built a chart for in advance.

Both approaches can back an alert rule — a **metric alert** evaluates
a numeric threshold on a fast cadence; a **log alert** (scheduled
query rule) runs a KQL query on a schedule you choose, trading some
latency for far richer conditions.

## Key terms

| Term | Meaning |
|---|---|
| Azure Monitor | The umbrella platform; Log Analytics, Application Insights, Container Insights, and alerts all sit on top of it |
| Platform metric | A numeric, pre-aggregated time-series value collected automatically for most resources, no configuration needed |
| Log Analytics workspace | The queryable store for structured log data, organized into tables, queried with KQL |
| Diagnostic setting | The per-resource configuration that routes resource logs/metrics to a workspace, storage account, or Event Hub |
| Activity Log | The subscription-level record of every control-plane (write) operation, retained 90 days automatically |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does a resource's detailed logs sometimes simply not show up in your
Log Analytics workspace, and what specific configuration object fixes
that?
