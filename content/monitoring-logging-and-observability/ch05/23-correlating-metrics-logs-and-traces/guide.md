# Correlating Metrics, Logs & Traces

You now have all three pillars on the table: metrics tell you *something* is wrong, logs tell you *what* happened, and traces tell you *where* the time went. Used in isolation, each one answers a narrow question. Used together — jumping from one signal straight into the next, without re-typing a query by hand — they turn a vague alert into a root cause in minutes instead of hours. This lesson walks through exactly that jump, using Northbridge Retail's flash-sale checkout incident as the thread.

## What you'll learn

- The order engineers actually move through the three pillars during a real investigation
- What a trace ID has to appear in for correlation to work at all
- How a real tool (Grafana Explore) turns a log line into a one-click jump to its trace
- Why this only works if Lesson 20's structured-logging discipline was followed in the first place

## The investigation, pillar by pillar

A flash sale starts at Northbridge Retail. Here's the realistic order an on-call engineer moves through:

1. **Metric fires an alert** — the Golden Signals dashboard from Chapter 1 shows checkout p99 latency climbing past the SLO from a Grafana panel built in Chapter 4. This tells you *something* is wrong and roughly *when* it started — nothing more yet.
2. **Logs narrow the "what"** — jump into Loki or Kibana (Lesson 21) and filter to `service="checkout"` around that timestamp. You find a cluster of `error` lines with `event: payment_timeout`, each one carrying a `trace_id` field.
3. **A trace shows the "where"** — take one of those trace IDs into Jaeger or Tempo (Lesson 22) and open the waterfall. It's not the payment gateway itself that's slow — it's a `mysql SELECT` nested three calls deep, inside a database connection pool that's exhausted because checkout traffic tripled in the last five minutes.

Three pillars, three different questions, one shared identifier making the handoff instant.

## The field that makes the jump possible

None of this works without one small discipline: **every structured log line has to carry the same `trace_id` the tracing system assigned to that request.** Most OpenTelemetry language SDKs do this automatically — when a log statement executes inside an active span, the SDK injects that span's trace ID into the log record:

```json
{"timestamp":"2026-10-06T14:32:07.481Z","level":"error","service":"checkout",
 "event":"payment_timeout","order_id":991820,
 "trace_id":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"}
```

That `trace_id` is the same value stamped on every span in the matching trace. It's the direct descendant of the hand-rolled `correlation_id` from Lesson 20 — same job, standardized and propagated automatically by the OTel SDK instead of by hand.

## Seeing it in a real tool

Grafana's Explore view puts this correlation directly in the UI: open a log line's detail panel, and if a `trace_id`-shaped field is present, Grafana renders it as a clickable link straight into the matching trace in Tempo (or another configured tracing backend) — no copy-pasting an ID between two different tools.

![Grafana Explore's expanded log line detail panel: a log entry with a traceID field and a list of indexed fields below it, ending in a "Links" section with a "TraceID" row showing the trace ID value next to a blue "Tempo" button that jumps straight to that trace.](/courses/monitoring-logging-and-observability/ch05/23-correlating-metrics-logs-and-traces/grafana-log-trace-link.png)
*The "Tempo" button under Links is the whole payoff of this lesson — one click from a log line straight into its trace, because both carry the same trace ID.*
Source: [Grafana Documentation — Logs in Explore](https://grafana.com/docs/grafana/latest/explore/logs-integration/)

Many Grafana dashboards take this further in the other direction too: a metrics panel showing elevated latency can be configured with an "exemplar" — a data point on the graph linking directly to one trace that represents that exact spike, closing the loop from metric straight to trace without logs as a middle step at all.

## Why this matters beyond one incident

Correlated signals compound: the faster an engineer gets from "alert fired" to "root cause," the shorter the incident, which is the whole point of the error budgets and SLOs from Chapter 1. None of it is possible without the groundwork — structured logs with a trace ID field (Lesson 20), a centralized place to search them (Lesson 21), and a tracing system producing those IDs in the first place (Lesson 22). Correlation isn't a fourth tool to buy; it's what you get for free when the first three are done right.

## Key terms

- **Correlation (observability)** — linking a metric, a log line, and a trace that all describe the same event, via a shared identifier
- **Trace ID propagation into logs** — OpenTelemetry SDKs automatically stamping the active span's trace ID onto log lines written during that span
- **Exemplar** — a data point on a metrics graph linking directly to a representative trace for that point
- **Grafana Explore** — Grafana's ad-hoc investigation view, used here to jump from a log line to its trace via a data link
