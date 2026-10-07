# Capstone: Build It

You have a plan from Lesson 29. Now you execute it: instrument the service, build the dashboard, write the alerts. This lesson walks through the build in the same order you should actually do it — metrics first, then logs, then a trace, then the dashboard, then alerts last, because alerts without working dashboards to validate them are just guesses.

## What you'll learn

- The build order that avoids wasted rework: metrics, logs, trace, dashboard, then alerts
- What a minimal but genuinely useful metrics instrumentation looks like
- How to build a dashboard with 4–6 panels that actually earn their place
- How to turn your Lesson 29 alert plans into real, working alert rules

## Step 1: instrument metrics

Add a Prometheus client library (or your cloud SDK's metrics equivalent) to your service and expose, at minimum: a request counter labeled by endpoint and status code, a request duration histogram, and one saturation metric relevant to your dependency (connection pool in-use count, queue depth). This is the same golden-signals shape from Lesson 4 — you're not inventing a new framework, you're applying the one you already learned.

## Step 2: structured logs

Switch (or confirm) your logs are structured JSON (Lesson 20), and make sure every log line that represents a single request or job run includes a correlation ID so you can find every log line for one specific request. Log at the boundaries: when a request comes in, when it calls its dependency, when it finishes (with duration and outcome).

## Step 3: a basic trace

You don't need a full distributed tracing backend for a single service with one dependency — but wrap the call to that dependency in a span (OpenTelemetry, Lesson 22) so you can see, per request, how much of the total time was spent waiting on it. This is the smallest version of what Lesson 23 called correlating signals: a trace ID that also appears in your logs for that request.

## Step 4: the dashboard

Build 4–6 panels, no more — a wall of 20 panels nobody reads is worse than a focused one nobody has to hunt through. A solid minimal set:

1. Request rate (traffic)
2. p50/p95/p99 latency (latency)
3. Error rate by status code (errors)
4. Saturation on your one dependency (saturation)
5. A breakdown by endpoint or job type, if you have more than one
6. (Optional) a log-derived panel, like top error messages in the last hour

## Step 5: alert rules, from your Lesson 29 plan

```
# Example: symptom-based, actionable
alert: ServiceP99LatencyHigh
expr: histogram_quantile(0.99, rate(
  http_request_duration_seconds_bucket[5m])) > 1.5
for: 5m
labels: { severity: page }
annotations:
  summary: "p99 latency over 1.5s for 5 minutes"
  runbook: "docs/runbook-latency.md"
```

Write 2–3 of these, one per golden signal you decided mattered most in Lesson 29. Each should reference a real threshold you derived from watching your own service's normal behavior for a bit — not a guess, and not copied from a tutorial. Link a short runbook (Lesson 26's format) for each, even a three-line one.

## Key terms

- **Correlation ID** — an identifier included in logs (and traces) that ties every record for one request together
- **Span** — a single timed unit of work within a trace, such as a call to a dependency
- **Minimal viable dashboard** — a small number of panels that each answer a specific golden-signal question, not an exhaustive wall of metrics
