# Reliability

Lesson 2 previewed a distinction between availability and reliability without fully drawing it out. This lesson draws it out. Availability and reliability get used almost interchangeably in casual conversation, but they answer two different questions, and the mechanisms for improving one aren't always the mechanisms for improving the other.

## What you'll learn

- A precise definition of reliability, contrasted directly with availability
- Fault tolerance: what it means for a system to keep working despite failures
- Replication as the core mechanism behind reliability
- Redundancy without single points of failure
- Graceful degradation: partial functionality beats total outage

## Reliability vs. availability — the full contrast

**Availability** asks whether a system is usable right now — a snapshot in time. **Reliability** asks whether a system keeps working correctly over a stretch of time, including when parts of it fail. The two can disagree sharply. Imagine a web server that crashes and automatically restarts every four minutes. If you check it at a random moment, it's very likely to be up — high availability by the numbers. But a user in the middle of a multi-step checkout flow gets dropped every few minutes, which is a terrible experience. That system is available most instants you'd check it, but it is not reliable, because it doesn't keep doing its job correctly over any meaningful stretch of time.

## Fault tolerance

**Fault tolerance** is the property of a system that keeps producing correct results even when some of its components fail. A fault-tolerant payment system doesn't lose a transaction just because the server processing it crashed mid-request — some other mechanism (a retry, a replica picking up the work, a durable queue) ensures the transaction still completes correctly. Fault tolerance is reliability's core requirement: you cannot be reliable over time in a system made of unreliable parts unless you explicitly tolerate the parts failing.

## Replication: the core mechanism

The main way distributed systems achieve fault tolerance — and therefore reliability — is **replication**: keeping multiple identical copies of data or service state on different machines, kept in sync with each other. If one replica fails, another replica already has the same data and can keep serving correct results without anything being lost. Replication is closely related to the redundancy you saw in Lesson 2 for availability, but here the emphasis is on correctness of the data itself, not just "something is still running" — a replica isn't useful for reliability unless it actually has the same correct state as the one that failed.

## Redundancy without single points of failure

Reliability depends on redundancy being complete, not partial. A database with three replicas is more reliable than one with a single copy — but only if nothing upstream of those replicas is itself unreplicated. If every write has to pass through one coordinator process with no backup, that coordinator is a single point of failure, and the three replicas behind it don't help once it goes down. Building for reliability means checking every layer, not just the obvious one, for an unreplicated piece that would take the correct, replicated parts down with it.

## Graceful degradation

**Graceful degradation** is the idea that when something does fail, a system should lose some functionality, not all of it. An online store whose recommendation engine goes down should still let people search, add to cart, and check out — the "customers also bought" sidebar disappearing is a far better outcome than the whole site returning errors. Designing for graceful degradation means identifying which features are essential and making sure a failure in a non-essential one can't take the essential ones down with it. Partial functionality during a failure is almost always better than a total outage.

## Key terms

| Term | Meaning |
|---|---|
| Reliability | A system keeps working correctly over time, including under failure |
| Fault tolerance | A system keeps producing correct results despite some components failing |
| Replication | Keeping multiple synchronized copies of data or state across machines |
| Graceful degradation | Losing some functionality during a failure instead of all of it |

## Recap

Availability is a snapshot of uptime; reliability is a track record of correct behavior over time, built through fault tolerance, replication, and redundancy that doesn't leave a single point of failure standing — with graceful degradation as the fallback when something still breaks. Next up, Lesson 5: latency and throughput.
