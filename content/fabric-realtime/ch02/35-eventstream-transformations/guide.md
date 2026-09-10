# Lesson 35 — Eventstream Transformations

**Chapter 2 · Real-Time Data Engineering · Lesson 35 of 70**

## What you'll learn

- The Eventstream canvas's other transformation nodes, beyond Window
- Filter, Manage Fields, and Group By — the no-code equivalents of KQL
- Union and Join — combining multiple streams before they land anywhere
- Why shaping data in-stream, not after landing, changes what's possible

## Transformations, before landing anywhere

Lesson 19 introduced the Eventstream canvas as source → transformation
→ destination. Lesson 30 covered one transformation node — Window.
This lesson covers the rest: nodes that filter, reshape, and combine
events while they're still in flight, before any of it reaches a
KQL Database or Lakehouse.

## Filter — the no-code `where`

```
Filter node: EventTime > ago(1h)  AND  FareAmount > 0
```

Functionally identical to a KQL `where` clause (Lesson 23), except
it runs earlier — on the stream itself, before data lands anywhere.
Events that fail the filter never get written at all, which can
matter for cost: fewer rows ingested means less storage and less
compute downstream.

## Manage Fields — the no-code `project`

```
Manage Fields node:
  keep:    TripId, EventTime, FareAmount, VendorId
  rename:  fare_amt -> FareAmount
  cast:    FareAmount -> decimal
```

The visual equivalent of KQL's `project` and `extend` (Lesson 23) —
choose which fields survive, rename them, or change their type,
all before the event ever reaches a destination.

## Group By — the no-code `summarize`

Group By computes an aggregate — count, sum, average — grouped by a
key, directly on the canvas. It's the same underlying idea as
`summarize ... by ...` (Lesson 24), just expressed as a node instead
of a KQL clause, and usually paired with a Window node so the
grouping also has a time boundary.

## Union and Join — combining streams in flight

```
Union: merge TripEvents + DriverStatusEvents into one stream
Join:  TripEvents (last 5m) join DriverLocationEvents on DriverId
```

**Union** merges multiple event streams into one. **Join** combines
two streams using a matching key, within a time window — the
streaming equivalent of KQL's `join kind=leftouter` (Lesson 25), but
happening before either stream lands in storage.

## Why shape it in-stream at all?

Every one of these nodes could instead be a KQL query run after data
lands in a KQL Database. The difference is cost and simplicity
downstream: filtering out 90% of noisy events before they're ever
stored, or joining two streams into one clean shape before landing,
means every query written afterward is simpler and every dollar of
storage is spent on data that's actually useful.

## Key terms

| Term | Meaning |
|---|---|
| Filter | The no-code Eventstream equivalent of KQL's `where` |
| Manage Fields | The no-code equivalent of `project`/`extend` |
| Union / Join | Combining multiple streams in flight, before landing |

## Check yourself

You're ready for Lesson 36 when you can explain, without looking: why
would filtering noisy events out in-stream be cheaper than filtering
them out with a KQL query after they've already landed?
