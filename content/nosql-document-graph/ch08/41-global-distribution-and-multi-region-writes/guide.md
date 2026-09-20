# Global Distribution & Multi-Region Writes

Making a SQL Server database available in a second region has historically meant real
infrastructure work — Always On Availability Groups, log shipping, careful failover planning.
Cosmos DB was designed from the ground up to make global distribution a configuration change, not
a project. This chapter is about what that actually buys you, and the real tradeoffs that come
with it.

## What you'll learn

- How adding or removing a region is genuinely just a few clicks or an API call
- The real difference between single-region-write and multi-region-write (multi-master) modes
- Why multi-region writes solve a latency problem, not a durability one

## Adding regions: a few clicks, not a project

Every Cosmos DB account can replicate its data to any number of Azure regions. Adding a region —
through the Azure portal, CLI, or SDK — kicks off a background replication process; once it
completes, that region serves reads (and, if enabled, writes) with the same data, automatically
kept in sync. Removing a region is just as simple. There's no manual seeding, no separate backup-
and-restore step to stand up the replica — it's a property of the account, not a separate system
you build.

```bash
# Add two read regions to an existing account
az cosmosdb update \
  --name my-cosmos-account \
  --resource-group my-rg \
  --locations regionName=EastUS failoverPriority=0 \
  --locations regionName=WestEurope failoverPriority=1 \
  --locations regionName=SoutheastAsia failoverPriority=2
```

## Single-region write vs. multi-region write

By default, a Cosmos DB account operates in **single-region write** mode: one region is designated
the write region, and all other configured regions are read replicas kept in sync by the engine.
If the write region fails, Cosmos DB can automatically fail over to the next region by failover
priority — but at any given moment, writes go to exactly one place.

**Multi-region writes** (multi-master) is an account-level setting that lets every configured
region accept writes simultaneously. An application server in Southeast Asia writes to the
Southeast Asia region instead of round-tripping to a write region on another continent — a real
reduction in write latency for globally distributed applications. The engine then replicates and
merges those writes across regions in the background.

## The real tradeoff: conflicts

Multi-region writes solve a latency problem, not a correctness one. When two regions can both
accept a write to the same item at nearly the same time, a **conflict** is possible — the same
document modified differently in two places before either write has replicated. Single-region
write mode can't have this problem, because there's only ever one writer. Multi-region writes can,
which is exactly why Cosmos DB needs a conflict resolution policy — the subject of a later lesson
in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Global distribution | Replicating a Cosmos DB account's data across any number of Azure regions |
| Single-region write | Default mode: one write region, others are synced read replicas with automatic failover |
| Multi-region writes (multi-master) | Every configured region can accept writes simultaneously, reducing write latency globally |
| Failover priority | The order in which regions are promoted to write region if the current one fails |

## Check yourself

A global application enables multi-region writes to cut write latency for users on three
continents. What real new problem does this introduce that single-region write mode never had to
deal with?
