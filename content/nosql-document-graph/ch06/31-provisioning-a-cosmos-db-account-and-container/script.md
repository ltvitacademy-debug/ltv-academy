# Script — Provisioning a Cosmos DB Account & Container

## Segment 1 (title)

Every Cosmos DB resource sits inside a strict hierarchy: account, database, container. This lesson walks the real, ordered sequence for standing up each level — the prerequisite for partitioning and throughput decisions still ahead in this chapter.

## Segment 2 (steps: the resource hierarchy)

The account is the top-level resource — it's where you choose the API type, the Azure regions, and account-wide consistency. The database is a logical grouping of containers. The container is the actual unit that stores data, and it's where partition key and throughput are most commonly provisioned directly.

## Segment 3 (code: provisioning in order)

Creating the account with the Azure CLI fixes the API type — GlobalDocumentDB selects Core API, and that choice isn't changed later without a new account. Creating the database sets up the namespace. Creating the container requires a mandatory partition key path — the single most consequential decision in this whole sequence — plus a starting throughput in RU/s.

## Segment 4 (outro)

That partition key path is effectively permanent for the life of the container. Next up: partitioning in Cosmos DB — how to actually choose that key correctly.
