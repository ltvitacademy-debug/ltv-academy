# Kinesis Data Streams

Every service you've used so far in this course is built for data that already landed
somewhere — a file in S3, a table in Redshift. Kinesis Data Streams is different: it's built
for data that's still moving. Clickstreams, IoT telemetry, application logs, order events —
anything that arrives continuously and needs to be processed within seconds, not queried
after the fact.

## What you'll learn

- Shards: the throughput unit that everything else in Kinesis Data Streams is built on
- How partition keys route records and why ordering is per-shard, not per-stream
- Producers, consumers, and the Kinesis Client Library (KCL)
- Retention, and why a stream can be replayed, not just read once

## Shards are the unit of everything

A Kinesis data stream is made of **shards**. Each shard is a fixed slice of throughput: up to
1 MB/second or 1,000 records/second in, and up to 2 MB/second out per consumer. A stream's
total capacity is just its shard count multiplied by those numbers — a 5-shard stream can
absorb 5 MB/second of writes. Unlike S3, where capacity is a non-issue, Kinesis throughput is
something you actively provision (or hand off to on-demand mode, which scales shards for you
automatically based on traffic).

## Partition keys decide the shard, and ordering follows

Every record you put into a stream carries a **partition key** — a string you choose, like a
user ID or device ID. Kinesis hashes that key to pick which shard the record lands on. This
matters for ordering: Kinesis guarantees strict ordering *within a shard*, not across the
whole stream. If you need all of one customer's events processed in order, use the customer
ID as the partition key so every one of their records lands on the same shard.

## Producers, consumers, and the KCL

Producers write records in — anything from a simple `PutRecord` API call to the Kinesis
Producer Library (KPL) for high-throughput batching. Consumers read records out, tracking
their position with a sequence number per shard. Most production consumers use the
**Kinesis Client Library (KCL)**, which handles shard discovery, load balancing across
worker instances, and checkpointing automatically, so you don't hand-roll shard-tracking
logic. Lambda and Kinesis Data Analytics can also consume a stream directly without any KCL
code at all.

## Retention makes a stream replayable

Records stay in a stream for a **retention period** — 24 hours by default, extendable up to
365 days. This is the detail that separates Kinesis Data Streams from a plain message queue:
multiple independent consumers can read the same records at their own pace, and a consumer
that falls behind or needs to reprocess a bad batch can rewind, within the retention window,
instead of losing data it already acknowledged.

## Key terms

| Term | Meaning |
|---|---|
| Shard | Fixed unit of stream throughput: 1 MB/s in, 2 MB/s out per consumer |
| Partition key | String that determines which shard a record is routed to |
| Sequence number | Per-shard identifier marking a record's position in the stream |
| KCL | Kinesis Client Library — handles shard discovery and checkpointing for consumers |
| Retention period | How long records stay readable in the stream (24h default, up to 365 days) |

## Check yourself

You're streaming order events and partitioning by `customer_id`. A downstream consumer needs
every event for a given customer processed in the exact order it happened. Does partitioning
by `customer_id` guarantee that? Why does ordering work per-shard rather than per-stream?
