# Script — Change Feed in Cosmos DB

## Segment 1 (title)

T-SQL DBAs have built change tracking by hand — triggers writing to audit tables, or Change Data Capture reading the transaction log. Cosmos DB gives you this almost for free with the change feed — an ordered, persistent log of every insert and update, always on.

## Segment 2 (code: an ordered log, not a query)

The change feed isn't something you query — it's a persistent log you read sequentially from a checkpoint forward. The Change Feed Processor library handles distributing work across partitions and tracking position for you. An Azure Functions Cosmos DB trigger wraps the same mechanism as a managed, serverless function.

## Segment 3 (steps: real use cases)

Event-driven architectures — publish a message every time a document changes. Real-time analytics — stream changes as they happen instead of polling on a schedule. Materialized views — keep a denormalized read-optimized copy automatically in sync with the source.

## Segment 4 (outro)

The change feed replaces custom polling or trigger-based auditing with something built into the platform, always on, at no extra write-path cost. Next up: indexing policies, and why Cosmos DB indexes everything by default.
