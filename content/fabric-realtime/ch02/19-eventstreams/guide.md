# Lesson 19 — Eventstreams — Ingesting Streaming Data

**Chapter 1 · Real-Time Data Engineering · Lesson 19 of 70**

## What you'll learn

- An Eventstream: a visual canvas for a continuous flow of events
- Sources, transformations, and destinations — the three real building blocks
- Creating one, start to finish
- The direct parallel to Autoloader, and the real difference

## A visual canvas for continuous events

An **Eventstream** is a Fabric item that ingests a continuous flow
of events and routes them — visually, on a canvas, the same
building-block feel as Lesson 8's pipeline canvas, but for
streaming data instead of batch files. Where a pipeline runs, does
its work, and finishes, an Eventstream is meant to stay running
indefinitely, the same "always on" idea Databricks & Delta Lake
Lesson 33 introduced for `processingTime` triggers.

## Sources, transformations, destinations

```
Source: Azure Event Hub (real NYC Taxi trip events, simulated)
    -> Transformation: filter out fare_amount <= 0
    -> Destination: Eventhouse (Lesson 21)
    -> Destination: Lakehouse (Lesson 4's table, for batch analysis)
```

An Eventstream is built from exactly three kinds of node: a
**source** (where events come from — Lesson 20 covers real sources),
optional **transformations** (filter, aggregate, reshape events in
flight), and one or more **destinations** — genuinely one or more,
since the same stream can feed both an Eventhouse for real-time
queries and a Lakehouse for later batch analysis, at once.

## Creating one

1. In your workspace, select **New item → Eventstream**.
2. Add a source (Lesson 20 covers this properly — for now, a sample
   data source works for testing).
3. Add a destination — an Eventhouse, a Lakehouse table, or both.
4. Publish. The Eventstream starts running immediately, continuously.

## The direct parallel to Autoloader

Recall Databricks & Delta Lake Lesson 32: Autoloader watches a
folder and picks up new files automatically, without re-scanning
everything. An Eventstream does the conceptually same job — pick up
new data automatically, without manual intervention — but for a
genuinely different source shape: a continuous event stream, not
files landing periodically. Autoloader's checkpoint tracked which
*files* were seen; an Eventstream's underlying engine tracks which
*events*, in a stream that never technically "finishes."

## Key terms

| Term | Meaning |
|---|---|
| Eventstream | A visual canvas for a continuous, always-running flow of events |
| Source / Transformation / Destination | The three node types an Eventstream is built from |
| Multiple destinations | The same stream can feed an Eventhouse and a Lakehouse at once |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
might a single Eventstream have more than one destination?
