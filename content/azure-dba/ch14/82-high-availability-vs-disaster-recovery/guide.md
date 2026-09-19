# Lesson 82 — High Availability vs. Disaster Recovery

**Chapter 14 · High Availability & Disaster Recovery · Lesson 82 of 95**

## What you'll learn

- Why "HA" and "DR" are not two names for the same thing
- The real question each one answers, and the different failures each one is built for
- How Azure SQL Database's own two service tiers embody this exact split in their architecture
- Why Chapter 14 treats them as related but separate problems, with separate tools

## Two different failures, two different jobs

High availability (HA) and disaster recovery (DR) get lumped together
constantly, but they answer different questions:

| | High Availability | Disaster Recovery |
|---|---|---|
| Question it answers | What happens when **a node fails**? | What happens when **a region fails**? |
| Scope of the failure | Local — a VM, a rack, a single datacenter | Regional — an entire Azure region is unreachable |
| Target downtime | Seconds to low minutes, often automatic | Minutes to hours, usually involves a deliberate failover decision |
| Data loss target | Typically zero | Typically some — measured in minutes |
| Where it lives in Azure SQL | Multiple synchronized replicas *within* a region | A secondary database or region entirely *outside* the failed one |

HA is about surviving the failure you should expect to happen eventually —
hardware dies, a host needs patching, a process crashes. DR is about
surviving the failure you hope never happens — a whole Azure region goes
dark. Both matter. They are not solved by the same mechanism, and a DBA who
treats them as interchangeable will build a system that survives one kind
of outage and not the other.

## Seeing the split in Azure SQL's own architecture

Azure SQL Database doesn't just describe this distinction — it's built
into the two main service tiers' actual architecture.

![General Purpose tier: compute and storage separated, with remote storage providing durability](/courses/azure-dba/ch14/82-high-availability-vs-disaster-recovery/general-purpose-service-tier.png)

**General Purpose** separates compute from storage. The database engine
runs on one node, and the data itself lives on remote, redundant storage.
If the compute node fails, a new one attaches to the same storage — that's
the HA mechanism for this tier: swap the compute, keep the storage.

![Business Critical tier: a cluster of nodes each with local storage, kept in sync via a replication technology](/courses/azure-dba/ch14/82-high-availability-vs-disaster-recovery/business-critical-service-tier.png)

**Business Critical** takes a completely different approach: a cluster of
multiple nodes, each with its own local, fast storage, kept in sync with
each other continuously. There's no single "the storage" to reattach to —
there's a standing group of synchronized replicas, and any one of them can
take over almost instantly if the primary fails.

Both diagrams are describing **HA** — surviving a *local* failure within a
region. Neither one, by itself, is DR. If the entire region hosting either
architecture goes down, both need a *separate* mechanism — geo-replication
or failover groups, covered later in this chapter — to fail over
somewhere else entirely.

## Why this chapter separates them

Chapter 14 is built around that same split. Lessons on Always On
Availability Groups and Failover Cluster Instances are HA mechanisms for
SQL Server on VMs and Managed Instance — surviving a local node failure.
Active geo-replication and failover groups are DR mechanisms for Azure SQL
Database — surviving a regional disaster. Log shipping can serve either
role, depending on how it's configured. Keeping the distinction straight
is what makes the rest of this chapter make sense: every lesson from here
is answering one of these two questions, not a vague "what if something
breaks."

## Key terms

| Term | Meaning |
|---|---|
| High availability (HA) | Surviving a local failure (a node, a rack) with minimal or no downtime, within the same region |
| Disaster recovery (DR) | Surviving a regional disaster by failing over to a different geography, usually with some downtime and data loss |
| General Purpose tier | Azure SQL Database tier separating compute from remote storage; HA via reattaching compute |
| Business Critical tier | Azure SQL Database tier using a cluster of synchronized replicas with local storage for near-instant HA failover |

## Check yourself

You're ready for Lesson 83 when you can explain, without looking: what
question does HA answer that DR doesn't, and why do Azure SQL's General
Purpose and Business Critical tiers need two completely different
architectures just to solve HA within a single region?
