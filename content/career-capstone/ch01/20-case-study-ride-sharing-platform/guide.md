# Lesson 20 — Case Study: A Ride-Sharing Analytics Platform

**Chapter 1 · System Design for Data Engineers · Lesson 20 of 81**

## What you'll learn

- How to state requirements and grain for a real, multi-signal system
- Why this platform needs two different storage paths, not one
- Where Kappa architecture and partitioning actually earn their keep here
- How a freshness SLA differs by consumer, on the same platform

## The scenario and its requirements

A ride-sharing platform ingests two very different signals: **driver
location pings** (continuous, high-volume, short-lived) and **trip
events** (start, en route, complete — lower volume, long-lived,
analytically valuable forever). Lesson 2's functional/non-functional
split, applied here:

```
Functional:      match a rider to a nearby driver; compute a live
                 surge multiplier per zone; report trip history
Non-functional:  driver location must be < 10 seconds stale to
                 support matching (Lesson 18's freshness SLA);
                 trip analytics can tolerate 15 minutes stale
```

Two requirements, two SLAs, on the same platform — this alone means
one processing model won't cleanly serve both.

## Two grains, two storage paths

Lesson 8's grain question has two different right answers here, not
one: "one row per location ping" and "one row per trip event" are
both real fact tables with very different shapes. Location pings are
enormous in volume and only useful for a few minutes; trip events are
smaller in volume and useful indefinitely. Lesson 4's storage choice
follows directly:

```
Driver location pings --> a low-latency, frequently-overwritten
                          store for live matching (not object storage
                          -- it needs to answer "where is driver X
                          right now," not scan history)
Trip events           --> Delta Lake on object storage (Lesson 4),
                          the durable, replayable source Kappa needs
```

## One streaming pipeline, two jobs

Lesson 7's Kappa architecture fits both signals: driver pings and
trip events flow through the *same* streaming pipeline that (a)
updates the live matching store and the live surge multiplier per
zone, and (b) lands durably in Delta Lake for replay and historical
analytics. There's no separate batch job recomputing surge pricing
from scratch — if the surge logic needs a bug fix, it's replayed
through the one pipeline, exactly as Lesson 7 described.

```
Driver pings + trip events
        |
        v
  ONE streaming pipeline (Kappa)
   |-- live surge multiplier per zone --> matching / rider app
   |-- durable landing in Delta Lake  --> replay + BI (Lesson 8's
                                            star schema: FactTrip,
                                            DimDriver, DimZone, DimDate)
```

## Partitioning and sharding at ride-sharing scale

Lesson 9's partitioning applies to the trip fact table: partition by
trip date and city, since almost every analytical query filters by
one or both. Lesson 10's sharding applies to the *live* location
store: sharding by geohash or city keeps one city's ping volume from
overwhelming a single shard — without it, a launch-day surge in one
city becomes a hot spot that slows down matching everywhere.

## Key terms

| Term | Meaning |
|---|---|
| Two-grain design | Location pings and trip events are separate fact tables with different shapes |
| Live matching store | A low-latency store answering "where is this driver right now" |
| Surge multiplier | A per-zone value computed live from the same streaming pipeline as trip landing |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why
does this platform need two different storage paths for driver
location pings versus trip events, instead of one?
