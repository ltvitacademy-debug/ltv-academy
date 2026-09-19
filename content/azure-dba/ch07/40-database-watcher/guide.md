# Lesson 40 — Database Watcher

**Chapter 7 · Monitoring Azure SQL · Lesson 40 of 95**

## What you'll learn

- What Database Watcher actually is, and the gap it fills that per-database
  dashboards don't
- How it's architected: watcher, SQL targets, and data store
- What its dashboards show you, at the estate level and the resource level
- Its current status — it's a real, newer capability, but still in preview

## The gap: one database vs. an entire estate

Azure Monitor (Lesson 39) and the DMVs later in this chapter are built
around one resource at a time — you open one database's metrics, or
query one database's DMVs. That's fine when you're chasing one incident.
It falls apart the moment you're responsible for dozens or hundreds of
databases and need to answer "which of my databases needs attention right
now" as a single question. That's the specific gap **database watcher**
fills.

## What database watcher is

Database watcher is a managed monitoring solution, currently in
**preview**, for Azure SQL Database and Azure SQL Managed Instance. It
collects in-depth monitoring data — from more than 70 SQL system catalog
views and dynamic management views — from every database, elastic pool,
or managed instance you register as a **SQL target**, and centralizes
that data so you get a single-pane-of-glass view across your whole Azure
SQL estate instead of one dashboard per resource.

## How it's put together

Three pieces, and you configure all three when you create a watcher:

1. **Watcher** — the resource you create in your subscription; it's free
   to create, and it's what you start/stop to control data collection.
2. **SQL targets** — the databases, elastic pools, or managed instances
   you register for monitoring. A single watcher supports up to 100
   targets, and targets can span subscriptions within the same Microsoft
   Entra tenant.
3. **Data store** — where the collected data actually lands: either an
   Azure Data Explorer cluster (built for fast time-series ingestion and
   analytics — a single cluster can scale to thousands of monitored
   resources) or Real-Time Analytics in Microsoft Fabric.

Data lands in the store with single-digit-second latency, not the
several-minute delay typical of standard platform metrics, and you can
query it directly with KQL or T-SQL for custom analysis beyond what the
built-in dashboards show.

## What the dashboards actually show

Database watcher renders its dashboards as Azure Workbooks, in two tiers:

- **Estate dashboards** — a heatmap across your whole registered fleet
  (e.g. by CPU utilization), plus a top-queries view ranking the worst
  offenders across every monitored database at once, with subscription
  and resource-group filters to narrow the view.
- **Resource dashboards** — the detailed drill-down for one target:
  active sessions, wait statistics, backup history, index metadata,
  storage consumption, and more — essentially a curated front end over
  the same categories of DMV data covered later in this chapter.

Alert rule templates are also available (added to database watcher in
early 2025), so you can raise Azure Monitor alerts off watcher-collected
data, not just off the standard per-resource platform metrics.

## Be honest about its current state

Database watcher is genuinely useful and is a real, shipped Azure SQL
capability — but it is still in **preview** as of this course. Preview
features can change, carry different support terms, and have listed
limitations (for example, alerting isn't available with every data-store
option, and it's only available in a defined set of Azure regions today).
Before relying on it in a production runbook, check Microsoft's current
documentation for the latest supported regions, limits, and feature
state — preview capabilities are exactly the kind of thing worth
re-verifying rather than assuming from memory.

## Key terms

| Term | Meaning |
|---|---|
| Database watcher | A managed, fleet-wide monitoring solution (preview) for Azure SQL Database and Managed Instance |
| SQL target | A database, elastic pool, or managed instance registered to a watcher for monitoring |
| Data store | Where watcher-collected data is stored — an Azure Data Explorer cluster or Fabric Real-Time Analytics |

## Check yourself

You're ready for Lesson 41 when you can explain: what specific problem
does database watcher solve that a per-database Azure Monitor dashboard
doesn't, and what are the three pieces you configure to set one up?
