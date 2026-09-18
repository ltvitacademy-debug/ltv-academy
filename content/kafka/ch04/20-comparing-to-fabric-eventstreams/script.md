# Script — Comparing Kafka to Fabric Eventstreams

## Segment 1 (title)

Fabric's Eventstreams solve the same real-time ingestion problem Kafka solves. Now that Kafka's own vocabulary is established, here's the direct, concept-by-concept comparison Lesson 1 promised.

## Segment 2 (code: concept map, part one)

Topic maps to Eventstream, but a topic is a first-class object you name and partition directly. Partition maps to Fabric's internal partitioning, which isn't a knob you turn the way Kafka's partition count is.

## Segment 3 (code: concept map, part two)

Consumer group maps to Fabric's managed parallel consumption — no group-membership protocol to configure. Kafka Connect maps to Eventstream's built-in connectors, but Connect draws on a vendor-neutral ecosystem of hundreds of connectors.

## Segment 4 (steps: the honest tradeoff)

Be honest about the tradeoff: Fabric is genuinely simpler with no cluster or partition count to configure. Kafka is genuinely more flexible — vendor-neutral, runs anywhere, with an ecosystem no single vendor's tool can match.

## Segment 5 (outro)

Chapter 4 complete — Connect, Streams, and ksqlDB, now compared directly against what you already knew. Chapter 5, Kafka in the Cloud, is next: the same fundamental concepts, provisioned without running a broker yourself.
