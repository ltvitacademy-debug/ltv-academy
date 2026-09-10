# Lesson 39 — Real-Time Data Quality

**Chapter 2 · Real-Time Data Engineering · Lesson 39 of 70**

## What you'll learn

- Why data quality checks can't just wait until tomorrow's batch job
- Null checks, range checks, and schema drift on a live stream
- Where to catch a bad event: in-stream, or after it lands
- The batch equivalent, and why streaming raises the stakes

## Why waiting for tomorrow isn't good enough

Databricks & Delta Lake's Lesson 36 (Data Quality Checks in the
Medallion Flow) covered validating data as it moves bronze → silver
→ gold, typically on a batch schedule. A real-time system doesn't
get that luxury: a `FareAmount` of `-999` or a `TripId` of `null`
streaming straight into a live dashboard is visible to a dispatcher
*right now*, not discovered in tomorrow's nightly quality report.

## Three checks worth running in-stream

```kql
RawTripEvents
| where isnull(TripId) or isnull(EventTime)          // null check
| where FareAmount < 0 or FareAmount > 500           // range check
| extend ExpectedFields = bag_keys(EventProperties)   // schema check
```

**Null checks** catch missing required fields. **Range checks**
catch values that are technically present but nonsensical — a
negative fare, an impossible trip duration. **Schema drift**
checks catch a source that started sending a field it never sent
before, or stopped sending one it used to — often the sign of an
upstream change nobody warned you about.

## Where to catch it — in-stream, using tools you already have

You don't need a new tool for this — Lesson 35's Filter node
catches bad events before they land at all, and Lesson 36's
routing sends them to a "quality-failures" destination instead of
silently dropping them. Lesson 37's Activator can alert someone the
moment a check starts failing at an unusual rate, rather than
waiting for a human to notice a bad dashboard days later.

## Streaming raises the stakes

A batch quality check that misses a bad record delays a report by a
day. A streaming quality check that misses a bad record puts wrong
numbers in front of a dispatcher, a rider-facing map, or an
Activator rule making real-time decisions — the exact same category
of bug, but the blast radius is measured in seconds instead of
overnight.

## Key terms

| Term | Meaning |
|---|---|
| Null check | Catches missing required fields |
| Range check | Catches present-but-nonsensical values |
| Schema drift | Catches an unexpected change in a source's field shape |

## Check yourself

You're ready for Lesson 40 when you can explain, without looking: why
does a streaming data quality bug have a smaller blast-radius window
but a higher real-world stake than the same bug in a nightly batch job?
