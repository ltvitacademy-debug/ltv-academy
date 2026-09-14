# Lesson 23 — Case Study: A Social Media Analytics Pipeline

**Chapter 1 · System Design for Data Engineers · Lesson 23 of 81**

## What you'll learn

- Why back-of-the-envelope estimation matters before anything else here
- How sharding by content_id, not by time, prevents a viral hot spot
- Why a trending-content leaderboard is the textbook caching use case
- Why this platform leans AP for the same reason Lesson 19 predicts

## Estimate the scale before designing anything

Lesson 3's back-of-the-envelope estimation matters more here than in
any other case study, because the defining challenge is *volume*, not
complexity: engagement events (likes, shares, comments, views) arrive
at a rate ordinary systems aren't built for.

```
Rough estimate:
  100M daily active users x 50 engagement events/day
    = 5B engagement events/day  (~58,000 events/second average --
      and a viral moment can spike that 100x on a handful of posts)
```

That last clause is the entire design problem: the spike doesn't hit
the system evenly, it hits *specific posts*.

## Sharding by content_id, not by time

A naive ingestion design shards by time bucket or by a round-robin
key. That fails here: when one post goes viral, every engagement
event for that one `content_id` piles onto whichever shard happens to
own it — Lesson 10's sharding strategy has to shard by `content_id`
(hashed) specifically so a single viral post's write volume gets
spread across many shards, not concentrated on one:

```
Sharded by content_id hash:
  hash(content_id) % N  --> even viral posts spread their writes
                             across all N shards, not one

Sharded by time bucket only:
  all of today's writes  --> one bucket, including every write
                              for today's one viral post
```

## Caching the trending leaderboard

A "what's trending right now" leaderboard is read enormously more
often than it's written — millions of app opens check it every
minute, while the underlying counts change comparatively slowly.
Lesson 16's caching strategies apply directly: compute the leaderboard
on a short interval (say, every 10-15 seconds) from the streaming
aggregation, and serve every read from that cached result instead of
recomputing it per-request:

```
Engagement stream --> rolling count per content_id (Lesson 14)
                          |
                          v
                 leaderboard cache, refreshed every ~10-15s
                          |
                          v
              millions of reads served from cache, not recompute
```

## Leaning AP, exactly as Lesson 19 predicts

A like count that's 10-15 seconds stale is invisible to a user; a
trending pipeline that goes down during a traffic spike is not. This
platform leans AP for precisely the reason Lesson 19 laid out: the
consumer (a casual engagement count) tolerates staleness completely,
so there's no reason to sacrifice availability protecting a precision
nobody's asking for.

## Key terms

| Term | Meaning |
|---|---|
| Volume-driven design | The defining challenge here is scale, not logical complexity |
| content_id sharding | Sharding by hashed content_id spreads a viral post's writes across shards |
| Leaderboard caching | Serving a frequently-read, slowly-changing aggregate from a refreshed cache |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does sharding by content_id, rather than by time bucket, matter
specifically for a post that goes viral?
