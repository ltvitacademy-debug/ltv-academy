# Diagnosing Throttling & Performance Issues

The single most common Cosmos DB support ticket is some version of "my app is getting
errors under load." Almost always, the error is a **429 — Request rate is large**, and
almost always the fix has nothing to do with the code that's failing. It has to do with
Request Units. For a DBA used to diagnosing SQL Server performance with wait stats and
execution plans, this lesson covers the Cosmos DB equivalent: what a 429 actually means,
how to see exactly what an operation cost in RUs, and how to spot the most common root
cause — a hot partition.

## What you'll learn

- What a 429 "Request rate is large" error means and why Cosmos DB returns it
- How to read the request charge on every single operation, and why that's the starting point for any RU investigation
- How to recognize a hot partition, the most common real cause of sustained throttling

## The 429: not a bug, a signal

Every request against a Cosmos DB container costs a certain number of **Request Units
(RUs)**, calculated from the operation type, item size, indexing, and query complexity.
A container has a provisioned RU/s budget. When the RUs consumed in a one-second window
exceed that budget, Cosmos DB doesn't queue the excess work or slow it down — it rejects
the request outright with HTTP status **429 (Request rate is large)** and a
`x-ms-retry-after-ms` header telling the client how long to wait before retrying.

This is a deliberate design choice, not a failure mode. Every Cosmos DB SDK (`.NET`,
Java, Python, Node.js) has **built-in retry-on-429 logic** enabled by default, so a small
number of 429s under a bursty workload is often invisible to the application — the SDK
just retries after the suggested delay. The problem is *sustained* 429s: when the retry
logic itself starts eating latency budget because the container is genuinely, consistently
under-provisioned or being hit unevenly.

## Reading the request charge

Every response from Cosmos DB — success or failure — includes the RU cost of that specific
operation. In the SDK, this is exposed directly:

```csharp
ItemResponse<Order> response = await container.ReadItemAsync<Order>(id, partitionKey);
double ruCharge = response.RequestCharge;
```

This single property is the starting point for almost every RU investigation. Log it (or
sample it) for expensive operations in production, and you can answer the question "what
is actually consuming our throughput" with real numbers instead of guesses — the same
instinct as checking `STATISTICS IO` on a SQL Server query instead of assuming which
operator is expensive.

For ad hoc investigation, the diagnostic logs covered in the previous lesson
(`DataPlaneRequests` in Log Analytics) capture the request charge for every request across
the whole account, queryable with KQL — for example, finding the 10 most expensive
operations in the last hour, or the average RU charge for a specific query pattern.

## The hot partition: the most common real cause

Provisioned RU/s is split **evenly across physical partitions**, and Cosmos DB routes each
request to the physical partition that owns the item's logical partition key value. If one
partition key value (or a small cluster of them) receives a disproportionate share of
traffic, that one physical partition can be throttled at 429 while the container's overall
RU consumption looks comfortably under budget — this is a **hot partition**, and it's the
single most common cause of "we're throttled but our metrics say we have headroom."

Real ways to spot it:

- The **Normalized RU Consumption** metric, sliced **per physical partition** (not just at
  the container level) in Azure Monitor — one partition sitting near 100% while others sit
  low is the signature of a hot partition
- Diagnostic logs filtered to 429 responses, grouped by partition key range, showing the
  429s concentrated on one range
- Reviewing the actual partition key choice: a key like `tenantId` where one tenant is far
  larger than the rest, or a key like today's date where all of today's writes land on one
  logical (and likely physical) partition

The fix is rarely "add more RU/s" — that just raises the ceiling for every partition
including the ones that aren't the problem, while wasting money on the idle ones. The real
fix is almost always revisiting the **partition key design** covered earlier in this
chapter, so that write and read traffic actually spreads evenly.

## Key terms

| Term | Meaning |
|---|---|
| 429 (Request rate is large) | The throttling response Cosmos DB returns when RU/s consumption exceeds the provisioned budget in a given second |
| Request charge | The RU cost of a specific operation, returned on every response and readable via the SDK |
| Hot partition | A physical partition receiving disproportionate traffic relative to others, causing localized throttling even when overall RU/s looks fine |
| Normalized RU Consumption (per partition) | The metric that reveals a hot partition by showing RU usage unevenly distributed across physical partitions |

## Check yourself

A container's overall Normalized RU Consumption metric shows only 40%, yet the application
is seeing frequent 429 errors. What's the most likely explanation, and what would you check
next?
