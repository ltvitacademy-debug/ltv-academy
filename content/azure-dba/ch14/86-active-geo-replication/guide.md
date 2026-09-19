# Lesson 86 — Active Geo-Replication

**Chapter 14 · High Availability & Disaster Recovery · Lesson 86 of 95**

## What you'll learn

- What active geo-replication actually is, and which Azure SQL Database tier it belongs to
- Why it's asynchronous by design, and what that means for RPO
- Up to 4 readable secondaries, and what they're actually useful for
- What a real geo-replication relationship looks like in the Azure Portal

## Azure SQL Database's own cross-region DR mechanism

Active geo-replication is Azure SQL Database's built-in disaster recovery
feature — a continuously-updated, readable secondary database in a
**different Azure region** than the primary. Where Lesson 82's General
Purpose and Business Critical tiers solve HA *within* a region, geo-
replication is the mechanism that gets you out of the region entirely if
disaster strikes.

It replicates asynchronously, always — there's no synchronous option for
geo-replication, because the distance between regions makes waiting for
cross-region confirmation on every write impractical. That means geo-
replication carries the same trade-off as an asynchronous AG replica
(Lesson 84): no latency penalty on the primary's writes, but some very
recent transactions can be lost if the primary fails before the secondary
catches up. Your achievable RPO with geo-replication alone is measured in
seconds to low minutes, not zero — a business requirement demanding a
true zero-data-loss cross-region RPO cannot be met by geo-replication
alone.

## Up to 4 readable secondaries

A single Azure SQL Database can have **up to 4 geo-replicated secondaries**,
in the same or different regions. Each secondary is fully readable at all
times — not just after a failover — which makes geo-replication useful for
more than pure DR:

- **Disaster recovery** — promote a secondary to primary if the primary
  region becomes unavailable.
- **Read-scale for reporting** — point a reporting or analytics workload
  at a geo-secondary instead of adding load to the primary.
- **Regional proximity for global apps** — put a readable copy near users
  in a different geography for lower-latency reads, without touching the
  primary's write path.

Promoting a secondary is a manual, explicit operation (unless a failover
group — Lesson 87 — is layered on top): a DBA runs the failover, the
chosen secondary becomes the new primary, and the old primary (once it's
reachable again) becomes a secondary of the new primary.

## A real geo-replication relationship in the Azure Portal

![Azure Portal screenshot showing a geo-replication relationship between a primary database and a secondary database in a different region](/courses/azure-dba/ch14/86-active-geo-replication/geo-replication-relationship.png)

This is what the relationship actually looks like once it's set up: the
Azure Portal shows the primary database, the secondary it's replicating
to, which region each one lives in, and the replication link between
them. A DBA configuring this in the portal (or via `New-AzSqlDatabaseSecondary`
in PowerShell, or `CREATE DATABASE ... AS SECONDARY OF` in T-SQL against
the master database) is setting up exactly this relationship — one
primary, one or more secondaries, each independently readable.

## Key terms

| Term | Meaning |
|---|---|
| Active geo-replication | Azure SQL Database's built-in cross-region DR feature: continuously-updated, readable secondaries |
| Readable secondary | A geo-replicated copy that can be queried directly, before any failover happens |
| Geo-replication relationship | The primary-to-secondary replication link shown in the Azure Portal |
| Manual failover | Promoting a secondary to primary is an explicit, DBA-initiated action (without a failover group) |

## Check yourself

You're ready for Lesson 87 when you can explain, without looking: why is
geo-replication always asynchronous, what's the realistic best-case RPO it
can deliver, and what's one genuine use for a geo-secondary besides
disaster recovery?
