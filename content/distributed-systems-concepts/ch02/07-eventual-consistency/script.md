# Script — Eventual Consistency

## Segment 1 (title)

Last lesson established that replicas can legitimately disagree for a short time, since there's no shared clock and communication is mostly asynchronous. This lesson covers what systems actually do about that: the spectrum of consistency models, and eventual consistency, the one most large-scale data stores choose.

## Segment 2 (steps)

Strong consistency means every read sees the latest write, everywhere, as if there were only one copy of the data. It's easy to reason about but expensive, since it usually means coordinating with every replica on every write. Eventual consistency relaxes that: if writes stop, all replicas eventually agree, but right after a write they might briefly disagree. In exchange, reads and writes stay fast and local.

## Segment 3 (steps)

You may know ACID from a single database. Distributed data stores often describe themselves with BASE instead: basically available, meaning the system responds most of the time even during partial failure; soft state, meaning data can keep changing as replicas converge; and eventual consistency, meaning they agree once writes stop. It's not ACID done badly — it's a deliberate trade for availability and speed.

## Segment 4 (steps)

So what happens when two replicas each accept a conflicting write at nearly the same time? Last-write-wins just keeps whichever write has the newest timestamp — simple, but it can silently drop a legitimate update. Version vectors track enough history to tell true concurrency from real ordering. And CRDTs are data structures built so concurrent updates merge automatically, with no conflict to resolve at all.

## Segment 5 (code)

DNS is eventual consistency at a scale you already use every day. The authoritative server has your update immediately, but resolvers around the world keep serving their cached value until it expires at its TTL. For a window, some people see the old address and some see the new one — and DNS accepts that trade deliberately, because a fully synchronous DNS would be far slower and far less available.

## Segment 6 (outro)

Eventual consistency trades brief disagreement for speed and availability. Next, lesson eight: the CAP theorem, which explains exactly when a system is forced to make this choice at all.
