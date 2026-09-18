# Script — Kafka vs. Other Streaming Tools

## Segment 1 (title)

RabbitMQ is queue-first: a message is routed to a queue, consumed once, and gone. Kafka flips that default — the log is retained, and multiple independent consumers can each read the whole history at their own pace.

## Segment 2 (code: queue-first vs log-first)

RabbitMQ is genuinely excellent at complex routing and per-message acknowledgment for task distribution. Kafka is the better fit when you need replay, or multiple independent teams reading the same stream for different purposes.

## Segment 3 (steps: the managed alternatives)

Fabric's Eventstreams and AWS Kinesis are Kafka's managed cousins — Eventstreams inside Azure and Fabric specifically, Kinesis inside AWS. Both trade some configurability for near-zero operational burden; Kinesis is conceptually closest to Kafka's own log model.

## Segment 4 (steps: choosing honestly)

Pure task distribution with no replay need: RabbitMQ. Already all-in on Fabric with a BI audience: Eventstreams. Already all-in on AWS: Kinesis. Need a vendor-neutral, highly configurable, replayable log and you're willing to run it: that's Kafka's actual niche.

## Segment 5 (outro)

That's Chapter 1 complete — the durable log, topics, partitions, offsets, producers, consumers, brokers, clusters, and now where Kafka sits next to the alternatives. Chapter 2 starts producing and consuming for real.
