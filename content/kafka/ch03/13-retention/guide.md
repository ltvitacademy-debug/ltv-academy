# Lesson 13 — Retention

**Chapter 3 · Kafka Architecture Deep Dive · Lesson 13 of 30**

## What you'll learn

- The two ordinary ways Kafka decides when to delete old data: time and size
- Why whichever limit is hit first wins
- Compacted topics — a genuinely different retention model, not a variant of the other two
- Why "keep forever" and "keep the latest value per key forever" are not the same guarantee

## Retention is a setting, not a fixed rule

Lesson 1 mentioned that Kafka retains events "for a configured
retention period" — this lesson is that configuration. By default,
a topic deletes data based on two independent limits, and whichever
one is reached first triggers deletion for that segment:

```
server.properties (topic-level, overridable per topic):

log.retention.hours   = 168      # time-based: delete after 7 days
log.retention.bytes   = -1       # size-based: -1 = unlimited (off)
```

Set both, and Kafka deletes on whichever limit a partition hits
first — a burst of unusually high volume can trigger size-based
deletion well before the 7-day mark, even with the time limit set
generously. Set retention too short for your replay needs, and
Kappa-style reprocessing (Lesson 1) simply can't reach back far
enough — the data is already gone.

## Compacted topics: a genuinely different model

Time- and size-based retention both eventually delete everything.
Compacted topics don't — they keep the **latest value for every
key, forever**, and only clean up the older, superseded values for
keys that have been overwritten:

```
cleanup.policy = compact

Topic "user-profile-changelog" (key = user_id):

  Before compaction:                After compaction:
  user_id=42, {"email": "a@x.com"}  (deleted — superseded)
  user_id=99, {"email": "b@x.com"}  user_id=99, {"email": "b@x.com"}
  user_id=42, {"email": "c@x.com"}  user_id=42, {"email": "c@x.com"}
```

This is genuinely a different concept, not a longer retention
period. A compacted topic never grows unbounded the way a time- or
size-limited one is *prevented* from growing unbounded — because it
keeps deleting the old superseded records for a key, not the key
itself. It's the right model for a "latest state" changelog (a user
profile, an inventory count) — the wrong model for an event history
where every past event matters, not just the most recent one per
key.

## Choosing between the three

```
Time-based:   delete records older than N hours — good default
              for most event streams

Size-based:   delete oldest records once the partition exceeds
              N bytes — a hard ceiling on disk usage

Compacted:    keep every key's latest value forever, delete only
              the superseded older values for that key
```

None of these is strictly "better" — they answer different
questions. Time- and size-based retention answer "how much history
do I need to keep?" Compaction answers "what does the current state
look like?", which is a different question entirely.

## Key terms

| Term | Meaning |
|---|---|
| `log.retention.hours` | Time-based retention — delete data older than this |
| `log.retention.bytes` | Size-based retention — delete oldest data once a partition exceeds this |
| `cleanup.policy=compact` | Keeps the latest value per key forever, deletes only superseded older values |

## Check yourself

You're ready for Lesson 14 when you can explain: why would a
compacted topic be the wrong choice for storing every order a
customer has ever placed, but the right choice for storing that
customer's current shipping address?
