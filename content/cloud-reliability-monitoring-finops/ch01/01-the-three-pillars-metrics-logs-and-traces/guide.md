# Lesson 1 — The Three Pillars: Metrics, Logs, and Traces

**Chapter 1 · Cloud Observability Fundamentals · Lesson 1 of 4**

## What you'll learn

- Why "monitoring" and "observability" aren't the same thing, and what
  observability actually buys you on top of a dashboard full of charts
- What each of the three pillars — metrics, logs, and traces — is
  actually good at, and just as important, what each one is bad at
- Why you need all three together on a production incident, not just
  your favorite one
- How the three pillars fit the systems you already know from
  Terraform and Kubernetes: a Deployment rolling out, a pod crash
  looping, a load balancer's backend going unhealthy

## Monitoring tells you something; observability lets you ask anything

You already know how to stand up infrastructure with Terraform and run
workloads on Kubernetes. The next skill is knowing what's actually
happening inside that infrastructure once real traffic hits it.
**Monitoring** is watching a known set of signals against known
thresholds — CPU over 80%, pod restarts over 3, p99 latency over
500ms — and alerting when one crosses the line. It answers questions
you thought to ask in advance.

**Observability** is the broader property of a system: can you
answer a question you *didn't* think to ask in advance, using only
the data the system already emitted? "Why did checkout latency spike
for exactly the customers on the EU read replica, between 14:02 and
14:09, only on the mobile client?" Nobody wrote a dashboard for that
specific question. A genuinely observable system lets you decompose
it live, pillar by pillar, without shipping new code or waiting for
the next deploy.

That decomposition happens across three kinds of telemetry, and each
one is the right tool for a different part of the question.

## Pillar 1 — Metrics: is something wrong, right now, in aggregate?

A **metric** is a numeric measurement, sampled over time, usually with
a small set of dimensions attached — `http_requests_total` labeled by
`method`, `status_code`, and `route`; `pod_memory_bytes` labeled by
`namespace` and `pod`. Metrics are cheap to store because they're
pre-aggregated: a counter or histogram stays roughly the same size
whether it represents 10 requests or 10 million.

That cheapness is exactly what makes metrics the right first signal.
They're what you alert on and what you put on a dashboard, because
you can scan a p99 latency graph across every service in seconds and
immediately see which one bent out of its normal band. What metrics
can't do is tell you *why*. A graph of `http_request_duration_seconds`
climbing at 14:02 tells you something broke at 14:02 — it doesn't
tell you which specific request, which line of code, or which
downstream dependency was slow. For that you need to climb down a
level, which is where metrics hand off to logs and traces.

```promql
# "is checkout slow right now" — a real alerting query
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket{route="/checkout"}[5m]))
  by (le)
) > 0.5
```

## Pillar 2 — Logs: what exactly happened, in this one place?

A **log** is a discrete, timestamped record of a single event — a
request handled, an exception thrown, a background job started and
finished. Where a metric collapses millions of events into one number,
a log keeps each event's full, specific detail: the request ID, the
user ID, the stack trace, the exact SQL statement that failed.

Logs are your ground truth when a metric tells you *something* is
wrong but not *what*. The p99 latency alert above fires; you go to
logs filtered to `route="/checkout"` in the window 14:02–14:09 and
start reading individual request records to find the pattern — maybe
every slow request also logged a `cache_miss` against the same Redis
shard. Logs are verbose and comparatively expensive to store at scale,
which is exactly why you don't treat every log line as equally
important (Lesson 4 covers that trade-off directly), and why the
*shape* of your log lines matters enormously — Lesson 2 is entirely
about making logs machine-queryable instead of just human-readable.

## Pillar 3 — Traces: where in the call chain did it actually happen?

A single user request to a checkout endpoint in a microservices
architecture doesn't touch one process — it hits an API gateway, an
auth service, an inventory service, a payment service, and a database,
possibly across several pods and nodes. A **trace** is the record of
that entire journey: one **trace ID** shared by every hop, broken into
**spans** — one span per unit of work ("call inventory-service",
"query postgres") — each with its own start time, duration, and
parent span, so the whole thing reconstructs into a timeline.

Traces answer the question neither metrics nor logs can answer alone:
*where in a multi-service call chain did the time actually go?* A
metrics dashboard tells you checkout is slow. Logs from any one
service tell you that service's story in isolation. Only a trace lets
you see that payment-service's own logic took 4ms, but it spent
380ms waiting on a call to inventory-service that should have been
cached. Lesson 3 goes deep on how that connective tissue — trace
context propagation — actually works across service boundaries.

```text
trace_id: 7e3b2f...
├─ span: api-gateway            (12ms)
│  └─ span: auth-service        (3ms)
│  └─ span: checkout-service    (402ms)
│     ├─ span: inventory-service (380ms)   ← the real problem
│     └─ span: payment-service   (18ms)
```

## Why you need all three on a real incident

Walk a real page end to end: an alert fires because a **metric**
(p99 latency) crossed a threshold. You don't yet know why, so you
pull a **trace** for a slow request sampled during that window and
see which span dominates the timeline — say, `inventory-service`.
Now you know *where*, but not *why* inventory-service was slow, so
you pull **logs** from that specific service, filtered to that trace
ID, and find the actual exception or slow-query detail. Metrics found
it, a trace localized it, logs explained it. Drop any one pillar and
that investigation either takes ten times longer or never converges
at all — which is exactly why this chapter builds all three, in order,
before touching dashboards or alerting rules.

## Key terms

| Term | Meaning |
|---|---|
| Monitoring | Watching a predefined set of signals against known thresholds and alerting on breaches |
| Observability | The property of being able to answer novel questions about system behavior using only existing telemetry |
| Metric | A numeric, pre-aggregated measurement over time (counters, gauges, histograms) — cheap, good for "is something wrong" |
| Log | A discrete, timestamped record of one event with full detail — good for "what exactly happened" |
| Trace | The end-to-end record of one request's path across services, made of linked spans — good for "where did the time go" |
| Span | One unit of work within a trace, with a start time, duration, and parent span |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: given
a p99 latency alert on a checkout endpoint, what specific question
does each of the three pillars answer in sequence, and why does
reaching for only one of them stall the investigation?
