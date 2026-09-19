# Script — Kinesis Data Streams

## Segment 1 (title)

Kinesis Data Streams is built for data that's still moving — clickstreams, IoT telemetry, order events — anything that arrives continuously and needs processing within seconds, not queried after the fact.

## Segment 2 (code: shards are the unit of everything)

A stream is made of shards, and each shard caps out at 1 megabyte per second in, 2 out. Every record carries a partition key, which Kinesis hashes to pick a shard. Ordering is guaranteed within a shard, not across the whole stream — so if order matters for a given entity, its records need to land on the same shard.

## Segment 3 (steps: from producer to processed record)

A producer writes a record in, the partition key routes it to a shard, and a consumer — often the Kinesis Client Library, Lambda, or Kinesis Data Analytics — reads it back out. Records stick around for at least 24 hours by default, so a consumer can replay data instead of losing it the moment it's read.

## Segment 4 (outro)

Shards, partition keys, and retention down. Next up: Kinesis Data Firehose — the fully managed service that takes a stream and lands it in S3 without you touching a shard.
