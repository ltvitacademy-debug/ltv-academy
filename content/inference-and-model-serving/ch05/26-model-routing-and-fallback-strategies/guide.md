# Model Routing & Fallback Strategies

Lesson 25 covered running several models behind one platform. This lesson covers the decision layer in front of them: given an incoming request, which model should actually handle it, and what happens when the one it's sent to is slow, overloaded, or down?

## What you'll learn

- Why routing to the right model, instead of always using one, saves cost and improves quality
- Cascade routing: trying a cheap model first and escalating only when needed
- Timeout, retry, and backoff patterns for a model that's slow or failing
- The circuit breaker pattern, and why it's safer than retrying forever

## Why route instead of picking one model

A single "do everything" model is simple, but usually not the cheapest or the best fit for every request. A router sitting in front of multiple models can send each request to the one that actually matches it:

- **By cost tier** — easy, high-volume requests go to a small, cheap model; only the ones that need it reach an expensive, larger one
- **By capability** — a classification task goes to a small specialist classifier instead of a general-purpose chat model
- **By tenant or plan** — a paying customer's requests might route to a higher-capacity pool than a free-tier request

## Cascade routing

The most common cost-saving pattern is a cascade: try the cheap, fast model first, check whether its answer is good enough, and only escalate to the larger, more expensive model when it isn't.

"Good enough" is usually judged by a confidence signal — a classifier's output probability, a length or format check, or in some pipelines a second, cheap model scoring the first one's answer. If the cheap model's confidence clears the bar, its answer ships; if not, the request escalates. In practice this routes the large majority of easy requests to the cheap model, while still giving hard ones access to the expensive one — closer to the best of both worlds than picking one tier for everything.

```python
def route_request(prompt):
    draft = call_small_model(prompt)
    if draft.confidence >= CONFIDENCE_THRESHOLD:
        return draft.answer
    return call_large_model(prompt)  # escalate
```

## Fallback on failure

Routing isn't only about cost — it's also about resilience. A model endpoint can be slow, overloaded, or simply down, and a request shouldn't just fail outright when that happens:

- **Timeout** — give the primary model a bounded amount of time to respond before giving up on it
- **Retry with backoff and jitter** — a brief retry can absorb a transient blip, but retrying instantly and repeatedly on every client turns one slow model into a self-inflicted traffic storm; add increasing delay and a small random jitter between attempts
- **Fallback model** — if the primary is unavailable, route to a secondary model (even a lower-quality one) rather than return an error

## Circuit breakers

Retrying a model that's genuinely down just adds load to an already struggling system. A circuit breaker tracks recent failure rate for a given model; once failures cross a threshold, it "trips" and stops sending new requests to that model for a cooldown period, routing to the fallback instead. After the cooldown, it allows a small number of test requests through — if they succeed, the breaker closes and normal routing resumes; if they fail, the cooldown restarts.

## Key terms

| Term | Meaning |
|---|---|
| Cascade routing | Trying a cheap model first, escalating to a larger one only when needed |
| Backoff with jitter | Increasing delay plus randomness between retries, to avoid retry storms |
| Circuit breaker | Stops sending requests to a failing model for a cooldown period |
| Fallback model | A secondary model used when the primary is unavailable or too slow |

## Recap

A router can send cheap, easy requests to a cheap model and escalate only the hard ones, while timeouts, backoff, and circuit breakers keep a struggling model from taking the whole system down with it. Next up, Lesson 27: where should that serving infrastructure actually live — centrally in the cloud, or out at the edge?
