# Script — Replication & Fault Tolerance

## Segment 1 (title)

Every partition lives on disk on one broker, but Kafka never keeps just one copy. Replication factor tells Kafka how many total copies of each partition to keep, spread across different brokers.

## Segment 2 (code: leader and followers)

Only the leader serves reads and writes. Followers just pull records from the leader and replicate them. A follower fully caught up to the leader is an in-sync replica, or ISR — one that's fallen behind temporarily drops out of that set until it catches back up.

## Segment 3 (code: min.insync.replicas)

Replication factor alone doesn't guarantee durability. min.insync.replicas decides how many replicas a write has to reach before it's acknowledged. Set it to two out of three, and losing one broker is safe — losing two at once, Kafka refuses new writes rather than accepting data it can't guarantee survives.

## Segment 4 (steps: leader failover)

Here's what actually happens when a leader dies: the broker stops responding, the cluster's controller notices it missed its session timeout, a new leader is elected from the in-sync replica set with zero data loss, and producers and consumers reconnect to the new leader automatically, with no application code change.

## Segment 5 (outro)

Replication turns "one broker died" from an outage into a non-event, as long as min.insync.replicas was set honestly. Next up: partitioning strategy — how those partitions get chosen in the first place.
