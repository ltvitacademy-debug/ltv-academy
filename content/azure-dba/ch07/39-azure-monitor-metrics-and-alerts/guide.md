# Lesson 39 — Azure Monitor, Metrics & Alerts

**Chapter 7 · Monitoring Azure SQL · Lesson 39 of 95**

## What you'll learn

- How Azure Monitor applies specifically to a SQL database's metrics
- The core metrics you'll actually watch on an Azure SQL resource
- How to build an alert rule: signal, condition, and action group
- The real gap between "a metric crossed a threshold" and "knowing why"

## Azure Monitor, applied to SQL

If you took Azure Fundamentals, you already know Azure Monitor exists
platform-wide — it's the same collection and alerting service sitting
behind every Azure resource, from VMs to storage accounts to App
Services. Nothing about the service itself changes here. What's new in
this lesson is applying it specifically to a SQL database's metrics: the
signals Azure SQL emits, and what a DBA actually watches day to day.

## The metrics that matter for a SQL database

Every Azure SQL Database and Managed Instance emits metrics automatically
to Azure Monitor at no extra cost — no agent to install, no configuration
required to start collecting.

| Metric | What it tells you |
|---|---|
| `dtu_consumption_percent` (DTU model) or CPU percentage (vCore model) | How much of the provisioned compute is being used right now |
| `storage_percent` | How full the database is relative to its provisioned max size |
| `connection_successful` / `connection_failed` | Whether clients are actually able to connect — a spike in failures often shows a problem before query performance does |
| `deadlock` | Count of deadlocks in the period — should normally sit at or near zero |

These are exactly the kind of numbers a baseline (Lesson 38) gives you
context for. 80% DTU means something different on a database whose
baseline is 40% than one whose baseline is 75%.

## Building an alert rule

An alert rule has three parts, and Azure Monitor asks for them in this
order:

1. **Signal** — pick the metric (e.g. `dtu_consumption_percent`) and the
   resource it applies to.
2. **Condition** — the threshold and the aggregation window, e.g.
   "average > 80% over a 5-minute period."
3. **Action group** — what actually happens when the condition fires:
   an email, an SMS, a webhook into a paging tool, or an Azure Function.

Without an action group, an alert rule fires silently into the void — the
condition and the notification are two separate, both-required pieces.

## The real gap: threshold crossed vs. knowing why

An alert that fires because DTU crossed 90% tells you exactly one thing:
DTU crossed 90%. It does not tell you which query is driving it, which
session opened it, or whether it's one runaway report or a genuine
traffic increase. That gap is deliberate — Azure Monitor's job is to tell
you *that* something needs attention, fast and cheaply. Finding out *why*
is a separate step, and it's exactly what the DMVs and Extended Events in
the rest of this chapter are for.

## Key terms

| Term | Meaning |
|---|---|
| Signal | The specific metric an alert rule watches |
| Action group | The set of notifications/actions Azure Monitor triggers when an alert condition is met |
| DTU consumption percent | The DTU-model metric showing compute utilization as a percentage of the provisioned tier |

## Check yourself

You're ready for Lesson 40 when you can explain: what are the three parts
of an Azure Monitor alert rule, and why does a fired alert tell you *that*
something's wrong but not automatically *why*?
