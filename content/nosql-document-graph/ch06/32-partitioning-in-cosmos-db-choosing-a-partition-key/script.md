# Script — Partitioning in Cosmos DB: Choosing a Partition Key

## Segment 1 (title)

Lesson 31 flagged the partition key as the single most consequential provisioning decision. This lesson explains why — how Cosmos DB actually partitions data, and how to choose that key well, which will feel genuinely familiar from choosing a MongoDB shard key.

## Segment 2 (code: logical vs. physical partitions)

Items sharing a partition key value form a logical partition — Cosmos DB's internal distribution unit. Cosmos DB automatically maps logical partitions onto physical partitions, the actual compute and storage, and manages that mapping for you. You choose the key; Cosmos DB manages the rest.

## Segment 3 (steps: what makes a good key)

A good key needs high cardinality — many distinct values, like customerId, not something like orderStatus with only five possible values. It also needs to distribute both storage and request volume evenly, so no single value creates a hot partition that gets throttled while the rest of the container sits idle.

## Segment 4 (outro)

Because that key is fixed for the life of the container, getting it wrong is expensive to fix later — it takes a full data migration, not an edit. Next up: data modeling for Cosmos DB's Core API, where RU cost becomes a real factor in the embed-versus-reference decision.
