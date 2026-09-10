# Lesson 18 — What Is Real-Time Intelligence?

**Chapter 2 · Real-Time Data Engineering · Lesson 18 of 70**

## What you'll learn

- The real gap Databricks & Delta Lake's Structured Streaming left open
- Real-Time Intelligence: Fabric's own name for this chapter's whole toolset
- The three new pieces: Eventstreams, Eventhouse, and Activator
- Why "real-time" here means something more specific than "streaming"

## The gap left open

Databricks & Delta Lake's Chapter 3 covered Structured Streaming
(readStream/writeStream, micro-batches, `foreachBatch`) — genuinely
real streaming, but built on Spark's general-purpose DataFrame
engine. That chapter never covered the things purpose-built
streaming platforms usually add: a query language optimized
specifically for time-series data, sub-second alerting, and a
storage engine tuned for extremely high-volume event ingestion
rather than batch-style Delta writes.

## Real-Time Intelligence: Fabric's name for this toolset

**Real-Time Intelligence** is Fabric's umbrella term for exactly
that gap: a connected set of items purpose-built for streaming and
time-series data, sitting alongside the Lakehouse/Warehouse world
Chapter 1 covered, sharing the same workspace and capacity model
(Lesson 14), but built on genuinely different engines underneath.

## The three new pieces

| Item | What it's for |
|---|---|
| **Eventstream** (Lesson 19) | Ingesting and routing streaming events, visually |
| **Eventhouse / KQL Database** (Lesson 21) | Storage and query, purpose-built for time-series event data |
| **Activator** (Lesson 37) | Sub-second alerting directly on streaming data, no scheduled job required |

None of these existed in the Databricks & Delta Lake material —
this is the genuinely new territory this course's own intro (Lesson
1) flagged as the reason this chapter, not just Chapter 1, is where
Fabric earns comparison on its own terms.

## Why "real-time" means something specific here

Structured Streaming's micro-batches (Databricks & Delta Lake
Lesson 33) still process data in small batches, seconds apart at
best. Real-Time Intelligence's Eventstream/Eventhouse pairing is
built for **sub-second** latency — an alert firing within
milliseconds of an event arriving, not the next micro-batch
interval. This chapter's Lessons 29–34 (windowing, watermarks) will
make the real technical reason for that difference concrete.

## Key terms

| Term | Meaning |
|---|---|
| Real-Time Intelligence | Fabric's umbrella for purpose-built streaming/time-series items |
| Eventhouse | Storage and query engine tuned for high-volume event data |
| Activator | Sub-second alerting directly on a stream, no scheduled job |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
does Structured Streaming's micro-batch model not achieve the same
latency as Real-Time Intelligence's tools?
