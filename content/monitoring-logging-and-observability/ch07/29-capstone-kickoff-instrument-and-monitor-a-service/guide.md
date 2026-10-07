# Capstone Kickoff: Instrument and Monitor a Service

This capstone is not a replay of Northbridge Retail's checkout incident. You've spent six chapters learning the vocabulary, the cloud-native tools, the open-source stack, and the incident process using Northbridge as the running example — now you build something of your own. Pick a small, real service, and make it genuinely observable from scratch. This lesson is the planning step: before you write a single line of instrumentation code, decide what you're building and what "done" looks like.

## What you'll learn

- How to pick a capstone service that's small enough to finish and real enough to be worth showing
- What to plan before writing any instrumentation code
- The concrete deliverables this capstone expects by the end of Lesson 31
- Why "my own build, not Northbridge's incident" is the point, not a technicality

## Picking a service

You don't need a distributed system. You need one real, running piece of software that does something, small enough to build and instrument in a few focused sessions. Good candidates:

- A small API you already have, or a simple one you build for this purpose (a to-do API, a URL shortener, a weather proxy — anything with a couple of endpoints and a dependency, like a database)
- A side project or portfolio app you've already started that doesn't yet have any observability
- A script or batch job that runs on a schedule, if you'd rather practice metrics/logs on something non-request-driven

Avoid two extremes: something so trivial it has nothing interesting to observe (a static "hello world" with no dependencies, no failure modes, nothing that varies), and something so large you'll spend the whole capstone on the service itself instead of on instrumenting it. One service, one or two endpoints or job types, one dependency (a database, a cache, or another API) is the right size.

## What to plan before you build

Decide these four things now, in writing, before touching instrumentation code:

1. **What are this service's golden signals?** For a request-driven service: latency, traffic, errors, saturation on something concrete (a connection pool, a queue). For a batch job: duration, success/failure rate, items processed.
2. **What will you instrument, and with what?** Metrics via a Prometheus client library (or your cloud's native SDK), structured logs (Lesson 20), and at least a basic trace span around the main operation (Lesson 22) if the service calls anything else.
3. **Where will metrics and logs live, and how will you visualize them?** Prometheus + Grafana, or a cloud equivalent (Azure Monitor / CloudWatch) — pick one stack and commit to it rather than mixing tools you haven't set up end to end.
4. **What 2–3 alerts would actually matter for this service?** Not "CPU high" — something symptom-based and actionable, the way Lesson 28 described. Write the alert conditions in plain English now; you'll turn them into real alert rules in the next lesson.

## Deliverables by the end of the capstone

By Lesson 31 you should have: a running service with metrics, structured logs, and basic tracing; a dashboard with at least 4–6 meaningful panels; 2–3 alert rules with real thresholds, not placeholders; and a short write-up explaining your design decisions — ready to present as a portfolio piece.

## Key terms

- **Capstone scope** — deliberately small: one service, one or two operations, one dependency
- **Instrumentation plan** — the written decision of what signals to collect and with what tools, made before coding starts
- **Portfolio deliverable** — the finished dashboard, alerts, and write-up, built to be shown to an interviewer
