# Lesson 31 — Hopping and Sliding Windows

**Chapter 2 · Real-Time Data Engineering · Lesson 31 of 70**

## What you'll learn

- Hopping (sliding) windows — fixed-size, but overlapping
- Why one event can land in more than one window
- The Eventstream canvas's Sliding window type
- Hopping vs. tumbling — same data, two different answers

## Overlap, on purpose

A **hopping window** (Fabric's canvas calls this a **sliding**
window) is still fixed-size, like a tumbling window, but it
advances — "hops" — by an interval smaller than its own length.
A 5-minute window that hops every 1 minute produces a new result
every minute, each one covering the trailing 5 minutes: 12:00–12:05,
then 12:01–12:06, then 12:02–12:07, and so on. Any single event
now falls inside multiple windows at once, which never happens with
a tumbling window.

## The Eventstream canvas's Sliding window type

```
Eventstream canvas -> Window transformation
  Window type: Sliding
  Window size:  5 minutes
  Hop size:      1 minute
  Aggregation:  count(), sum(FareAmount)
```

The same no-code Window transformation node from Lesson 30 offers a
**Sliding** window type alongside Tumbling — set a window size and
a hop size, and Fabric computes the overlapping aggregate for you,
emitting a fresh result every time the window hops forward.

## Hopping vs. tumbling — same data, two answers

| | Tumbling (Lesson 30) | Hopping / Sliding |
|---|---|---|
| Overlap | None — each event in exactly one window | Yes — one event can be in several windows |
| Output cadence | Once per window length | Once per hop, more frequent |
| Feels like | A report, refreshed every N minutes | A rolling average, always current |

A dashboard tile showing "trips in the last 5 minutes," refreshed
every minute (Lesson 28's auto-refresh), is a textbook hopping
window — the trailing 5-minute view keeps sliding forward smoothly
instead of jumping in 5-minute jolts.

## The cost of the overlap

Hopping windows cost more to compute than tumbling ones — every
event gets touched by several overlapping windows instead of just
one — which is exactly the tradeoff you're making for that smoother,
more frequent output. Fine for a dashboard tile; wasteful for a
nightly summary report that only needs one number per day.

## Key terms

| Term | Meaning |
|---|---|
| Hopping / sliding window | Fixed-size, overlapping — advances by a hop smaller than its length |
| Hop size | How far the window advances between each computed result |
| One event, several windows | The defining difference from a tumbling window |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why
does a hopping window cost more to compute than a tumbling window
covering the same data?
