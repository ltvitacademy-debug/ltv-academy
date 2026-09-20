# Change Feed in Cosmos DB

T-SQL DBAs have built change tracking and CDC pipelines by hand — triggers writing to audit
tables, or SQL Server Change Data Capture reading the transaction log. Cosmos DB gives you this
almost for free. Every container maintains a **change feed**: an ordered, persistent log of every
insert and update made to its items, in the order they were committed. You don't build it — it's
just there, ready to be read.

## What you'll learn

- What the change feed actually is and why it's on by default
- The two ways to consume it: the Change Feed Processor library and Azure Functions
- Real use cases where the change feed replaces custom polling or trigger-based auditing

## An ordered log, not a query

The change feed is not something you `SELECT` — it's a persistent, append-only log, scoped per
partition key range, that you read sequentially from a checkpoint forward. Each change (insert or
update) appears exactly once, in the order it was committed within its partition. Classic change
feed captures inserts and updates; a newer mode, **change feed with all versions and deletes**,
also captures deletes and every intermediate version of an item, closer to a true CDC stream.

```csharp
// Change Feed Processor: continuously reads changes and invokes a handler
var processor = container
    .GetChangeFeedProcessorBuilder<OrderDoc>("orderProcessor", HandleChangesAsync)
    .WithInstanceName("processor-1")
    .WithLeaseContainer(leaseContainer)
    .Build();

await processor.StartAsync();

async Task HandleChangesAsync(
    IReadOnlyCollection<OrderDoc> changes,
    CancellationToken ct)
{
    foreach (var order in changes)
        await PublishOrderEventAsync(order);
}
```

The Change Feed Processor library handles the hard parts for you — distributing work across
partitions, tracking read position with a lease container, and resuming cleanly after a restart.
The alternative is an **Azure Functions Cosmos DB trigger**, which wraps the same mechanism as a
managed, serverless function that fires automatically as changes arrive — no processor host to run
yourself.

## Real use cases

- **Event-driven architectures** — publish a message to a queue or event hub every time an order
  document is written, decoupling the write path from everything downstream that reacts to it.
- **Real-time analytics** — stream changes into an analytics pipeline as they happen, instead of
  polling the container on a schedule.
- **Materialized views** — keep a denormalized, read-optimized copy of data (in another container,
  or another data store entirely) automatically in sync with the source container.

This is the same shape of problem T-SQL solves with triggers or CDC — but the change feed is
built into the platform, always on, and doesn't add write-path overhead to the operation that
triggered it.

## Key terms

| Term | Meaning |
|---|---|
| Change feed | An ordered, persistent log of inserts and updates to a container's items |
| Change Feed Processor | A library that reads the change feed across partitions and checkpoints progress via a lease container |
| Lease container | A container that tracks which partition range each processor instance has read up to |
| All versions and deletes mode | A change feed mode that also captures deletes and intermediate item versions |

## Check yourself

A teammate asks why they can't just poll the container every few seconds with a `SELECT` query to
detect new orders instead of using the change feed. What's the real advantage the change feed
gives them that polling doesn't?
