# Lesson 21 — Cost-Aware Scaling

**Chapter 4 · Scaling & Reliability · Lesson 21 of 25**

## What you'll learn

- Why GPU-backed inference makes "just autoscale" a direct line to a much
  bigger bill than a typical web service
- The three levers this chapter already gave you, read specifically as
  cost controls
- Spot/preemptible instances as a real discount with a real catch
- Why an alert on cost itself, not just on traffic, is part of a complete
  scaling strategy

## Why this chapter is also a cost chapter

Every pattern in Chapter 4 so far was framed around reliability and
latency. Each one is also, directly, a cost decision — because GPU
instances are priced meaningfully higher per hour than typical CPU
instances, and autoscaling that's correct for reliability can still be
expensive if nothing is watching the bill.

## Rereading this chapter's levers as cost controls

```
Max instances (Lesson 17):
  the hard ceiling on how much a traffic spike (or a bug)
  can cost you -- the single most direct cost control

Caching (Lesson 19):
  every cache hit is an inference call you don't pay for

Queueing (Lesson 20):
  absorbs a burst with EXISTING capacity instead of
  immediately paying for new instances
```

Nothing here is a new mechanism — it's the same three levers from
earlier in this chapter, just read through a cost lens instead of a
reliability lens. A well-tuned max instances ceiling, a working cache,
and a queue that can absorb short bursts are, together, most of a cost
strategy already.

## Spot / preemptible instances: a real discount, a real catch

```
On-demand GPU instance:  full price, never reclaimed by the cloud
Spot/preemptible instance: 60-90% cheaper, BUT can be reclaimed
  by the cloud provider with little warning (seconds to minutes)

Good fit: batch inference jobs, non-urgent background work,
  anything that can checkpoint progress and resume
Bad fit: a user is actively waiting on this specific request
```

The discount is real and large, but so is the catch: your workload has
to tolerate losing an instance mid-task. That usually means spot
instances fit the queue-and-worker pattern from Lesson 20 far better
than a synchronous, user-waiting request path — a reclaimed worker just
means the job gets retried by another worker, not that a user sees an
error.

## Alert on the bill itself

```
Traffic/latency alerts answer:  "is the service healthy?"
Cost alerts answer:             "is the service still cheap
                                  enough to keep running this way?"
```

A service can be perfectly healthy — fast, no errors, autoscaling working
exactly as configured — and still be quietly burning far more money than
expected, because "working as configured" and "configured sensibly" are
different questions. A budget alert that fires on spend, independent of
whether anything looks broken, is what actually catches that case.

## Key terms

| Term | Meaning |
|---|---|
| Max instances as cost control | The hard ceiling on worst-case scaling cost |
| Spot / preemptible instance | Deeply discounted compute that can be reclaimed with little warning |
| Cost alert | A budget-based alert, independent of traffic or error-rate alerts |

## Check yourself

You're ready for the Chapter 5 capstone when you can explain: why do spot
instances fit a queue-and-worker architecture better than a synchronous
request a user is actively waiting on?
