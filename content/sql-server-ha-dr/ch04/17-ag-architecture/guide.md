# Availability Group Architecture

Chapter 3 established when an Availability Group is the right technology. This chapter goes deep
on the technology itself, starting with its actual moving parts — because "AG" isn't one thing;
it's several components working together, and troubleshooting or designing one requires knowing
which piece is responsible for what.

## What you'll learn

- The real components of an Availability Group and how they relate to each other
- Why WSFC sits underneath AGs even though it isn't a SQL Server feature
- The edition/collation/compatibility requirements every replica must actually meet

## The underlying dependency: WSFC

On Windows, an Availability Group is built on top of a **Windows Server Failover Cluster
(WSFC)** — a cluster service that is not part of SQL Server at all; it's a Windows Server role.
The WSFC provides cluster membership, health detection, and quorum (the mechanism that decides
which nodes are allowed to keep running when the cluster is partitioned). SQL Server registers the
AG as a resource inside this cluster, and the cluster's quorum and health-monitoring logic is what
actually triggers an automatic failover — SQL Server itself doesn't independently decide to fail
over. (SQL Server on Linux can run AGs without WSFC in a cluster-less configuration, but that
setup gives up automatic failover through Windows clustering — Linux uses Pacemaker for that role
instead.)

## The replicas: primary and secondary

Every AG has exactly one **primary replica** at a time — the copy that accepts read/write
traffic — and one or more **secondary replicas**, which receive changes from the primary via log
records shipped over the network (not shared storage; this is a key difference from FCI). A
secondary can optionally be made **readable**, letting it serve read-only reporting queries
without touching the primary. Each replica runs as an independent SQL Server instance with its
own local storage — nothing about the databases' underlying disks is shared between replicas.

## The availability group listener

The **listener** is a virtual network name (VNN) and virtual IP that applications connect to
instead of a specific server name. It always resolves to whichever replica is currently primary,
so a failover doesn't require every application's connection string to change — only the listener's
internal routing changes. Listener configuration gets its own lesson later in this chapter.

## Requirements every replica must satisfy

- All replicas must be part of the same WSFC (on Windows).
- Databases must be in **FULL recovery model** — this is exactly why Chapter 1 spent a full
  lesson making sure FULL was the assumed default; AGs cannot function under SIMPLE.
- All replicas should run the **same SQL Server edition tier expectations** — mixing Standard and
  Enterprise Edition replicas in one AG constrains the AG to Basic AG behavior (single database, no
  readable secondary) even on the Enterprise nodes, because the AG as a whole can't rely on
  features the Standard replica doesn't have.
- Collation should match across replicas to avoid comparison and sorting inconsistencies.

## How the pieces work together

When a client connects to the listener, the listener resolves to the current primary's network
name. The client's writes land on the primary, which ships transaction log records to each
secondary. Each secondary applies (hardens) those log records to its own copy of the database.
If the primary fails, the WSFC's health-monitoring and quorum logic detects the failure and — if
automatic failover mode and synchronous commit are configured (covered in Lesson 21) — promotes a
secondary to primary and updates the listener's routing, all without an application ever knowing
a specific server name changed.

## Key terms

| Term | Meaning |
|---|---|
| WSFC | Windows Server Failover Cluster — the underlying cluster service that manages quorum and triggers AG failover |
| Primary replica | The one replica in an AG currently accepting read/write traffic |
| Secondary replica | A replica receiving log records from the primary; can optionally be made readable |
| Listener | A virtual network name/IP that always routes to the current primary |

## Check yourself

A team wants to add a Standard Edition SQL Server instance as a secondary replica in an AG whose
other replicas run Enterprise Edition. What happens to the AG's overall feature set as a result,
and why?
