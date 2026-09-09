# Lesson 53 — Pipeline Modes: Triggered vs. Continuous

**Chapter 5 · Lakeflow · Lesson 53 of 57**

## What you'll learn

- Triggered mode — Lesson 33's `availableNow` trigger, at the whole-pipeline level
- Continuous mode — Lesson 33's `processingTime` trigger, at the whole-pipeline level
- Compute lifecycle: what actually happens to the cluster between runs, for each mode
- Choosing correctly, based on this course's own NYC Taxi ingestion cadence

## Triggered — process what's new, then stop

**Triggered** pipelines run once: process everything currently
available across every `@dlt.table`, in correct dependency order,
then shut down. This is Lesson 33's `trigger(availableNow=True)`
concept, now applying to an entire multi-table pipeline at once
instead of one `writeStream` call. A triggered pipeline is typically
run on a schedule (Lesson 11's jobs, or Lesson 54's Lakeflow Jobs) —
say, once an hour.

## Continuous — always running, always checking

**Continuous** pipelines start up and keep running indefinitely,
processing new data as it arrives across every table — Lesson 33's
`trigger(processingTime=...)` concept, again at the whole-pipeline
level. There's no "next scheduled run" to wait for; new bronze rows
reach gold within moments, continuously.

## What happens to compute between runs

```
Triggered:  cluster spins up -> processes everything -> spins down
            (billed only while actually running)

Continuous: cluster stays up, indefinitely
            (billed continuously, for genuinely continuous processing)
```

This is a direct, real cost tradeoff — the same idea Lesson 5's
job-cluster-vs-all-purpose distinction and Lesson 23's
"maintenance isn't constant" both touched on, now applied to an
entire pipeline's compute lifecycle rather than one cluster.

## Choosing correctly for this course's own data

NYC Taxi trip data, as this course has used it, arrives in monthly
files — genuinely infrequent, bursty ingestion. **Triggered**, run
on a schedule matching that cadence, is clearly the right choice:
paying for continuously-running compute between monthly files would
be pure waste. A source generating events by the second — real-time
sensor data, live transaction streams — is where **continuous**
actually earns its cost.

## Key terms

| Term | Meaning |
|---|---|
| Triggered | Processes everything available once, then stops — billed only while running |
| Continuous | Runs indefinitely, processing new data as it arrives — billed continuously |
| Choosing between them | Match the mode to the source's real ingestion cadence, not by default |

## Check yourself

You're ready for Lesson 54 when you can explain, without looking: why
would running this course's monthly NYC Taxi pipeline in continuous
mode be a real waste of money?
