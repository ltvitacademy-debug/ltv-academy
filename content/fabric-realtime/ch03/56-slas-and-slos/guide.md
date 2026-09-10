# Lesson 56 — SLAs and SLOs for Data Pipelines

**Chapter 3 · Production Data Engineering · Lesson 56 of 70**

## What you'll learn

- Three related terms — SLA, SLO, SLI — and how they fit together
- Turning Lesson 50's contract SLA into an internal target with margin
- The error budget — a practical way to use an SLO, not just state it
- Why the internal target should always be stricter than the external promise

## Three terms, three different jobs

```
SLI (indicator):  the actual measured number -- "average ingestion
                   latency was 2.3 minutes this week"
SLO (objective):  the internal target -- "ingestion latency should
                   stay under 3 minutes, 99% of the time"
SLA (agreement):  the external promise -- "events arrive within
                   5 minutes" (Lesson 50's data contract)
```

An **SLI** is a raw measurement. An **SLO** is the internal target
a team holds itself to. An **SLA** is the external promise made to
a consumer, often with real consequences for missing it. All three
measure the same underlying thing — freshness, in this example —
but serve different audiences and different purposes.

## Why the SLO should be stricter than the SLA

Lesson 50's data contract promised "within 5 minutes" as the SLA —
the number a consumer can rely on. Setting the internal SLO at 3
minutes, not 5, builds in a buffer: normal operational noise,
occasional slow queries, and everyday variance all eat into that
margin before the SLA itself is ever actually at risk. Setting the
SLO exactly equal to the SLA leaves no room for anything to go even
slightly wrong before a real, consumer-facing promise gets broken.

## The error budget

```
SLO: 99% of events ingested within 3 minutes, per 30-day window
Error budget: the remaining 1% -- roughly 7.2 hours of "budget"
              to spend on deploys, experiments, or unavoidable blips
```

An **error budget** turns an SLO from an abstract target into a
spendable resource. If the budget for the month is already used up,
that's the signal to slow down on risky changes and focus on
stability instead — a concrete, numeric answer to "should we ship
this risky change now?" rather than a judgment call made from
nothing.

## Tying it back to what's already been built

Lesson 52's metrics are literally how an SLI gets measured. Lesson
53's alerts should fire based on SLO risk — not on every single
missed target, but on a trend that threatens to burn through the
error budget. None of this is new infrastructure; it's a
disciplined way of using what Chapters 2–3 already built.

## Key terms

| Term | Meaning |
|---|---|
| SLI | The actual measured indicator |
| SLO | The internal target, stricter than the external promise |
| SLA | The external, consumer-facing agreement, often with consequences |
| Error budget | The allowed slack in an SLO, spendable on risk |

## Check yourself

You're ready for Lesson 57 when you can explain, without looking: why
should an internal SLO always be set stricter than the external SLA
it supports?
