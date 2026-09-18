# Script — Monitoring Kafka

## Segment 1 (title)

If you watch exactly one Kafka metric, watch consumer lag — the gap between the latest offset written and what a consumer group has actually committed. Climbing lag means real-time stops being real-time.

## Segment 2 (steps: under-replicated partitions and disk usage)

Under-replicated partitions are the early warning: a replica has fallen behind or is unreachable, thinning the safety margin replication is supposed to provide. Broker disk usage matters continuously too, since retention deliberately holds data for a configured window.

## Segment 3 (screenshot: a real cluster's monitoring view)

Every one of these shows up in a real dashboard, not an abstraction — a cluster's detail page, the entry point to throughput, partition health, and overall status for an actual provisioned cluster.

## Segment 4 (code: chapter 5 recap)

Chapter 5, start to finish: provisioning without a broker on Confluent Cloud, Azure's own compatibility bridge, the honest managed-versus-self-hosted trade-off, and now what actually matters to watch once it's running.

## Segment 5 (outro)

Chapter 5 complete. Chapter 6, Practical Patterns, is next — starting with building a real producer-to-Kafka-to-consumer pipeline end to end.
