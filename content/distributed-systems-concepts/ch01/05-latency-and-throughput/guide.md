# Latency and Throughput

This lesson closes out Chapter 1 with the two measurements that describe how fast a distributed system actually feels to use: latency and throughput. They sound similar, they're often confused for each other, and — critically for anything built from multiple networked machines — improving one does not automatically improve the other, and can even make it worse.

## What you'll learn

- Precise definitions of latency (time for one request) and throughput (requests per unit time)
- Why the two trade off against each other
- Tail latency, and why p99 and p999 matter more than the average in distributed systems
- How network hops add latency a single machine never had to pay

## Latency: the time for one request

**Latency** is the time it takes for a single request to complete, from the moment it's sent to the moment the response comes back. It's usually measured in milliseconds. A page load with 200ms latency means a user waits 200 milliseconds after clicking before they see a result. Latency is about the experience of one request, end to end.

## Throughput: requests per unit time

**Throughput** is how many requests a system can process in a given amount of time — often expressed as requests per second. A system with high throughput can serve many users at once, even if any individual one of those requests isn't especially fast. Throughput is about overall capacity, not any single user's wait time.

## Why they trade off against each other

It's tempting to assume a "faster" system is good at both, but latency and throughput often pull in opposite directions. A system can boost throughput by batching many small requests together before processing them — which increases the latency of each individual request, since some of them now sit waiting for the batch to fill. Conversely, a system tuned to minimize the latency of every single request, by processing each one immediately and in isolation, often sacrifices the efficiency gains that would come from doing work in bulk, capping how much total throughput it can achieve. Neither is universally "better" — the right tradeoff depends on whether the system serves live, interactive users (favor latency) or does bulk background processing (favor throughput).

## Tail latency: why the average lies

**Tail latency** refers to the slowest requests in a distribution — commonly described using percentiles like **p99** (the 99th percentile: the response time that 99% of requests beat) or **p999** (99.9%). In a distributed system, these matter far more than the average, for a specific reason: a single user request often fans out to call several downstream services at once, and the overall response can only be as fast as the *slowest* of those calls. If a request depends on twenty downstream services, and each one is slow just 1% of the time, there's a real chance at least one of those twenty is in its slow 1% on any given request — so a large share of overall requests end up dragged down by a single slow dependency, even though each dependency looks fine "on average." Optimizing p99 and p999, not just the average, is how distributed systems stay fast for nearly all users, not just typical ones.

## Network hops add latency a single machine never had

On one machine, a function call is effectively instant — no network is involved. In a distributed system, every time one machine has to call another, that call has to cross a network, and the trip itself takes time that a single-machine program never had to pay. A request that fans out to five services, each one across a network, pays for five network round trips before the response can even be assembled — latency that didn't exist until the system became distributed in the first place. This is exactly the fallacy from Lesson 1 made concrete: latency is not zero, and every hop adds to the total.

## Key terms

| Term | Meaning |
|---|---|
| Latency | The time for a single request to complete, end to end |
| Throughput | The number of requests a system can process per unit time |
| Tail latency | The slowest requests in a distribution, often measured as p99 or p999 |
| Network hop | A single call from one machine to another, each adding real travel time |

## Recap

Latency and throughput describe different things — one request's wait time versus total capacity — and they trade off against each other, with tail latency and network hops both working against a distributed system's speed. That closes Chapter 1's foundations. Chapter 2 opens with Lesson 6: asynchronous systems.
