# Lesson 41 — A Real-Time NYC Taxi Dashboard, Start to Finish

**Chapter 2 · Real-Time Data Engineering · Lesson 41 of 70**

## What you'll learn

- Assembling every piece from Lessons 18–40 into one working pipeline
- The full path: source → Eventstream → KQL Database → dashboard → alert
- Where each design decision from this chapter actually shows up
- What "done" looks like for a real-time system, end to end

## The complete pipeline

```
1. Event Hub source          (Lesson 20) -- simulated NYC Taxi trip events
2. Eventstream ingestion      (Lesson 19) -- source -> transformation -> destination
3. Filter + Manage Fields     (Lesson 35) -- drop bad rows, shape fields early
4. Window (Sliding, 5m/1m)    (Lesson 31) -- rolling trip count & avg fare
5. KQL Database destination   (Lesson 21) -- RawTripEvents lands here
6. KQL queries                (Lessons 22-27) -- where/project/summarize/joins
7. Real-Time Dashboard         (Lesson 28) -- tiles, auto-refresh, cross-filter
8. Activator rule              (Lesson 37) -- alert on FareAmount > 200
```

Every numbered step here is a lesson you've already built toward —
this lesson's only job is showing how they chain together into one
system, rather than eight separate ideas.

## The dashboard's core tile query

```kql
RawTripEvents
| where EventTime > ago(15m)
| summarize TripCount = count(),
            AvgFare   = avg(FareAmount)
    by bin(EventTime, 1m)
| render timechart
```

This is Lesson 28's tile mechanism, Lesson 30's tumbling `bin()`,
and Lesson 22's `where` operator, combined into a single query — a
rolling 15-minute view of trip volume and average fare, refreshing
every minute.

## The Activator rule watching it

```
Object:     Trip
Property:   FareAmount
Rule:       FareAmount > 200  (change, not threshold)
Action:     notify #dispatch-alerts on Teams
```

Lesson 37's threshold-vs-change distinction matters here: this rule
fires once per trip that crosses $200, not repeatedly for every
re-evaluation while a high fare is technically still "current."

## What "done" actually looks like

A working real-time system isn't just "data arrives somewhere." It's
every layer from this chapter functioning together: bad data
filtered before it lands (Lesson 39), late and out-of-order events
handled deliberately rather than by accident (Lessons 33–34), a
dashboard a dispatcher could actually use (Lesson 28), and an alert
that fires exactly once when something needs attention (Lesson 37).
Missing any one layer doesn't crash the system — it just means
something goes quietly wrong somewhere downstream, unnoticed until
it's a bigger problem.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end pipeline | Every layer from source to alert, functioning together |
| "Done" for real-time | Not just "data arrives" — filtered, windowed, dashboarded, and alerted correctly |

## Check yourself

You're ready for Lesson 42 when you can explain, without looking: name
every stage this pipeline passes through, from the Event Hub source
to the Teams alert, in order.
