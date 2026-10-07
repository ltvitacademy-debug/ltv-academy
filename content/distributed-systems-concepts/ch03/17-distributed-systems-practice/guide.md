# Distributed Systems Practice

This is the final lesson of Distributed Systems Concepts. Instead of new material, it's a structured review of everything the course covered, organized by chapter, plus a few practice scenarios to test whether the ideas have actually stuck. Use it as a study guide you can return to.

## What you'll learn

- A chapter-by-chapter recap of every core idea in this course
- How the ideas connect to each other, not just what each one means in isolation
- A few practice scenarios with worked answers, to check your own reasoning

## Chapter 1 recap: Distributed Systems

A distributed system is multiple independent machines coordinating over a network to look like one coherent system — with none of the shortcuts a single machine gets (no shared memory, no shared clock, no guarantee a message arrives). From there:

- **Availability** is the fraction of time a system is usable, typically expressed as "nines" (99.9%, 99.99%...), achieved mainly through redundancy and failover.
- **Scalability** is handled by scaling out (more machines, horizontal) rather than just scaling up (a bigger machine), coordinated by load balancing and partitioning.
- **Reliability** is the system working correctly over time, including under failure — distinct from availability, and achieved through replication and graceful degradation.
- **Latency and throughput** trade off against each other; tail latency (p99, not just the average) matters most, because one slow dependency can dominate a user's experience.

## Chapter 2 recap: Consistency and Communication

Because there's no shared clock, distributed systems communicate mostly **asynchronously**, and can never fully distinguish a slow node from a dead one. That uncertainty is the root of nearly everything else in this chapter:

- **Eventual consistency** (with BASE, last-write-wins, CRDTs) trades brief replica disagreement for lower latency and higher availability.
- **The CAP theorem** says a system must choose between consistency and availability specifically during an actual network partition — partition tolerance itself isn't optional.
- **Message queues and streams** decouple producers from consumers, typically guaranteeing at-least-once delivery, with true exactly-once usually really meaning "at-least-once plus deduplication."
- **Failure handling** relies on heartbeats and timeouts to infer (never confirm) failure, circuit breakers to stop cascades, and majority-vote consensus (Raft/Paxos) to safely elect a new leader.
- **Idempotency and retries** — idempotency keys plus exponential backoff with jitter are what make retrying safe rather than a second source of failure.

## Chapter 3 recap: Applying the Concepts

- **Distributed systems and Salesforce**: governor limits are rate limiting; async Apex and Platform Events are asynchronous messaging and pub/sub, applied on a real platform.
- **Designing for failure**: assume failure is constant, remove hidden single points of failure, isolate dependencies with bulkheads, and verify resilience deliberately through chaos engineering.
- **Backpressure and rate limiting**: backpressure reacts to real-time load; rate limiting (token bucket, leaky bucket) enforces a predetermined ceiling; load shedding is the last resort when both aren't enough.
- **Observability**: logs, metrics, and traces each answer a different question, tied together across services by a correlation ID — and observability means being able to ask questions you never anticipated, not just watching known metrics.
- **The case study** showed all of this applied together in one checkout scenario, including making different CAP trade-offs for different pieces of data in the same system.

## Practice scenarios

**Scenario 1**: A social media "like" counter shows slightly different counts on different devices for a few seconds after a user taps like, then settles on the same number everywhere. What consistency model is this, and is that a bug?
> *Answer*: This is eventual consistency, and it's a deliberate design choice, not a bug — a like counter benefits far more from being fast and always available than from being perfectly synchronized instantly across every device.

**Scenario 2**: A payment service calls a shipping-rate API that has started timing out intermittently. Within minutes, the payment service itself becomes slow and unresponsive to its own callers, even though nothing is wrong with payment processing itself. What pattern is this, and what two things could have prevented it?
> *Answer*: This is a cascading failure, caused by the payment service's threads/connections piling up waiting on the slow shipping API. A circuit breaker (to stop calling the failing API and fail fast) and a bulkhead (to isolate the shipping API's resource pool from everything else) would both have contained it.

**Scenario 3**: Three nodes in a cluster lose network contact with the other two for 30 seconds, then reconnect. During those 30 seconds, could the three isolated nodes and the two others both keep accepting writes to the same data?
> *Answer*: Only if the system accepts the risk of conflicting writes on both sides of the partition (an AP choice) — and even then, it needs a conflict-resolution strategy like last-write-wins or a CRDT to reconcile the two sides afterward. A CP system would instead refuse writes on the minority side (or both sides) until the partition heals.

## Key terms

This lesson recaps terms already defined across Lessons 1-16 — refer back to each lesson's "Key terms" section for the full glossary.

## Recap

That closes Distributed Systems Concepts. You've gone from the basic properties of a distributed system, through the uncertainty that drives consistency and communication design, to seeing all of it applied in Salesforce and in a realistic end-to-end case study. Congratulations on completing the course.
