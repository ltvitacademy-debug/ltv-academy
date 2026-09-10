# Lesson 52 — Observability: Logs, Metrics, and Traces

**Chapter 3 · Production Data Engineering · Lesson 52 of 70**

## What you'll learn

- Filling in Lesson 43's "observable" quality with a real mechanism
- Three pillars — logs, metrics, traces — and what each one actually answers
- Where the Monitoring Hub (Lesson 16) fits, and where it doesn't
- Choosing which pillar to check first when something looks wrong

## Three pillars, three different questions

```
Logs:     what exactly happened, in detail, at a specific moment?
Metrics:  how is this behaving over time, in aggregate?
Traces:   how did one specific event move through every stage of the pipeline?
```

None of these three replaces the others — a metric can tell you
*that* something's wrong ("error rate jumped at 2:14pm"), but not
*why*. A log can tell you exactly what error occurred, but not
whether it's a one-off or a growing trend. A trace can show you
exactly which stage a specific event got stuck in, but tracing
every event would be far too much data to store or read through.

## The Monitoring Hub as a starting point

Lesson 16 already introduced the Monitoring Hub as Fabric's unified
run history — every pipeline run, notebook execution, and
Eventstream's health, in one place. That's genuinely useful metrics
and basic logging, built in, with no extra setup. What it doesn't
give you is the third pillar: following one specific trip event
from Eventstream ingestion, through a Window transformation, into
the KQL Database, and out to an Activator alert — that level of
detail needs purpose-built tracing.

## A concrete metric and log, side by side

```kql
// Metric: aggregate health, over time
EventstreamMetrics
| summarize AvgLatency = avg(ProcessingLatencyMs) by bin(Timestamp, 5m)

// Log: exact detail, at a specific moment
EventstreamLogs
| where Timestamp between (datetime(2026-09-09T14:10:00) .. datetime(2026-09-09T14:15:00))
| where Level == "Error"
```

The metric answers "is latency trending up?" The log answers "what
specifically failed at 2:12pm?" Neither query is useful in place of
the other — they answer genuinely different questions.

## Choosing where to look first

A real incident usually starts with a metric or an Activator alert
(Lesson 37) noticing something's off, moves to logs to find the
specific error, and only reaches for a trace when the failure spans
multiple stages and it's unclear where things actually went wrong.
Starting with the wrong pillar wastes time — reading raw logs to
spot a slow trend, or building a trace for a problem a single log
line already explains.

## Key terms

| Term | Meaning |
|---|---|
| Metrics | Aggregate behavior over time — is something trending wrong? |
| Logs | Specific detail at a specific moment — what exactly happened? |
| Traces | One event's full path through every stage of the pipeline |

## Check yourself

You're ready for Lesson 53 when you can explain, without looking: why
would a metric alone tell you *that* something's wrong without
telling you *why*?
