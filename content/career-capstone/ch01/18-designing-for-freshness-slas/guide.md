# Lesson 18 — Designing for Data Freshness SLAs

**Chapter 1 · System Design for Data Engineers · Lesson 18 of 81**

## What you'll learn

- What makes a freshness SLA an actual, checkable number
- Why Lesson 5's processing model choice sets the ceiling on freshness
- The freshness-vs-cost trade-off, made concrete
- How freshness actually gets measured, end to end

## A freshness SLA is a number, not a vibe

"Near real-time" is marketing language, not a requirement. A
**freshness SLA** is a specific, checkable claim: *data available for
query is never more than N minutes older than the event that produced
it.* "No more than 15 minutes stale" can be tested. "Near real-time"
can't. This is Lesson 2's functional vs. non-functional split in
practice — freshness is a non-functional requirement, and like every
non-functional requirement, it's worthless until it's a number
someone can measure a pipeline against.

```
Vague:     "the dashboard should be pretty current"
Concrete:  "on-hand inventory in the dashboard reflects any sale
            that happened more than 5 minutes ago, with 99% of
            updates landing inside 2 minutes"
```

## The processing model sets the ceiling

Lesson 5's batch, streaming, or hybrid choice isn't just an
architecture decision — it mechanically caps what freshness is even
achievable, before a single line of pipeline code exists:

```
Nightly batch job         --> freshness measured in HOURS
Micro-batch every 5 min   --> freshness measured in MINUTES
True event streaming      --> freshness measured in SECONDS
(Fabric Eventstreams + KQL, Fabric Lessons 19/21)
```

You cannot promise a 5-minute SLA on top of a nightly batch job, no
matter how the SLA is worded — the processing model already decided
the answer. This is why the freshness SLA belongs *early* in a
design, right alongside the processing-model choice from Lesson 5,
not bolted on afterward as a dashboard refresh setting.

## Freshness costs money

Lower latency is not free. A pipeline that must react in seconds
generally needs compute running continuously — an Eventstream and a
KQL database staying warm around the clock — versus a batch job that
spins up once a night and shuts back down:

```
Freshness      Typical cost shape
----------     -------------------------------------------
Hours          One scheduled batch run; compute idle otherwise
Minutes        Frequent micro-batches; compute mostly idle, bursty
Seconds        Continuously running streaming compute; always-on cost
```

The honest design conversation isn't "how fresh can we make this" —
it's "how fresh does this specific consumer actually need it to be,
and is anyone willing to pay for that." A nightly merchandising report
and a live restock trigger can sit in the same platform with two
completely different SLAs, each costed to match.

## Measuring it end to end

A freshness SLA is only real if it's measured, not assumed. The
metric is the gap between when an event happened and when it became
queryable — `available_at - event_time`. Out-of-order and late
-arriving events make this harder than it sounds: Fabric Lesson 33's
watermarking is exactly the mechanism that decides how long a
streaming pipeline waits for late data before declaring a window
final. A tighter watermark hits the SLA sooner but risks finalizing a
window before all its data has arrived; a looser watermark is more
complete but slower — freshness and completeness trade against each
other, not just freshness and cost.

## Key terms

| Term | Meaning |
|---|---|
| Freshness SLA | A checkable claim about max staleness (event_time to available_at) |
| Processing-model ceiling | The batch/streaming/hybrid choice mechanically bounds achievable freshness |
| Watermark | The mechanism deciding how long to wait for late data before finalizing |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
is "the dashboard should be near real-time" not actually an SLA, and
what would make it one?
