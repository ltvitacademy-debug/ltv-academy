# Kinesis Data Firehose

Lesson 48 covered Kinesis Data Streams, where you manage shards and consumers yourself.
Firehose is the opposite philosophy: point it at a destination, and it handles capacity,
buffering, and delivery for you. If your goal is simply "get this stream into S3" without
building a consumer application, Firehose is almost always the right tool.

## What you'll learn

- What makes Firehose "fully managed" compared to Data Streams
- The buffering model: size and time thresholds, whichever hits first
- Firehose's supported destinations and optional inline transformation
- Why Firehose is a load-and-forget service, not a replayable stream

## No shards to manage

Data Streams makes you provision shard count (or turn on on-demand scaling) and write a
consumer to read from them. Firehose has none of that. You create a **delivery stream**,
point it at a destination, and Firehose scales its own ingestion capacity automatically
behind the scenes. There's no shard count to size, no KCL checkpointing logic to write —
Firehose is the managed delivery layer, not a general-purpose stream you build applications
against.

## Buffering: size or time, whichever comes first

Firehose doesn't deliver every record the instant it arrives — it batches. You configure a
**buffer size** (in MB) and a **buffer interval** (in seconds), and Firehose flushes to the
destination the moment either threshold is hit. A 5 MB / 300-second buffer, for example,
delivers as soon as 5 MB accumulates or five minutes pass, whichever happens first. This is
why Firehose is near-real-time (seconds to a couple of minutes) rather than the sub-second
latency of reading directly from a Kinesis Data Streams shard.

## Destinations and transformation

Firehose delivers to **S3, Redshift, OpenSearch Service, Splunk, and generic HTTP
endpoints**. Redshift and OpenSearch delivery actually stages through S3 first, then issues
a COPY or bulk-index call. You can also attach a **Lambda transformation** to a delivery
stream, so records get reshaped, filtered, or enriched in flight before they land — a common
pattern for converting JSON to Parquet or stripping fields that shouldn't reach the
destination.

## Load and forget, not read and replay

The key difference from Data Streams: Firehose has no concept of multiple independent
consumers reading at their own pace, and no retention window to rewind. Once a batch is
delivered, it's gone from Firehose's side — the record now lives wherever it landed. That
tradeoff is the whole point: you give up replayability in exchange for not managing any
infrastructure. A common pattern is actually to use both — a Kinesis Data Stream as the
durable, replayable ingestion point, with Firehose reading from that stream as its *source*
and handling delivery to S3.

## Key terms

| Term | Meaning |
|---|---|
| Delivery stream | A Firehose pipeline from a source to one destination |
| Buffer size / interval | Thresholds (MB / seconds) that trigger a Firehose flush, whichever hits first |
| Destination | Where Firehose delivers: S3, Redshift, OpenSearch Service, Splunk, or HTTP endpoints |
| Lambda transformation | Optional in-flight reshaping of records before delivery |
| Load and forget | Firehose delivers once and doesn't retain records for replay |

## Check yourself

A team wants sub-second processing of events as they arrive, with the ability to have three
separate applications each read the same events independently. Is Firehose the right tool for
that requirement? What would you reach for instead, and could Firehose still play a role
alongside it?
