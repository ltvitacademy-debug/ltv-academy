# Lesson 30 — Tumbling Windows

**Chapter 2 · Real-Time Data Engineering · Lesson 30 of 70**

## What you'll learn

- Tumbling windows — fixed-size, non-overlapping, back-to-back
- `bin()` as a tumbling window, formalized
- The Eventstream canvas's no-code Window transformation
- When a tumbling window is the right (or wrong) choice

## The simplest window shape

A **tumbling window** is fixed-size and non-overlapping: every
event belongs to exactly one window, windows never share any time,
and they tile back-to-back with no gaps — like tumbling dominoes,
each one falling into the next with no overlap between them.

## `bin()`, formalized

```kql
RawTripEvents
| summarize TripCount = count(), AvgFare = avg(FareAmount)
    by bin(EventTime, 5m)
```

You actually already used a tumbling window back in Lesson 26 —
`bin(EventTime, 5m)` groups every event into a 5-minute bucket, and
each bucket is computed once and never touched again. That's the
entire definition of tumbling: Lesson 26 taught you the mechanism
before this lesson gave you the vocabulary for it.

## The Eventstream canvas's Window transformation

KQL's `bin()` works once data has already landed in a KQL Database.
But the Eventstream canvas (Lesson 19) also has its own no-code
**Window** transformation node, letting you compute a tumbling
aggregate — a count, sum, or average per 5-minute chunk — as part
of the stream itself, before it ever reaches a destination. Same
concept, applied earlier in the pipeline, with a visual node
instead of a KQL clause.

## When tumbling is the right choice

Tumbling windows answer questions shaped like "every N minutes,
what happened?" — trip counts per 5 minutes, revenue per hour, a
clean, non-overlapping report. They're the cheapest window to
compute, since each event is touched by exactly one window and no
window needs to be recomputed once it closes.

## Where tumbling falls short

A tumbling window can't answer "what does the last 5 minutes look
like right now, updated every minute" — a rider on a dashboard
watching the counter jump only every 5 minutes, instead of smoothly
updating, might reasonably ask for something better. That's a
**hopping** window's job, covered next.

## Key terms

| Term | Meaning |
|---|---|
| Tumbling window | Fixed-size, non-overlapping, back-to-back — every event in exactly one window |
| `bin(EventTime, 5m)` | KQL's tumbling-window mechanism, seen already in Lesson 26 |
| Window transformation | The Eventstream canvas's no-code equivalent, computed earlier in the pipeline |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why
can't a tumbling window show a dashboard counter that updates
smoothly every minute instead of jumping every 5?
