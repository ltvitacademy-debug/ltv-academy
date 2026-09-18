# Script — Producer Basics

## Segment 1 (title)

Acks decides how much durability a producer is actually asking for. Acks=0 doesn't wait at all; acks=1 waits for the leader broker; acks=all waits for the leader and its in-sync replicas.

## Segment 2 (code: the acks trade-off)

This is a real trade-off, not a "just use all" answer. Acks=0 fits high-volume telemetry where losing an occasional metric doesn't matter. Acks=all fits anything where losing an event has a real cost.

## Segment 3 (code: partitioning strategy)

Key-based partitioning keeps every event for one entity in the same partition, in order. Round-robin spreads events evenly when there's no entity to keep together. Picking the wrong one either wastes partitions or silently breaks ordering.

## Segment 4 (code: batching and linger.ms)

Linger.ms tells a producer to wait a short window to batch events before sending, trading a little latency for much higher throughput under real load — combined with batch.size, the actual lever most production producers tune.

## Segment 5 (outro)

Acks, partitioning key, and linger.ms — the three real trade-offs behind every producer configuration. Next up: what the consumer side actually looks like.
