# Script — Topics, Partitions & Offsets

## Segment 1 (title)

A topic is a named log. But a topic isn't one physical log — it's split into partitions, and each partition is its own independently ordered log. That split is what makes Kafka scale.

## Segment 2 (code: topic split into partitions)

Different partitions can live on different brokers, be written and read in parallel, and be consumed by different members of a consumer group at once. The trade-off: Kafka only guarantees ordering within a partition, never across the whole topic.

## Segment 3 (code: offsets are partition-local)

Every event appended to a partition gets an offset — a simple increasing integer, unique within that partition, not across the topic. A consumer's whole job is tracking the next offset it hasn't read yet, for each partition it owns.

## Segment 4 (screenshot: a real topic table)

This isn't just a diagram. Confluent Control Center's topic table shows real topics with their partition counts as a visible column — a deployment decision that directly bounds how much parallelism a topic can support.

## Segment 5 (outro)

Topic, partition, offset — the three concepts underneath everything else in Kafka. Next up: producers and consumers, the two sides that actually read and write this log.
