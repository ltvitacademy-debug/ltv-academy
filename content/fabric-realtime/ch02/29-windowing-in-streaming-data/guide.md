# Lesson 29 — Windowing in Streaming Data

**Chapter 2 · Real-Time Data Engineering · Lesson 29 of 70**

## What you'll learn

- Why an infinite stream can't be aggregated the way a finite table can
- What a "window" actually is — a time-bounded slice of a stream
- Event time vs. processing time — and why the distinction matters
- The four window types you'll build in Lessons 30–33

## Why "summarize by" needs a boundary

A finite table has an end — `summarize count() by VendorId` just
runs once and finishes. A stream never ends. If you tried to run
`summarize TripCount = count()` with no time boundary at all
against `RawTripEvents`, the answer would just keep growing forever
and never actually finish computing. Lesson 26's `bin()` function
already gave you a first taste of the fix: bucket time into
fixed-size chunks, and aggregate each bucket separately as it
closes.

## What a window actually is

A **window** is a time-bounded slice of a stream — a boundary that
says "aggregate everything that falls between this timestamp and
that one, then close this bucket and start the next." Every
streaming system needs this concept in some form: Databricks &
Delta Lake's Structured Streaming (Lesson 33) has it too, using
nearly identical vocabulary, because the underlying problem —
infinite input, finite output — is the same regardless of engine.

## Event time vs. processing time

```kql
RawTripEvents
| where EventTime  > ago(1h)   // when the trip actually happened
| where IngestionTime > ago(1h) // when Fabric received the event
```

**Event time** is when something actually happened at the source —
a taxi trip's real pickup timestamp. **Processing time** is when
the system received or processed the event. Network delays, retries,
and out-of-order delivery mean these two are almost never identical
in a real system. Which one you window on changes your answer:
windowing on event time gives you "what happened during 2–3pm,"
even if some of those events straggled in at 3:15.

## The four window types ahead

| Lesson | Window type | Behavior |
|---|---|---|
| 30 | Tumbling | Fixed-size, non-overlapping, back-to-back |
| 31 | Hopping / Sliding | Fixed-size, but overlapping — one event can land in multiple windows |
| 32 | Session | Variable-size, closes after a gap of inactivity |
| 33 | Watermarks | How a system decides a window is "done" despite late data |

Each of these solves a different shape of question — "every 5
minutes" (tumbling), "a rolling 5-minute average updated every
minute" (hopping), or "how long was this rider's session of app
activity" (session). You'll build all four against the same
`RawTripEvents` stream so the differences are concrete rather than
abstract.

## Key terms

| Term | Meaning |
|---|---|
| Window | A time-bounded slice of an otherwise-infinite stream |
| Event time | When something actually happened at the source |
| Processing time | When the system received or processed it |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why
does an unbounded `summarize count()` against a live stream never
actually finish, and what does a window boundary fix about that?
