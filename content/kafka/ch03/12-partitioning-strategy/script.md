# Script — Partitioning Strategy

## Segment 1 (title)

Topics and partitions were introduced back in Lesson 2. This lesson is about how a producer actually decides which partition a given message lands on — and it's a real design decision, not a formality.

## Segment 2 (code: key vs no key)

With a key, Kafka hashes it, and that same key always lands on the same partition — which guarantees per-key ordering, since one consumer reads a given partition at a time. Without a key, Kafka spreads messages round-robin: even load, but no ordering guarantee tied to any value.

## Segment 3 (steps or code: too few vs too many)

Partition count bounds parallelism directly. Too few, and extra consumers in a group just sit idle — you can never use more consumers than partitions. Too many, and every partition is real per-broker overhead — more file handles, slower rebalances, more replication traffic for the same total data.

## Segment 4 (code: hot partition)

The hashing only spreads load evenly if the key values themselves are even. Key by something like country, where ninety percent of traffic is from one place, and that one partition takes ninety percent of the load while the rest sit idle. Key by something high-cardinality, like customer ID, and it spreads naturally.

## Segment 5 (outro)

Partition count and key choice aren't set-and-forget — they directly determine both your ordering guarantees and where your bottlenecks show up later. Next up: retention — how long a message actually sticks around once it's written.
