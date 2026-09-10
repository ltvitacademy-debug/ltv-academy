# Lesson 33 — Watermarks in Real Streaming Systems

**Chapter 2 · Real-Time Data Engineering · Lesson 33 of 70**

## What you'll learn

- The problem a watermark solves: when is a window actually "done"?
- Watermarks as a deliberate tradeoff between latency and completeness
- How Fabric's Eventstream and KQL both apply the same idea
- The parallel to Databricks Structured Streaming's watermarking

## The problem: a window has to close eventually

Lesson 29 already flagged the gap between event time and processing
time — a trip's real timestamp versus when Fabric actually received
it. That gap creates a real problem: a 5-minute tumbling window
covering 12:00–12:05 can't wait forever for every possible
straggling event with a 12:0x timestamp to show up before it
reports a final answer. At some point the system has to just decide
the window is done — even though, technically, a late event could
still be on its way.

## The watermark as a deadline

A **watermark** is that decision, made explicit: a declared
tolerance for lateness — "assume no event will arrive more than 2
minutes late" — that lets the system close a window 2 minutes after
its natural end instead of waiting indefinitely. Any event that
arrives within the tolerance gets included; anything later than
that gets dropped or routed elsewhere, by design.

```kql
// Conceptually: close the 12:00-12:05 window
// no earlier than 12:07 -- 2 minutes of grace period
// for straggling events with a 12:0x EventTime.
```

## Latency vs. completeness — a real tradeoff, not a bug

A shorter watermark tolerance means faster, fresher answers, but a
higher chance of missing genuinely late data. A longer tolerance
catches more stragglers, but delays every window's final answer by
that much longer. There's no watermark setting that's simply
"correct" — it's a deliberate choice tuned to how late your specific
data source actually tends to run.

## The same idea in Databricks Structured Streaming

Databricks & Delta Lake's Lesson 35 (Handling Late-Arriving Data)
covers `withWatermark()` in Spark Structured Streaming — the exact
same concept, same tradeoff, same vocabulary, just a different
engine. Fabric's Eventstream and KQL windowing and Spark's
Structured Streaming both had to invent an answer to "when is a
window done," and they converged on the same idea because the
underlying problem is identical.

## Key terms

| Term | Meaning |
|---|---|
| Watermark | A declared tolerance for lateness that lets a window close on a deadline |
| Latency vs. completeness | The real tradeoff a watermark setting controls |
| `withWatermark()` | Structured Streaming's version of the same concept (Databricks & Delta Lake Lesson 35) |

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: why
is there no watermark tolerance setting that's simply "correct" for
every data source?
