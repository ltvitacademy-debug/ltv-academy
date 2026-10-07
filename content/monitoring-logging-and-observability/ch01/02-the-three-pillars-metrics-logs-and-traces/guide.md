# The Three Pillars: Metrics, Logs & Traces

If observability is the property of being able to understand a system from the data it produces, then this lesson answers the obvious next question: what data, exactly? The industry has settled on three complementary types — metrics, logs, and traces — often called the three pillars of observability. Each answers a different kind of question, and real incident response at a company like Northbridge Retail uses all three together.

## What you'll learn

- What a metric, a log, and a trace each are, in concrete terms
- The specific question each pillar answers best
- Where each pillar falls short on its own
- Why none of the three alone is "observability" — only the combination, correlated, gets you there

## Metrics: numbers over time

A metric is a numeric measurement recorded at a point in time, usually sampled on a regular interval — requests per second, CPU percent, average response time, items in a queue. Metrics are cheap to store and fast to query, which makes them ideal for dashboards and for triggering alerts ("page someone if error rate exceeds 5% for 5 minutes").

Metrics answer **"what" and "how much"** — checkout latency is 1.2 seconds, up from 300 milliseconds ten minutes ago. What metrics can't tell you is **why**. A metric showing elevated latency doesn't say which specific request, which specific customer, or which specific line of code is responsible.

## Logs: discrete events with detail

A log is a timestamped, immutable record of a single discrete event: "order 48213 failed payment authorization," "connection to inventory-service timed out after 3000ms." Logs carry far more context per event than a metric, including exact error messages, stack traces, and request identifiers.

Logs answer **"what exactly happened, and in what order."** Their weakness is scale: a busy service can produce millions of log lines per hour, and finding the three that matter during an active incident without the right search tooling (Chapter 5 covers this) is like finding a sentence in an unindexed library.

## Traces: one request's path through everything

A trace follows a single request as it moves through every service it touches, broken into timed segments called **spans**. If a customer's checkout request at Northbridge passes through the API gateway, the cart service, the pricing service, and the payment gateway, a trace shows how long the request spent in each one and which span blocked the others.

Traces answer **"where, in a request's whole journey across services, did the time actually go."** This is exactly what metrics and logs, each looking at one service in isolation, struggle to show in a distributed system. Tracing is covered in depth in Chapter 5.

## Why you need all three, correlated

Picture the Northbridge flash-sale incident this course keeps returning to. A **metric** dashboard shows checkout p99 latency spiking at 2:14 PM — that tells you *something* is wrong and roughly *when*. A **trace** for a slow request during that window shows the delay is concentrated in one span: a call from the cart service to the pricing service. A **log** line from the pricing service at that exact timestamp shows a connection pool exhaustion error. Metrics told you *when and how bad*. The trace told you *where*. The log told you *exactly why*.

No single pillar would have gotten you there as fast. That correlation — moving from a metric, to a trace, to a log, using shared identifiers like a trace ID — is a skill you'll build in Chapter 5 and put to work in Chapter 6's incident walkthrough.

## Key terms

- **Metric** — a numeric measurement sampled over time; cheap, fast, good for dashboards and alerts
- **Log** — a timestamped record of one discrete event with rich detail
- **Trace** — the end-to-end path of one request across services, broken into spans
- **Span** — one timed segment of a trace, representing work done in one service or operation
- **Correlation** — using a shared identifier (like a trace ID) to move between metrics, logs, and traces for the same incident
