# Script — Request Units & Throughput Provisioning

## Segment 1 (title)

The last three lessons kept referencing Request Units without fully defining them. This lesson closes Chapter 6 by making RUs concrete — arguably the single most distinctive concept in Cosmos DB, with no direct equivalent elsewhere in this course.

## Segment 2 (code: what an RU actually is)

A Request Unit normalizes the compute, memory, and I/O cost of one operation. A simple point read of a 1KB document by its ID and partition key costs roughly 1 RU. Every response returns the exact RU charge for that request, so cost is genuinely knowable in advance, not estimated after the fact.

## Segment 3 (steps: what drives RU cost)

RU cost scales with real factors — document size, the number of indexed properties, query complexity like ORDER BY or aggregation, and whether a query stays within one partition or fans out across several. This is exactly why the modeling choices from Lesson 33 have a real, measurable dollar consequence.

## Segment 4 (code: two ways to pay for RU/s)

Provisioned throughput reserves a fixed RU/s, guaranteed and billed whether fully used or not — requests exceeding it get throttled. Serverless removes upfront provisioning entirely, billing purely on RUs actually consumed, but with lower maximum throughput and storage ceilings — a real constraint, not a strictly better free option.

## Segment 5 (outro)

That's Chapter 6 complete. Next up, Chapter 7 begins: the Cosmos DB SQL query language, for actually querying Core API data.
