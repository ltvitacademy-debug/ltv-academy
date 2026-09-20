# Neo4j Aura: Managed Neo4j in the Cloud

This course has already covered two managed-service stories: Azure Cosmos DB is a managed,
globally-distributed database service by design, and MongoDB Atlas (covered earlier in the
MongoDB chapters) is MongoDB's own managed offering. **Neo4j Aura** is the same idea applied to
Neo4j itself — the official, Neo4j-run managed cloud service, built on Enterprise Edition,
that takes over the operational work this chapter has spent five lessons teaching you to do by
hand: backup, clustering, and tuning.

## What you'll learn

- What Neo4j Aura actually is, and who runs it
- The real operational work Aura takes off your plate
- How Aura compares to self-hosting Neo4j Enterprise Edition
- Where Aura fits next to MongoDB Atlas and Cosmos DB in this course's mental model

## What Aura actually is

Neo4j Aura is Neo4j's own fully-managed database-as-a-service, available on AWS, Google
Cloud, and Microsoft Azure. It comes in a few real product tiers — **AuraDB Free** (a small,
permanently free single instance good for learning and prototypes), **AuraDB Professional**
and **AuraDB Business Critical** (production tiers with SLAs and support), and **AuraDS** for
graph data science workloads. Every paid tier runs on Neo4j Enterprise Edition under the hood,
which means the Enterprise-only capabilities from earlier in this chapter — causal clustering,
online backup, fine-grained RBAC — are available to Aura customers without them ever touching
a license key or a `neo4j.conf` file.

## What Aura actually takes off your plate

Everything this chapter just taught you to configure by hand, Aura runs for you:

- **Backups** — automatic, continuous backups with point-in-time restore, no
  `neo4j-admin database backup` cron job to babysit.
- **Clustering and failover** — causal clustering is provisioned and managed automatically;
  there's no core server count to pick or Raft configuration to reason about directly.
- **Scaling** — instance size (and, on some tiers, read replica count) can be adjusted through
  the console or API without you managing the underlying VMs.
- **Patching and upgrades** — Neo4j version upgrades and security patches are applied by
  Neo4j, not by a DBA running `apt upgrade` at 2am.
- **Monitoring** — built-in metrics and alerting through the Aura console, covering many of
  the health signals the next lesson covers for self-hosted deployments.

This is the same value proposition as MongoDB Atlas relative to self-hosted MongoDB, or Cosmos
DB relative to running SQL Server yourself on a VM: you give up direct control over the
underlying infrastructure in exchange for not having to operate it.

## The real tradeoff: control and cost, not capability

Aura doesn't give you a lesser version of Neo4j — the query language, the data model, the
driver APIs are identical to self-hosted Enterprise Edition. What you give up is **direct
infrastructure control**: you can't SSH into the box, hand-tune OS-level settings, or run an
arbitrary `neo4j-admin` command against the underlying file system. For most production
deployments — the same way most production SQL Server workloads increasingly run on Azure SQL
Database rather than self-managed VMs — that tradeoff is a reasonable one: paying for
operational simplicity is often cheaper than paying a DBA's time to replicate what Aura already
does well. Where self-hosting still wins is tight control over exact configuration, on-prem or
specific-cloud-region requirements Aura doesn't support, or cost structures where a
well-optimized self-managed cluster is genuinely cheaper at very large, steady scale.

## Aura next to Atlas and Cosmos DB

Zooming out across this whole course: all three platforms now have the same managed-cloud
option sitting next to their self-hosted story. MongoDB has Atlas, Azure SQL/Cosmos DB is
managed by definition, and Neo4j has Aura. The pattern repeats because it's the same industry
trend for every database category — the platform vendor increasingly offers to run the
database for you, and a modern DBA's job increasingly includes deciding when that tradeoff
makes sense for a given client, rather than automatically defaulting to self-hosting because
that's the skill that was taught first.

## Key terms

| Term | Meaning |
|---|---|
| Neo4j Aura | Neo4j's official fully-managed database-as-a-service, built on Enterprise Edition |
| AuraDB Free | A permanently free, small single-instance Aura tier for learning and prototypes |
| AuraDB Professional / Business Critical | Paid production Aura tiers with SLAs and support |
| AuraDS | Aura's tier for graph data science workloads |

## Check yourself

A client asks why they should pay for Neo4j Aura instead of just running Neo4j Enterprise
Edition themselves on a VM they already have. What's the honest answer, framed around what
Aura actually takes off their plate versus what they'd be giving up?
