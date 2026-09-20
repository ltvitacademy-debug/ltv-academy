# Script — Cosmos DB Well-Architected Practices

## Segment 1 (title)

The Azure Well-Architected Framework organizes cloud guidance around five pillars, and Cosmos DB has its own guidance applying those pillars to the decisions that matter most here. This lesson pulls together three of them — partition key design, RU sizing, and consistency level — as a closing checklist for this chapter.

## Segment 2 (steps: partition key checklist)

The partition key is the most consequential decision because it's effectively immutable — changing it later means creating a new container and migrating everything. The checklist: high cardinality so throughput can spread, even access distribution so no value gets hot, and a match to the dominant query pattern so most reads avoid an expensive cross-partition fan-out.

## Segment 3 (code: right-sizing RU/s)

The reflexive fix for throttling is raising RU/s until the errors stop, but that's billed whether it's used or not. Confirm RU/s is really the constraint first, use autoscale throughput for workloads with real peaks and quiet periods, and alert on Normalized RU Consumption in both directions — near 100% means under-provisioned, sustained very low means wasted spend.

## Segment 4 (steps: consistency deliberately)

Cosmos DB offers five consistency levels, and Session — the default — is the right choice for most applications, guaranteeing a client reads its own writes at lower cost than Strong. Move toward Strong only when an operation truly can't tolerate staleness, and toward Eventual only for read-heavy, latency-sensitive cases where brief staleness is fine.

## Segment 5 (outro)

That closes out partition keys, RU sizing, and consistency as a working checklist. Next up, and the last stop in the Cosmos DB section: migrating relational data into Cosmos DB, and why a straight lift-and-shift of a normalized schema is usually a mistake.
