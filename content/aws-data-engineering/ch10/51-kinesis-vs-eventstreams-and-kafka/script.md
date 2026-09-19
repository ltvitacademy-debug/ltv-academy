# Script — Kinesis vs. Fabric Eventstreams & Kafka

## Segment 1 (title)

Kinesis isn't the only way to stream data, and it isn't automatically right just because you're on AWS. Kafka and Microsoft Fabric Eventstreams come up constantly in real architecture decisions — this is a fair comparison, not an argument for any one of them.

## Segment 2 (code: same idea, different vocabulary)

All three map to the same core model: producers write in, consumers read out, ordered per unit. Kinesis calls that unit a shard inside a stream, Kafka and Amazon MSK call it a partition inside a topic, and Fabric Eventstreams calls it a partition inside an eventstream. The concepts line up; the operating model around them doesn't.

## Segment 3 (steps: three managed streaming options)

Kinesis is AWS-native with the least operational overhead, but it's AWS-only. Kafka, whether self-managed or run as Amazon MSK, is open-source and portable across clouds, with a much bigger connector ecosystem, at the cost of more moving parts. Fabric Eventstreams is Microsoft's equivalent, the natural choice for a team already standardized on Fabric.

## Segment 4 (outro)

Three streaming options, compared honestly. Next up: putting the pieces together in a real Kinesis pipeline — clickstream events through Data Streams, Firehose, and into Athena.
