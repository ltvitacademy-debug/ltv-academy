# Eventual Consistency

Lesson 6 established that distributed systems have no shared clock and communicate mostly asynchronously, which means two replicas of the same data can legitimately disagree for a short time. This lesson covers what systems do about that: the spectrum of consistency models, with a close look at eventual consistency, the model most large-scale distributed data stores actually choose.

## What you'll learn

- The difference between strong consistency and eventual consistency
- BASE as the alternative to the ACID guarantees you may know from a single database
- How conflicting writes to different replicas get resolved
- A real-world example of eventual consistency in action

## Strong consistency vs. eventual consistency

**Strong consistency** means every read sees the most recent write, as if there were only one copy of the data anywhere — no matter which replica answers your request. This is the easiest model to reason about, but it's expensive: enforcing it usually means coordinating with other replicas on every write, which adds latency and can reduce availability during a network partition (the subject of the next lesson).

**Eventual consistency** relaxes that guarantee: if no new writes happen, all replicas will *eventually* converge on the same value — but right after a write, different replicas may briefly disagree. A read might return slightly stale data. In exchange, writes and reads can complete fast and locally, without waiting on a round trip to every other replica.

## BASE: the alternative to ACID

If you've worked with a single relational database, you may know ACID (Atomicity, Consistency, Isolation, Durability) as the gold standard for correctness. Many distributed data stores instead describe themselves with **BASE**:

- **B**asically **A**vailable — the system responds to requests most of the time, even during partial failures
- **S**oft state — the data may change over time even without new input, as replicas converge
- **E**ventual consistency — given enough time with no new writes, all replicas agree

BASE isn't "ACID done badly" — it's a deliberate trade favoring availability and low latency over the strict, always-up-to-date guarantee that ACID provides.

## Resolving conflicting writes

If two replicas can each accept a write independently, what happens when two different writes to the same piece of data happen at nearly the same time? A few common strategies:

- **Last-write-wins (LWW)** — attach a timestamp to each write and keep whichever is newest. Simple, but it can silently discard a legitimate update if clocks aren't trustworthy.
- **Version vectors (vector clocks)** — each replica tracks a per-replica counter so the system can tell whether one write happened-before another, or whether they were truly concurrent and need application-level resolution.
- **CRDTs (Conflict-free Replicated Data Types)** — data structures specifically designed so that concurrent updates can always be merged automatically into a consistent result, without losing information or needing a human or app developer to pick a winner.

## A real example: DNS

The Domain Name System is a familiar example of eventual consistency at global scale. When you update a DNS record, that change doesn't reach every resolver on earth instantly — it propagates gradually as caches expire (governed by each record's TTL, or time-to-live). For a short window, some users see the old address and some see the new one. DNS chooses this trade-off deliberately: a globally synchronous DNS would be far slower and far less available than the system we actually have.

## Key terms

- **Strong consistency** — every read reflects the most recent write everywhere
- **Eventual consistency** — replicas converge to the same value over time, but may briefly disagree
- **BASE** — Basically Available, Soft state, Eventual consistency; the distributed-systems alternative to ACID
- **Last-write-wins** — a conflict resolution strategy that keeps the newest timestamped write
- **CRDT** — a data structure designed so concurrent updates merge automatically without conflict

## Recap

Eventual consistency trades a brief window of possible disagreement between replicas for lower latency and higher availability — and BASE, last-write-wins, version vectors, and CRDTs are the tools systems use to make that trade-off manageable. Next, in Lesson 8, you'll see the theorem that explains exactly when a system is forced to make this choice at all: the CAP theorem.
