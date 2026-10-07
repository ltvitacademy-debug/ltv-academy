# Designing for Failure

Lesson 10 covered the mechanics of detecting and containing failure once it happens. This lesson is about the design philosophy that should shape a system *before* failure happens: treating failure as the normal, expected condition of a distributed system, not a rare exception you can engineer away entirely.

## What you'll learn

- Why "assume failure is normal" is a better starting design assumption than "assume success"
- Redundancy with no single point of failure
- The bulkhead pattern for isolating failures
- Chaos engineering as a way to verify resilience before production forces the issue

## Assume failure is normal

A single machine fails rarely enough that most software can get away with assuming it works. A distributed system made of hundreds or thousands of components doesn't have that luxury — across enough nodes, *something* is failing at any given moment, essentially all the time. Designing for failure means starting from that assumption rather than treating failure as an edge case bolted on afterward. It changes the questions you ask: not "what happens if this fails" as an afterthought, but "this will fail — what happens then" as a starting design constraint.

## Redundancy without a single point of failure

Redundancy means having more than one of something so that the loss of one doesn't take down the whole system — a second replica of a database, a second instance of a service behind a load balancer, a second network path between two data centers. But redundancy only helps if it actually removes the **single point of failure (SPOF)**: a backup database replica that depends on the same power circuit, the same network switch, or the same region as the primary isn't genuinely redundant — it will fail at the same time as what it was meant to protect against. Real redundancy requires looking for the *shared* dependency between your "two" copies and removing it.

## The bulkhead pattern

Named after the watertight compartments in a ship's hull that keep one breach from flooding the entire vessel, the **bulkhead pattern** isolates resources (thread pools, connection pools, or entire service instances) so that one failing dependency can't exhaust resources shared by everything else. If calls to Dependency A are confined to their own limited pool of threads, A failing and filling up that pool only blocks requests that need A — requests to unrelated Dependency B keep flowing normally. Without bulkheads, a single struggling dependency can exhaust a shared resource pool and take the whole system down with it, which is exactly the cascading-failure pattern from Lesson 10.

## Chaos engineering

If failure is going to happen anyway, the logical next step is to make it happen on your own schedule, under controlled conditions, rather than waiting for it to happen unpredictably in production. **Chaos engineering** means deliberately injecting failure — killing a server instance, adding artificial network latency, cutting off a dependency — into a system (ideally a non-critical or carefully scoped environment first) to verify that the resilience mechanisms you built (redundancy, bulkheads, circuit breakers, retries) actually work as intended. Netflix popularized this approach with a tool nicknamed **Chaos Monkey**, which randomly terminates live service instances to force engineering teams to build systems that tolerate that kind of loss by default, rather than finding out the hard way during a real outage.

## Key terms

- **Single point of failure (SPOF)** — any one component whose failure alone can bring down the whole system
- **Redundancy** — having more than one independent copy of a critical component
- **Bulkhead pattern** — isolating resources per dependency so one failure can't exhaust resources shared by everything else
- **Chaos engineering** — deliberately injecting failure to verify resilience before it's forced on you in production

## Recap

Designing for failure means assuming failure is constant, removing shared dependencies that would undo your redundancy, isolating failures with bulkheads before they cascade, and verifying all of it works through deliberate, controlled chaos testing. Next, in Lesson 14, you'll go deeper on one specific piece of this: backpressure and rate limiting as the mechanisms that keep an overloaded system from collapsing.
