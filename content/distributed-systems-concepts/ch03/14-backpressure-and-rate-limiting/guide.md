# Backpressure and Rate Limiting

Lesson 12 introduced Salesforce's governor limits as a real example of rate limiting, and Lesson 13 named failure as the normal condition a system must be designed around. This lesson goes deeper on the specific mechanisms that keep an overloaded system from collapsing under more work than it can handle: backpressure and rate limiting.

## What you'll learn

- The difference between backpressure and rate limiting
- What happens to a system with no backpressure at all
- Token bucket and leaky bucket, the two classic rate-limiting algorithms
- Load shedding as the last line of defense

## Backpressure vs. rate limiting

**Backpressure** is a system signaling upstream, based on its *current* condition, that it cannot keep up and the sender should slow down — a dynamic, reactive response to real-time load. **Rate limiting** is a deliberate cap on request rate set in advance, enforced regardless of whether the system happens to be busy right now. The two solve a related problem differently: backpressure reacts to actual conditions, while rate limiting enforces a predetermined ceiling (the governor-limit style cap from Lesson 12 is a rate limit, not backpressure, since it applies the same way whether the platform is under heavy load or nearly idle).

## What happens without backpressure

If a fast producer keeps sending work to a slower consumer with no mechanism to signal "slow down," the work has to go somewhere — typically an ever-growing queue sitting in memory. An unbounded queue eventually exhausts available memory, and the process can crash or become so slow that it effectively stops serving anyone, including requests that have nothing to do with the original overload. This is the same resource-exhaustion mechanism behind the cascading failures from Lesson 10 — backpressure is what prevents that growth from ever starting.

## Token bucket and leaky bucket

- **Token bucket**: a bucket holds up to some maximum number of tokens, refilled at a steady rate. Each request consumes one token; if the bucket is empty, the request is rejected or delayed. This naturally allows short bursts (as long as tokens have accumulated) while still enforcing a steady average rate over time.
- **Leaky bucket**: incoming requests fill a bucket of fixed capacity; the bucket "leaks" (processes requests) at a constant rate regardless of how fast it's filling. If the bucket overflows, new requests are dropped. This produces a strictly smooth, constant output rate — it doesn't allow the bursts that token bucket does.

Both are standard, well-understood algorithms for enforcing a rate limit; the choice between them comes down to whether bursts above the average rate should be allowed (token bucket) or smoothed out entirely (leaky bucket).

## Load shedding: the last resort

Even with rate limiting in place, a system can still be pushed past what it can handle — a traffic spike larger than anticipated, or a dependency slowdown that reduces effective capacity. **Load shedding** means deliberately rejecting or dropping some incoming work rather than trying (and failing) to serve all of it, prioritizing the requests that matter most if possible. A system that sheds load gracefully — returning a fast, clear "try again later" to some requests — stays healthy and keeps serving everyone else. A system that doesn't shed load at all risks the alternative: struggling to serve everyone badly, or crashing and serving no one.

## Key terms

- **Backpressure** — a system signaling upstream, based on current load, to slow down
- **Rate limiting** — a predetermined cap on request rate, independent of current load
- **Token bucket** — a rate-limiting algorithm that allows bursts up to an accumulated token balance
- **Leaky bucket** — a rate-limiting algorithm that enforces a strictly constant processing rate
- **Load shedding** — deliberately rejecting some work to protect the system's ability to serve the rest

## Recap

Backpressure reacts to real-time load, rate limiting enforces a predetermined ceiling, and load shedding is the last-resort safety valve when both still aren't enough — together, they're what keeps a system from collapsing under more demand than it can serve. Next, in Lesson 15, you'll see how a system tells you it's approaching that point at all: observability.
