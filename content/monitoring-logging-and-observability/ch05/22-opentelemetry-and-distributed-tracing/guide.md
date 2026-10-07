# OpenTelemetry & Distributed Tracing

Correlation IDs (Lesson 20) tell you which log lines belong to the same request. They don't tell you *how long* each step took, or *which* service was actually slow. If Northbridge Retail's checkout latency spikes during a flash sale, "the request was slow" isn't enough — you need to know whether it was the inventory check, the payment call, or a database query three layers deep. That's what **distributed tracing** answers, and **OpenTelemetry (OTel)** is the vendor-neutral standard almost every modern stack uses to produce it.

## What you'll learn

- How a trace is built from spans, and how spans nest into a parent-child tree
- What OpenTelemetry actually standardizes, and why that matters
- How to read a trace waterfall view to find the slow step
- Where Jaeger and Grafana Tempo fit as trace backends

## Spans and traces

A **span** represents one unit of work — one HTTP call, one database query, one function — with a start time, a duration, and a set of key-value **attributes** describing it. A **trace** is the full tree of spans created while handling one request, linked by a shared **trace ID**, with each span pointing to its parent span.

```json
{
  "trace_id": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  "span_id": "f1e2d3c4b5a69788",
  "parent_span_id": "0011223344556677",
  "name": "POST /checkout",
  "start_time": "2026-10-06T14:32:06.112Z",
  "duration_ms": 1340,
  "attributes": {
    "service.name": "checkout",
    "http.method": "POST",
    "http.status_code": 200,
    "northbridge.order_id": 991820
  }
}
```

This is the same idea as the correlation ID from Lesson 20, but formalized and automatic: every span in a trace carries the same `trace_id`, and the `parent_span_id` reconstructs the full call tree — not just "these log lines are related" but "this exact call happened inside that exact call, and took this long."

## What OpenTelemetry standardizes

Before OpenTelemetry, every tracing vendor (and several metrics and logging vendors) shipped its own SDK, its own data format, and its own wire protocol — instrumenting code meant locking into one vendor. **OpenTelemetry** is a CNCF project that standardizes three things:

- **APIs and SDKs** — the code you call from your application (in Python, Java, Go, Node, and more) to create spans, independent of which backend will store them
- **A wire protocol (OTLP)** — how spans get exported from your application to a collector or backend
- **The OpenTelemetry Collector** — an optional, vendor-neutral pipeline that can receive, process, and route telemetry to one or more backends

The payoff: Northbridge's team can instrument the checkout service once with the OTel SDK, and send the resulting traces to Jaeger, Grafana Tempo, or a commercial APM vendor without changing any application code — only the exporter configuration.

## Reading a trace waterfall

Trace backends like **Jaeger** and **Grafana Tempo** visualize a trace as a waterfall: one horizontal bar per span, nested under its parent, positioned and sized by start time and duration.

![Jaeger's trace detail view for a "frontend: HTTP GET /dispatch" trace: a waterfall of nested horizontal bars, one per span, grouped by service (frontend, customer, driver, route, redis, mysql), each bar's width proportional to its duration and position showing when it started relative to the trace's 732ms total.](/courses/monitoring-logging-and-observability/ch05/22-opentelemetry-and-distributed-tracing/jaeger-trace-waterfall.png)
*The widest bars are the slowest spans — here, the `mysql SQL SELECT` span under `customer` takes 304ms of the trace's 732ms total, an obvious place to start investigating.*
Source: [Jaeger Documentation](https://www.jaegertracing.io/docs/latest/)

Before you get to one trace, you typically search for it — by service, by minimum duration, or by trace ID if you already have one from a log line:

![Jaeger's Find Traces search page: a service/operation filter panel on the left, a scatter plot of trace durations over time at top, and a results list below showing matching traces with service breakdowns and timestamps.](/courses/monitoring-logging-and-observability/ch05/22-opentelemetry-and-distributed-tracing/jaeger-traces-search.png)
*Filtering by service and a minimum duration is how you'd hunt down the slowest checkout requests during a flash sale, without knowing a specific trace ID yet.*
Source: [Jaeger Documentation](https://www.jaegertracing.io/docs/latest/)

Reading a waterfall is mostly about width and nesting: a wide bar is a slow span; a span nested deep under several parents shows exactly which call chain led to it; gaps between spans (rather than within them) often point to queueing or network latency rather than the work itself being slow.

## Key terms

- **Span** — one unit of work in a trace, with a start time, duration, and attributes
- **Trace** — the full tree of spans sharing a trace ID, representing one request end to end
- **Trace ID / span ID / parent span ID** — the identifiers that link spans into a trace and reconstruct the call tree
- **OpenTelemetry (OTel)** — the CNCF standard for instrumenting applications to produce traces, metrics, and logs, independent of backend vendor
- **OTLP** — OpenTelemetry's wire protocol for exporting telemetry data
- **Trace waterfall** — a visualization of a trace as nested horizontal bars, sized by duration, used to spot the slowest span
