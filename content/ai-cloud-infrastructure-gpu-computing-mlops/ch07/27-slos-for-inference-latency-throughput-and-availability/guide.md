# Lesson 27 — SLOs for Inference: Latency, Throughput, and Availability

**Chapter 7 · Scaling and Reliability for AI Infrastructure · Lesson 3 of 4**

## What you'll learn

- How the SRE concepts of SLI, SLO, and error budget from earlier in
  this path apply directly to an inference service — and why that
  mapping isn't automatic, it has to be defined deliberately
- Why inference needs three separate SLOs — latency, throughput, and
  availability — instead of one combined "is it up" number
- How to write a precise SLI for each of the three, specific enough
  to alert on
- What's genuinely different about GPU-backed inference that a
  generic web-service SLO definition misses

## SLOs don't transfer automatically — they have to be re-derived

You already know the vocabulary: an **SLI** is a measured indicator
(request latency, success rate), an **SLO** is the target you commit
to for that indicator, and an **error budget** is the allowed amount
of SLO violation before you stop shipping risk and start paying it
down. None of that changes for inference. What changes is that a
generic "99.9% of requests succeed" SLO, lifted unmodified from a
typical web service, misses almost everything that actually matters
for a model-serving endpoint — because an inference request can be
"successful" by HTTP status code and still miss its real target by
being too slow, or by arriving during a period where the service can't
sustain the load it's receiving.

## Why one SLO isn't enough: latency, throughput, and availability fail independently

Inference needs three distinct SLOs because each one can be violated
while the other two look fine:

- **Latency (p99)** — the response time of the slowest 1% of
  requests, not the average. A model that's fast for 99% of callers
  and brutally slow for the rest still fails any user who lands in
  that tail, and averages hide that completely.
- **Throughput** — the sustained request (or token) rate the service
  can serve *while still meeting its latency SLO*, not its raw
  theoretical maximum. A GPU that can technically process more
  requests per second only by making every request slower isn't
  meeting a throughput target, it's trading one SLO for another.
- **Availability** — the fraction of requests that get a correct,
  timely response at all, distinct from both of the above. A service
  can be fast and under-loaded and still be unavailable, because a
  GPU process crashed, ran out of memory, or a model failed to load.

A dashboard that only tracks "is the endpoint up" will miss a latency
SLO breach entirely, and a dashboard that only tracks average latency
will miss both a tail-latency problem and an availability problem.
You need all three, measured separately.

## Writing SLIs precise enough to alert on

Vague SLOs ("inference should be fast and reliable") don't drive
anything. Each SLI needs a precise definition — where it's measured,
over what window, and what counts:

```
# Illustrative SLI definitions for an inference endpoint
latency_sli:   % of requests with end-to-end latency < 300ms,
               measured at the load balancer, 5-minute rolling window
throughput_sli: sustained requests/sec the service serves while
                latency_sli stays >= 99%, measured over a 1-hour window
availability_sli: % of requests returning a non-error, non-timeout
                   response, measured at the load balancer
```

Notice throughput's SLI is defined *conditionally* on latency — that's
deliberate. A number like "handles 500 req/sec" is meaningless without
saying what happens to latency at that load; the real target is the
highest sustained rate the service can serve without breaking its
latency commitment.

## What's different for GPU-backed inference specifically

A generic SLO framework misses two failure modes that are specific to
GPU-backed serving. First, **cold starts**: a replica that hasn't
loaded model weights into VRAM yet can take minutes to become ready,
so a latency SLO measured across a scaling event, not just steady
state, will catch a real-world tail-latency spike a CPU-service SLO
definition wouldn't anticipate. Second, **GPU-specific failure modes**
— an out-of-memory crash, a driver fault, a model that fails to load —
hit availability in a way a generic "process is running" health check
can miss if it doesn't actually exercise the model. Both deserve their
own SLI, not just a slice of a generic "errors" bucket.

## Key terms

| Term | Meaning |
|---|---|
| p99 latency | The response time of the slowest 1% of requests — the metric a tail-latency SLO is written against, not the average |
| Throughput SLO | The sustained request/token rate a service can serve while still meeting its latency SLO, not its theoretical maximum |
| Availability SLO | The fraction of requests receiving a correct, timely response, distinct from both latency and throughput |
| Error budget | The allowed amount of SLO violation before risk-taking (deploys, experiments) is paused in favor of reliability work |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
can an inference service violate its latency SLO while its
availability SLO still looks perfectly healthy, and why does a
throughput SLO need to be defined conditionally on latency rather than
as a standalone number?
