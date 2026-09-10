# Lesson 32 — Session Windows

**Chapter 2 · Real-Time Data Engineering · Lesson 32 of 70**

## What you'll learn

- Session windows — variable-size, closed by a gap of inactivity
- Why a fixed clock (tumbling or hopping) is the wrong tool here
- The Eventstream canvas's Session window type and timeout setting
- A concrete example: one rider's session of app activity

## A window with no fixed size

Tumbling and hopping windows (Lessons 30–31) both run on a fixed
clock — every 5 minutes, every 1 minute, decided in advance. A
**session window** instead has no fixed size at all: it stays open
as long as events keep arriving close together, and only closes
once a gap of inactivity — a **timeout** — passes with nothing new
showing up.

## Why this fits activity better than a clock does

Imagine tracking a rider's session inside the taxi app: they open
the app, search a destination, request a ride, watch the driver's
location update a dozen times, then close the app. That whole burst
of activity is naturally one session — but it might last 90
seconds or 40 minutes depending on the rider, and no fixed 5-minute
tumbling window would draw a clean boundary around it. A session
window watches for a gap instead — say, 10 minutes of silence — and
closes the session there, wherever that happens to fall.

## The Eventstream canvas's Session window type

```
Eventstream canvas -> Window transformation
  Window type: Session
  Timeout:      10 minutes (of inactivity)
  Grouped by:   RiderId
  Aggregation:  count() as EventsInSession
```

Same Window transformation node as Lessons 30–31, a third window
type: **Session**, configured with a timeout instead of a fixed
size. Events are usually grouped by some key — `RiderId` here — so
each rider gets their own independently-timed sessions rather than
one global session across every rider at once.

## Comparing all three window types

| | Tumbling | Hopping / Sliding | Session |
|---|---|---|---|
| Size | Fixed | Fixed | Variable |
| Boundary set by | A clock interval | A clock interval + hop | A gap of inactivity |
| Answers | "Every N minutes, what happened?" | "What does the trailing N minutes look like, updated often?" | "How long was this burst of activity?" |

## Key terms

| Term | Meaning |
|---|---|
| Session window | Variable-size, stays open while events keep arriving, closes after a timeout |
| Timeout | The gap of inactivity that closes a session |
| Grouped by key | Sessions are usually computed per entity (per rider, per device), not globally |

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: why
would a fixed 5-minute tumbling window draw a bad boundary around a
rider's single burst of app activity?
