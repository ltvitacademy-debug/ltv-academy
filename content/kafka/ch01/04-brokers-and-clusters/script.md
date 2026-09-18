# Script — Brokers & Clusters

## Segment 1 (title)

A broker is one Kafka server, holding a subset of the cluster's partitions. No single broker holds every partition of every topic — that would defeat the purpose of partitioning for scale.

## Segment 2 (code: broker holds a subset of partitions)

A cluster is the set of brokers working together, coordinated so that from a client's point of view it looks like one system. Connect to any broker, ask who leads a partition, and you're routed there automatically.

## Segment 3 (code: replication and failover)

Adding brokers isn't just about throughput — it's fault tolerance. Each partition is replicated across multiple brokers, so if the leader fails, a broker with a replica takes over, with no data loss.

## Segment 4 (screenshot: a real cluster overview)

This isn't an abstract diagram. Confluent Cloud's cluster overview page shows the properties that matter operationally for a real running cluster — throughput, storage, and broker health.

## Segment 5 (outro)

The durable log, topics and partitions and offsets, producers and consumers, and now brokers and clusters — that's the physical picture. Next up: why choose this model over a traditional queue or a managed alternative, closing out Chapter 1.
