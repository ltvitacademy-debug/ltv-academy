# Handling Traffic Spikes

This chapter has covered autoscaling, load balancing, multi-model serving, routing, and where to physically run inference. This closing lesson asks the question that makes all of it matter: what happens when demand suddenly blows past everything you planned for — a launch, a viral moment, a client running a batch job at the worst possible time?

## What you'll learn

- Why autoscaling alone cannot fully absorb a sudden spike
- Admission control: queueing and shedding load on purpose, instead of by accident
- Priority tiers, so one customer's spike doesn't degrade everyone else
- Graceful degradation as an alternative to an outright failure

## Why autoscaling alone isn't enough

Lesson 23 already flagged the core issue: the autoscaling control loop reacts on an interval, and a new GPU replica needs time to load model weights before it's useful. A genuine spike — demand doubling or tripling in seconds — can easily outrun both of those delays. By the time enough capacity comes online, the worst of the spike may already be over, and in the meantime, requests are queuing up with nowhere to go.

This means a spike has to be handled by more than just "add more replicas" — the system also needs a deliberate policy for what happens to the requests that arrive *before* that new capacity is ready.

## Shed load on purpose

Without a plan, an overloaded server just gets slower and slower for everyone until it falls over entirely — which is the worst possible outcome. **Admission control** makes that choice deliberately instead of by accident:

- **Bounded queues** — accept requests into a queue only up to a fixed depth; once it's full, reject new ones immediately with a clear `429 Too Many Requests` (ideally with a `Retry-After` hint) rather than let the queue grow without limit and every request's latency blow up together
- **Priority tiers** — a paid or latency-sensitive tier can keep its own queue (or jump the shared one), so one tenant's burst doesn't degrade another's experience
- **Per-client rate limiting** — a token-bucket limiter caps how fast any single client can send requests, so one customer's spike doesn't consume capacity meant for everyone else

```yaml
admission_control:
  max_queue_depth: 200
  queue_timeout_ms: 3000
  on_overflow:
    status: 429
    retry_after_seconds: 2
rate_limit:
  algorithm: token_bucket
  requests_per_second: 10
  burst: 20
```

## Degrade gracefully instead of failing outright

Rejecting excess requests is honest, but it isn't the only lever. Several systems deliberately lower quality or capability under heavy load instead of refusing service entirely:

- **Fall back to a smaller, faster model** (Lesson 26's routing pattern, applied under load rather than by request difficulty) — a lower-quality answer that arrives is often better than no answer at all
- **Cap maximum output length** — a shorter response finishes faster and frees the replica for the next request sooner
- **Disable optional features** — anything non-essential (reranking, retrieval augmentation, speculative decoding's extra draft passes) can be turned off temporarily to shed compute pressure

## Standing by for the next one

A spike that was survived is also data: the queue-depth graphs, the shed-request count, and the time-to-recover all feed directly back into capacity planning (Lesson 32) for next time.

## Key terms

| Term | Meaning |
|---|---|
| Admission control | Deliberately queueing or rejecting requests once capacity is exceeded |
| Bounded queue | A request queue with a fixed maximum depth, rather than unlimited growth |
| Priority tier | A separate queue or rate limit for higher-priority traffic |
| Graceful degradation | Lowering quality or capability under load instead of failing outright |

## Recap

Autoscaling and load balancing help, but a genuine spike outruns both — bounded queues, priority tiers, and rate limits turn overload into a deliberate, controlled shedding of load instead of a slow collapse, and graceful degradation gives you a lower-quality answer instead of none at all. That closes Chapter 5. Next up, Chapter 6 opens with Lesson 29: the economics behind every one of these decisions — cost per token.
