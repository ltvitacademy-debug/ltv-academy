# Lesson 33 — Practice Questions: Eventstreams and KQL

**Chapter 2 · DP-700 Certification Prep · Lesson 33 of 81**

## What you'll learn

- Worked DP-700 scenarios covering Eventstreams, Eventhouse/KQL
  databases, and core KQL syntax
- How to read a KQL snippet fast enough for a timed exam question
- Which KQL operator a scenario is describing, even when it doesn't
  name the operator directly

## How to use this lesson

Same drill format as Lessons 31–32. This chapter's streaming
material spans more source lessons than any other topic — Fabric
Lessons 19 through 27 — so expect this quiz to range widely across
Eventstreams, event sources, and KQL syntax.

## Worked question 1

*An IoT sensor fleet sends readings every second to Fabric. A team
needs those readings ingested continuously, not on a schedule, and
routed to a KQL database for near-real-time querying. What's the
ingestion path?*

**Eventstream** (Fabric Lesson 19), likely fed by an **Event Hub**
or **IoT Hub** source (Fabric Lesson 20), routing into an
**Eventhouse/KQL database** (Fabric Lesson 21). A pipeline or
Dataflow would be the wrong answer here — both are batch-oriented,
and the scenario explicitly says "continuously."

## Worked question 2

*A KQL query needs to filter rows where `Status == "Error"` and
return only the `Timestamp` and `Message` columns. Which two KQL
operators accomplish this?*

`where` filters rows; `project` selects and renames columns
(Fabric Lesson 23). A query like
`Table | where Status == "Error" | project Timestamp, Message` is
the direct exam-style expression of this scenario — recognizing
`where`/`project` from a plain-English description is tested more
often than writing the syntax from scratch.

## Worked question 3

*A scenario describes needing the average value of a metric,
grouped by five-minute intervals, across a KQL table. Which KQL
operator, combined with which time function, does this?*

`summarize` with `bin()` (Fabric Lesson 24):
`Table | summarize avg(Value) by bin(Timestamp, 5m)`. This is the
KQL-syntax expression of the same tumbling-window idea tested from
the Eventstream-windowing angle in earlier lessons — DP-700 tests the
same underlying concept from multiple tool angles.

## Key terms

| Term | Meaning |
|---|---|
| Eventstream | The continuous, streaming ingestion path (vs. a pipeline's batch orientation) |
| `where` / `project` | KQL row filtering and column selection |
| `summarize ... by bin()` | KQL's time-bucketed aggregation pattern |

## Check yourself

Take the quiz below. If you miss more than one, revisit Fabric
Lessons 19–24 before continuing to Lesson 34.
