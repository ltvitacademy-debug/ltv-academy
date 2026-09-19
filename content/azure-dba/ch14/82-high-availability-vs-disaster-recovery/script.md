# Script — High Availability vs. Disaster Recovery

## Segment 1 (title)

High availability and disaster recovery get lumped together constantly, but they answer different questions. HA is about surviving a local failure — a node, a rack — with little or no downtime. DR is about surviving a regional disaster, failing over to a different geography entirely.

## Segment 2 (screenshot: General Purpose tier)

Azure SQL Database's own service tiers show this split in their architecture. General Purpose separates compute from remote storage — if the compute node fails, a new one reattaches to the same durable storage. That's HA for this tier: swap the compute, keep the storage.

## Segment 3 (screenshot: Business Critical tier)

Business Critical takes a different approach entirely — a cluster of nodes, each with its own local storage, kept continuously in sync. Any replica can take over almost instantly if the primary fails. Different mechanism, same job: surviving a local failure within the region.

## Segment 4 (code: HA vs DR contrast)

Neither architecture, by itself, is disaster recovery. If the whole region goes down, both need a separate mechanism — geo-replication or failover groups — to fail over somewhere else. HA and DR are related, but they are genuinely different problems with different tools.

## Segment 5 (outro)

Keep that split in mind for the rest of this chapter — every lesson from here answers one of these two questions. Next up: RPO and RTO, the business decisions that determine which of these tools you actually need.
