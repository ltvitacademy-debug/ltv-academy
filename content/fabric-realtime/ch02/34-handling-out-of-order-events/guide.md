# Lesson 34 — Handling Out-of-Order Events

**Chapter 2 · Real-Time Data Engineering · Lesson 34 of 70**

## What you'll learn

- Out-of-order arrival — not the same problem as lateness past a watermark
- Detecting the gap between EventTime and ingestion time in KQL
- Practical options: reorder, tolerate, or route elsewhere
- Why "just sort by EventTime" isn't a real fix on its own

## Two different problems that get confused

Lesson 33's watermark deals with events that arrive **too late** —
past the declared tolerance entirely. **Out-of-order** is a
related but distinct problem: events that arrive within tolerance,
just not in the same sequence they actually happened in. A network
retry, a load balancer routing two events down different paths, or
simply two producers writing at nearly the same instant can all
cause event #2 to physically arrive before event #1, even though
both land safely inside the watermark's grace period.

## Spotting it in KQL

```kql
RawTripEvents
| extend ArrivalGap = ingestion_time() - EventTime
| where ArrivalGap > 30s
| project TripId, EventTime, ArrivalGap
| order by ArrivalGap desc
```

This doesn't fix anything — it just makes the gap visible.
`ingestion_time() - EventTime` shows exactly how stale each event
was on arrival, which is the first step toward deciding whether
out-of-order arrival is even a meaningful problem for your specific
use case.

## Why "just sort by EventTime" isn't a real fix

Sorting the *output* of a finished window by `EventTime` is easy
and often sufficient for a report. But it doesn't help a window
that's still *open* and needs to aggregate correctly as data
streams in — a window's running total already includes whatever
events have arrived so far, in whatever order they arrived, by the
time you'd want to sort anything. Sorting is a display-time fix, not
a computation-time fix.

## Three practical options

1. **Tolerate it** — for a `count()` or `sum()`, arrival order
   genuinely doesn't matter; the aggregate is the same either way.
   Most of this chapter's aggregations already fall here.
2. **Widen the watermark** — if out-of-order arrival is common and
   the values do depend on order (a running balance, a sequence
   number check), a longer watermark tolerance buys more time for
   things to settle before the window closes.
3. **Route it separately** — genuinely problematic out-of-order
   events (ones that fail a sequence check) can be sent to a
   distinct destination for manual review, using the same
   Eventstream routing logic covered next in Lesson 36.

## Key terms

| Term | Meaning |
|---|---|
| Out-of-order | Arrives within tolerance, but not in the sequence it happened |
| `ingestion_time() - EventTime` | KQL's way to measure how stale an event was on arrival |
| Tolerate vs. route | Most aggregations don't care about order; some genuinely do |

## Check yourself

You're ready for Lesson 35 when you can explain, without looking: why
does sorting a finished window's output by EventTime not actually
fix anything about how that window computed its aggregate?
