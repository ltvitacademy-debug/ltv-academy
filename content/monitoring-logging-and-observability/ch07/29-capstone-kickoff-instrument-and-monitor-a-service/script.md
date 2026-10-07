# Script — Capstone Kickoff: Instrument and Monitor a Service

## Segment 1 (title)

This capstone isn't a replay of Northbridge's checkout incident. You've spent six chapters learning the vocabulary, the tools, and the incident process using Northbridge as the example — now you build something of your own, and make it genuinely observable from scratch.

## Segment 2 (steps)

Pick one small, real piece of software — a small API with a couple of endpoints and a database, a side project you've already started that doesn't yet have any observability, or even a scheduled batch job if you'd rather practice on something that isn't request-driven. Avoid both extremes: something so trivial there's nothing to observe, and something so large you spend the whole capstone on the service instead of on instrumenting it.

## Segment 3 (steps)

Before writing any instrumentation code, decide four things in writing. What are this service's golden signals — latency, traffic, errors, saturation for a request-driven service, or duration and success rate for a batch job. What you'll instrument with, and with what tools. Where metrics and logs will live and how you'll visualize them — pick one stack, Prometheus and Grafana or a cloud equivalent, and commit to it rather than mixing tools you haven't set up end to end. And what two or three alerts would actually matter, written in plain English before they become real alert rules.

## Segment 4 (steps)

By the end of the capstone you'll have a running service with metrics, structured logs, and basic tracing; a dashboard with four to six meaningful panels; two or three real alert rules with thresholds you derived yourself; and a short write-up of your design decisions — built to be shown to an interviewer, not just to yourself.

## Segment 5 (outro)

That's the plan. Next up, lesson thirty: turning this plan into real metrics, logs, a dashboard, and alerts.
