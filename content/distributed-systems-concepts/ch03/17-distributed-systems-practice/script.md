# Script — Distributed Systems Practice

## Segment 1 (title)

This is the final lesson of Distributed Systems Concepts. Instead of new material, it's a structured review of everything the course covered, plus a couple of practice scenarios to check whether the ideas have actually stuck.

## Segment 2 (steps)

Chapter one covered the basic properties of a distributed system: availability, achieved through redundancy and failover; scalability, by scaling out rather than just up, coordinated with load balancing; reliability, staying correct over time even under failure; and latency and throughput, which trade off against each other, where tail latency matters more than the average.

## Segment 3 (steps)

Chapter two covered why distributed systems communicate asynchronously with no shared clock, and what follows from that: eventual consistency as a deliberate trade for speed and availability, the CAP theorem forcing a choice between consistency and availability only during a real partition, message queues decoupling producers from consumers, failure detected by inference and recovered through consensus, and idempotency making retries safe.

## Segment 4 (steps)

Chapter three applied all of it: governor limits and Platform Events as Salesforce's real expressions of rate limiting and messaging, designing for failure with bulkheads and chaos engineering, backpressure and rate limiting protecting an overloaded system, and observability — logs, metrics, and traces — letting you see what's actually happening inside it.

## Segment 5 (code)

Here's a quick scenario. Three nodes lose contact with the rest of the cluster for thirty seconds, then reconnect. Could both sides have kept accepting writes to the same data during that window? Only under an availability-favoring choice — and even then, you'd need a conflict-resolution strategy like last-write-wins or a CRDT to reconcile both sides once the partition heals.

## Segment 6 (outro)

You've gone from the basic properties of a distributed system, through the uncertainty driving consistency and communication design, to seeing it all applied in Salesforce and in a full case study. Congratulations on completing Distributed Systems Concepts.
