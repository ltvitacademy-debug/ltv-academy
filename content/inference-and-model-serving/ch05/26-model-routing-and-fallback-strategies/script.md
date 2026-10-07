# Script — Model Routing & Fallback Strategies

## Segment 1 (title)

The last lesson covered running several models behind one platform. This lesson covers the decision layer in front of them: given an incoming request, which model should actually handle it, and what happens when the one it's sent to is slow, overloaded, or down?

## Segment 2 (steps)

A single do-everything model is simple but rarely the cheapest or best fit for every request. A router can send each request to the model that actually matches it — by cost tier, sending easy requests to a cheap model; by capability, sending a classification task to a specialist; or by tenant, giving paying customers more capacity.

## Segment 3 (steps)

The most common pattern is a cascade: try a cheap, fast model first, check whether its answer clears a confidence bar, and only escalate to a larger, more expensive model when it doesn't. That routes most easy requests cheaply while still giving hard ones access to the bigger model.

## Segment 4 (code)

Here's the core of that pattern in a few lines: call the small model, check its confidence against a threshold, and escalate to the large model only if it falls short.

## Segment 5 (steps)

Routing is also about resilience. A bounded timeout stops a slow model from blocking forever; retries use backoff and jitter so one slow model doesn't turn into a self-inflicted traffic storm; and a circuit breaker tracks failure rate, trips once it crosses a threshold, and stops sending requests to a failing model for a cooldown period.

## Segment 6 (outro)

A router can send easy requests to a cheap model and escalate the hard ones, while timeouts, backoff, and circuit breakers keep a struggling model from taking the system down with it. Up next, lesson twenty-seven: where should this infrastructure actually live — centrally, or out at the edge?
