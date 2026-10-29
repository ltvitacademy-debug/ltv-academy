# Lesson 7 — Application Insights for Tracing Real Application Performance

**Chapter 2 · Azure Monitor & Log Analytics in Depth · Lesson 3 of 4**

## What you'll learn

- What Application Insights actually is: Azure Monitor's
  application-performance-monitoring (APM) feature, not a separate
  product
- The two ways telemetry gets collected — SDK-based auto-instrumentation
  and codeless (agent-based) monitoring — and what each one captures
- The core tables Application Insights writes to, and how to query
  them with the same KQL from Lesson 6
- How to correlate a failed request to the exact dependency call that
  caused it, using the field every row shares: `operation_Id`

## Application Insights is Azure Monitor, aimed at one application

Application Insights isn't a separate monitoring product — it's
Azure Monitor's lens for a single running application: what requests
came in, how long each one took, what that request called out to, and
what broke along the way. Under the hood, Application Insights data
lands in the same kind of Log Analytics-backed workspace as everything
in Lesson 6, in a dedicated set of tables, queryable with the identical
KQL you just learned.

Getting telemetry flowing happens one of two ways. **SDK-based
instrumentation** adds a package to the application's code and a
connection string that tells it which Application Insights resource to
report to — this gives the richest detail, including custom events and
properties you add yourself. **Codeless monitoring** (an agent
attached at the platform level, for example on an App Service or a VM)
captures the same core signals — requests, dependencies, exceptions —
without touching the application's source code at all, at the cost of
some of that custom-detail flexibility.

## The core tables: requests, dependencies, exceptions, traces

Four tables carry most of the weight:

- **`requests`** — every inbound call the application handled: its
  name, duration, response code, and whether it succeeded.
- **`dependencies`** — every outbound call the application made: a
  database query, an HTTP call to another service, a cache lookup —
  with its own duration and success flag.
- **`exceptions`** — unhandled exceptions, with the stack trace.
- **`traces`** / **`customEvents`** — whatever the application logged
  explicitly, plus anything you instrumented by hand.

```kql
requests
| where timestamp > ago(1h)
| summarize RequestCount = count(), AvgDuration = avg(duration) by name
| order by AvgDuration desc
```

That's the Application Insights equivalent of the `Perf` query from
Lesson 6 — same `summarize`/`order by` shape, different table, now
answering "which endpoint is slowest right now."

## Correlating a failure to its cause with `operation_Id`

Every row that Application Insights writes for a single logical
request — the inbound `requests` row and every `dependencies` row it
triggered along the way — shares the same `operation_Id`. That shared
ID is what turns isolated rows into one connected story:

```kql
dependencies
| where success == false
| where timestamp > ago(24h)
| summarize FailureCount = count() by target, type
| order by FailureCount desc
```

That finds *which* downstream dependency is failing most often. To
see the full story for one specific slow request, you'd pull its
`operation_Id` from `requests` and filter every other table to that
same ID — reconstructing the exact call chain for that one request,
the same way Lesson 1's trace walked through `inventory-service`
dominating a 402ms span, except now it's real data from a real
application instead of an illustration.

## Live Metrics and the Application Map

Two features build on top of this data without you writing a query at
all. **Live Metrics** streams requests, dependencies, and exceptions
with sub-second latency — useful for watching a deployment roll out in
real time. The **Application Map** visualizes every component the
application talks to and its dependencies as a diagram, with failure
rates and average durations annotated on each connection, so you can
spot which downstream service is dragging everything else down before
you write a single KQL query.

## Key terms

| Term | Meaning |
|---|---|
| Application Insights | Azure Monitor's APM feature for a single application: requests, dependencies, exceptions, traces |
| SDK-based instrumentation | Adding a package + connection string to application code for the richest, most customizable telemetry |
| Codeless monitoring | An agent at the platform level capturing core signals with no code changes |
| `requests` table | Every inbound call handled by the application, with duration and success status |
| `dependencies` table | Every outbound call the application made, with duration and success status |
| `operation_Id` | The shared identifier linking every telemetry row from a single logical request across all Application Insights tables |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what
field lets you reconstruct the full story of one slow request across
the `requests`, `dependencies`, and `exceptions` tables, and what's the
real difference between SDK-based and codeless Application Insights
monitoring?
