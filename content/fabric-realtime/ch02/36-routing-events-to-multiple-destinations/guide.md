# Lesson 36 — Routing Events to Multiple Destinations

**Chapter 2 · Real-Time Data Engineering · Lesson 36 of 70**

## What you'll learn

- Fan-out — one Eventstream, several destinations, no duplication of the source
- Conditional split — sending different events down different paths
- A concrete NYC Taxi routing design
- Why this beats standing up separate pipelines per destination

## One stream, several destinations

An Eventstream isn't limited to a single destination node. The same
source — one Event Hub emitting trip events — can fan out to
multiple destinations at once: a KQL Database for real-time
queries, a Lakehouse for long-term storage and later batch analysis
(the same Lakehouse concept from Lesson 4), and a third destination
for anything that needs immediate attention. Every destination
reads from the same upstream source; nothing about the source
changes or gets duplicated to make this work.

## Conditional split — different events, different paths

```
Filter A: FareAmount > 100          -> "high-value-trips" destination
Filter B: ArrivalGap > 5m           -> "late-arrivals" destination
Filter C: (everything else)         -> "all-trips" destination (default)
```

A **conditional split** routes events down different branches based
on a condition, using the same Filter node from Lesson 35 — just
applied multiple times in parallel, each feeding a different
destination. Lesson 34 already previewed this idea: routing
genuinely out-of-order or anomalous events somewhere separate for
review, rather than mixing them into the main flow.

## A concrete design for this course's data

```
RawTripEvents (Event Hub)
  |-- all events -----------------> KQL Database (Lessons 21-33)
  |-- FareAmount > 200 -----------> "high-value" Lakehouse table
  |-- failed sequence check -------> "needs-review" KQL table
```

Every branch reads the same source once. The "needs-review" branch
sets up exactly the kind of alerting Lesson 37 (Activator) builds
on next — routing is the mechanism, alerting is what you do with
what got routed there.

## Why not just build three separate pipelines?

You could stand up three completely separate Eventstreams, each
reading the same Event Hub independently. That works, but it means
paying for the source connection three times over and maintaining
three definitions that all have to stay in sync if the source
schema ever changes. One Eventstream with multiple destinations
reads the source once and branches downstream — cheaper, and there's
only one place to update when something changes upstream.

## Key terms

| Term | Meaning |
|---|---|
| Fan-out | One Eventstream feeding multiple destinations at once |
| Conditional split | Routing different events down different branches by condition |
| Single source, multiple branches | Cheaper and easier to maintain than duplicate pipelines |

## Check yourself

You're ready for Lesson 37 when you can explain, without looking: why
is one Eventstream with three destination branches cheaper to run
than three separate Eventstreams reading the same source?
