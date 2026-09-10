# Lesson 6 — The Lambda Architecture

**Chapter 1 · System Design for Data Engineers · Lesson 6 of 81**

## What you'll learn

- The Lambda architecture — Lesson 5's hybrid idea, with a name and a shape
- Three layers: speed, batch, and serving
- Mapping each layer to a tool you already know
- The real cost of Lambda: two codepaths that must agree

## Three layers, one name

```
Speed layer:    processes data as it arrives, low latency,
                approximate is acceptable -- Fabric Eventstream + KQL
Batch layer:     reprocesses everything periodically, slower,
                fully accurate -- Databricks & Delta Lake's medallion pipeline
Serving layer:   merges both views for whoever's actually looking --
                a dashboard or report combining "today" (speed) with
                "everything before today" (batch)
```

**Lambda architecture** is Lesson 5's hybrid processing model, given
a specific, named shape: a speed layer and a batch layer running in
parallel, both feeding a serving layer that presents them as one
combined answer.

## Mapping it to the taxi platform

```
Speed layer:    RawTripEvents streaming into a KQL Database,
                windowed dashboards (Fabric Lessons 21, 28)
Batch layer:    a nightly Databricks job reprocessing the full day's
                trips through bronze -> silver -> gold, applying
                MERGE for corrections (Databricks Lesson 22)
Serving layer:   a Power BI report or dashboard tile querying both --
                today's numbers from the speed layer, everything
                else from the batch layer's gold table
```

Every piece of this mapping is a tool this track already taught in
isolation. Lambda architecture is what it looks like when all three
run together, on purpose, as one coordinated design.

## The real cost: two codepaths that must agree

The speed layer's KQL aggregation logic and the batch layer's
PySpark aggregation logic are **two separate implementations of the
same business logic** — computing "average fare per vendor" twice,
in two different languages, on two different engines. If they ever
compute it even slightly differently, the dashboard shows a
discrepancy between "today" and "yesterday" that has nothing to do
with the actual data and everything to do with the two codepaths
quietly drifting apart.

## Why teams still choose Lambda anyway

Despite that cost, Lambda genuinely fits situations where the speed
layer's approximate, fast answer and the batch layer's slow,
exact answer serve genuinely different purposes — a dispatcher who
needs "roughly now" and a monthly billing reconciliation that needs
"exactly right" are different enough needs that maintaining two
codepaths is a reasonable price to pay.

## Key terms

| Term | Meaning |
|---|---|
| Speed layer | Fast, low-latency, approximate — often streaming |
| Batch layer | Slow, thorough, exact — periodic reprocessing |
| Serving layer | Combines both into one presented answer |
| Codepath drift | The real risk of maintaining the same logic twice, in two engines |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
is maintaining two separate implementations of the same aggregation
logic Lambda's real cost, not just an inconvenience?
