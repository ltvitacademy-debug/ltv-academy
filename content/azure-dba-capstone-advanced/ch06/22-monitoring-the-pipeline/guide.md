# Lesson 22 — Monitoring the Pipeline

**Chapter 6 · The ETL Layer With Data Factory · Lesson 22 of 26**

## What you'll learn

- Why Lesson 21's pipeline, unmonitored, repeats Chapter 5's original problem one layer up
- Data Factory's Monitor hub, and what it actually shows about a pipeline run
- Setting an alert on pipeline failure, and why it uses the same instinct as Lesson 19
- How this closes Chapter 6, and what's left to validate before Chapter 7

## The same gap, one layer up

Lesson 21 built a real, working pipeline. Left unmonitored, a failed run on a Tuesday night means
Overlook's appointment data for that day never lands in `OverlookDB` — and nobody knows until a
report looks wrong days later. That's the exact same shape of problem Chapter 5 solved for the
database itself: a real mechanism exists, but someone still has to notice when it stops working.

## Data Factory's Monitor hub

Every pipeline run in Data Factory is recorded and inspectable in the **Monitor hub** — status
(`Succeeded`, `Failed`, `In Progress`), start and end time, and, for a failed run, the specific
activity and error that caused it. For `LoadOverlookAppointments`, this is the first place to look
after a reported failure: did the Copy activity fail to read the source file, fail to write to the
sink, or fail midway through due to a schema mismatch — each pointing to a different fix.

## Setting a real alert on failure

Data Factory supports **alerts and metrics**, configurable to trigger on specific conditions —
most directly, a pipeline run status of `Failed`. Configuring an alert rule on
`LoadOverlookAppointments` for failed runs, routed to the same on-call DBA distribution Lesson 19's
health-check alerts already use, means a failed appointment load gets noticed the same night it
happens, not days later.

```
Alert rule: LoadOverlookAppointments — Failed
  Condition: Pipeline run status = Failed
  Action:    Notify oncall-dba@overlookmedical.com
```

This is deliberately the same instinct as Lesson 19's PowerShell alerting, applied to a different
mechanism: a failed condition should trigger a notification automatically, without anyone having to
check a dashboard first.

## Retry policies as the first line of defense

Before an alert ever fires, a Copy activity can be configured with a **retry policy** — automatically
re-attempting a transient failure (a brief network blip reading the source file, for example)
before giving up and reporting a real failure. This means Overlook's alert specifically means
something: by the time it fires, the pipeline has already ruled out a simple retry fixing the
problem on its own.

## Chapter 6, closed — what's left before Chapter 7

With the pipeline built (Lesson 21) and monitored (this lesson), Overlook's platform is complete
across all five of Lesson 2's planned pieces: infrastructure, security, HA/DR, automation, and ETL.
Chapter 7 is where all of it gets tested together under real pressure — starting with an
unannounced DR drill that exercises Chapter 4's failover group for real.

## Key terms

| Term | Meaning |
|---|---|
| Monitor hub | Data Factory's view of every pipeline run, its status, and any failure details |
| Alert rule | A configured condition (like a Failed run status) that triggers an automatic notification |
| Retry policy | Automatically re-attempting a transient failure before reporting a real one |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why does an alert on a pipeline
failure matter even though the Copy activity already has a retry policy?
