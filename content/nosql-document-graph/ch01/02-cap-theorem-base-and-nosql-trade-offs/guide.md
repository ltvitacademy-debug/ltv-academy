# CAP Theorem, BASE & NoSQL Trade-offs

Every NoSQL platform in this course makes deliberate tradeoffs under the hood, and you
can't reason about MongoDB replica sets, Cosmos DB consistency levels, or Neo4j clustering
honestly without understanding the theorem that forces those tradeoffs to exist in the
first place. This lesson covers the CAP theorem and the BASE model — not as academic
trivia, but as the real engineering constraints that shape every distributed database
decision later in this course.

## What you'll learn

- What the CAP theorem actually claims, and the one condition that makes it apply
- Why "pick 2 of 3" is a useful shorthand but an oversimplification in practice
- The BASE model as relational ACID's honest alternative, not a lesser standard
- How real NoSQL platforms position themselves along the C/A tradeoff

## The CAP theorem: a forced choice, not a menu

CAP stands for three properties of a distributed data system:

- **Consistency** — every read receives the most recent write, or an error. All nodes see
  the same data at the same time.
- **Availability** — every request receives a (non-error) response, even if it isn't the
  result of the most recent write.
- **Partition tolerance** — the system keeps operating even when network failures split
  it into groups of nodes that can't talk to each other.

The theorem, proven by Eric Brewer and formalized by Gilbert and Lynch, states that a
distributed system can only guarantee two of these three properties **at the same time**.
The common shorthand is "pick 2 of 3," but that phrasing hides the actual condition: a
network partition. In a distributed system, partitions are not optional — nodes on
different machines, racks, or regions *will* eventually fail to communicate. Partition
tolerance therefore isn't really a choice you opt out of; it's a fact of distributed
systems. The real decision CAP forces is what happens **during a partition**: do you
sacrifice consistency (keep serving requests with possibly-stale data) or sacrifice
availability (refuse requests until the partition heals and nodes agree again)?

This reframes CAP correctly: it's not "C, A, or P — pick two," it's "given that P is a
fact of life, do you lean toward C or toward A when a partition happens?" Systems are
usually described as CP (consistent, may reject requests during a partition) or AP
(available, may serve stale data during a partition) rather than as three interchangeable
options.

## BASE: the honest alternative to ACID

Relational databases target ACID guarantees — Atomicity, Consistency, Isolation,
Durability — which prioritize correctness and strict consistency even at the cost of
availability or latency. Many NoSQL systems instead target **BASE**, a deliberately looser
model that trades strict consistency for availability and performance at scale:

- **Basically Available** — the system guarantees a response to every request, prioritizing
  uptime over guaranteeing the absolute latest data.
- **Soft state** — the state of the system may change over time even without new input,
  as updates propagate asynchronously between replicas.
- **Eventual consistency** — if no new updates are made, all replicas will *eventually*
  converge to the same value. Consistency is a guarantee about the future, not the
  instant.

BASE is not "ACID but sloppier." It's a real, deliberate engineering choice appropriate
for workloads where a slightly stale read is acceptable but a failed request isn't — a
product catalog page, a social media feed, a shopping cart. It's the wrong choice for a
bank ledger, which is exactly why financial systems still lean heavily relational or use
NoSQL platforms with tunable strong-consistency options.

## Where real platforms land

No production NoSQL system is purely CP or purely AP in every configuration — most offer
tunable consistency:

- **MongoDB** defaults toward consistency within a replica set (a single primary accepts
  all writes; reads can be configured for strong or eventual consistency via read/write
  concerns), leaning CP by default but with AP-leaning read options available.
- **Cassandra** (a column-family database covered for contrast in the next lesson) leans
  AP by default, with per-query tunable consistency levels (e.g., `ONE`, `QUORUM`, `ALL`)
  letting you dial toward C when a specific query needs it.
- **Azure Cosmos DB** makes this tuning explicit as a first-class feature: five named
  consistency levels (Strong, Bounded Staleness, Session, Consistent Prefix, Eventual)
  let you choose the tradeoff per account or per request — covered in depth later in this
  course.

The honest takeaway: CAP and BASE aren't a verdict that NoSQL is "less correct" than
relational systems. They describe real physics-constrained tradeoffs that every
distributed system — including a multi-region SQL Server Always On setup — has to make.
NoSQL platforms just tend to make the AP/BASE side of that tradeoff more visible and more
configurable.

## Key terms

| Term | Meaning |
|---|---|
| CAP theorem | A distributed system can guarantee at most two of Consistency, Availability, Partition tolerance simultaneously during a network partition |
| Partition tolerance | The system keeps functioning despite network failures splitting nodes into unreachable groups |
| CP system | Prioritizes consistency over availability during a partition — may reject requests to avoid serving stale data |
| AP system | Prioritizes availability over consistency during a partition — serves requests even with possibly-stale data |
| BASE | Basically Available, Soft state, Eventual consistency — the NoSQL alternative to ACID |
| Eventual consistency | A guarantee that replicas will converge to the same value over time, given no new writes |

## Check yourself

A colleague says "CAP theorem means you pick any two of Consistency, Availability, and
Partition tolerance, so a well-designed system should just pick Consistency and
Availability and skip Partition tolerance." What's wrong with that reasoning?
