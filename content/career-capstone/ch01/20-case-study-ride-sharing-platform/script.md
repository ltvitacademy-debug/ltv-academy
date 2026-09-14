# Lesson 20 — Case Study: A Ride-Sharing Analytics Platform · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Case study: a ride-sharing analytics platform — every idea in this
chapter, applied to one real system, start to finish.

## S2 · STEPS CARD (requirements)

Two signals: driver location pings, continuous and short-lived, and
trip events, lower volume but valuable forever. Two SLAs on one
platform: location under ten seconds stale for matching, trip
analytics tolerating fifteen minutes.

## S3 · CODE CARD (two grains, two storage paths)

Location pings need a low-latency store answering "where is this
driver right now" — not object storage. Trip events land in Delta
Lake, the durable, replayable source Kappa needs for everything else.

## S4 · CODE CARD (one pipeline, two jobs)

Both signals flow through one streaming pipeline: it updates the live
surge multiplier per zone, and lands durably in Delta Lake for replay
and historical analytics. No separate batch job recomputing surge
pricing from scratch.

## S5 · OUTRO CARD

Partition the trip fact table by date and city; shard the live
location store by geohash so one city's surge doesn't become
everyone's hot spot. Next up: real-time fraud detection.
