# Lesson 85 — Failover Cluster Instances

**Chapter 14 · High Availability & Disaster Recovery · Lesson 85 of 95**

## What you'll learn

- What a Failover Cluster Instance (FCI) actually is, and how it differs from an AG
- Why FCI fails over the whole instance, not per-database
- The shared-storage requirement that makes FCI possible
- When a real DBA would choose FCI over Availability Groups

## A different mechanism, a different unit of failover

A SQL Server Failover Cluster Instance (FCI) is built on Windows Server
Failover Clustering (WSFC) — the same clustering technology AGs also rely
on — but it solves HA at a completely different level:

| | Availability Group (AG) | Failover Cluster Instance (FCI) |
|---|---|---|
| Unit that fails over | A named group of user databases | The entire SQL Server **instance** — every database on it |
| Storage model | Each replica has its own separate copy of the data | **Shared storage** — all nodes point at the same disk |
| What moves on failover | Nothing physically moves — another replica already has a full copy | The instance's identity (network name, IP) moves to the node that now owns the shared storage |
| Client visibility | Databases can differ per replica (readable secondaries, different DBs in different AGs) | All-or-nothing — the whole instance, and everything on it, is either up on one node or the other |

The core distinction: AGs fail over *databases as a named group*, with
each node holding its own full copy. An FCI fails over *the instance
itself*, with every node sharing one copy of the data on shared storage.
There's no "some databases on node 1, others on node 2" with an FCI —
it's a single instance, and it simply runs on whichever cluster node
currently owns the storage.

## Why shared storage changes everything

FCI's shared-storage model means there's fundamentally nothing to
replicate for data itself — every node in the cluster is already looking
at the exact same disk. What fails over is not the data, but which node
is *actively running* the SQL Server service against that shared disk,
plus the instance's network name and IP address so clients reconnect
transparently.

This has real consequences:

- **No readable secondaries.** Unlike an AG, there's no second node with
  its own copy to run read-only reporting queries against — only one node
  is ever active against the shared storage at a time.
- **The shared storage itself becomes the single point of failure** that
  matters most — if the underlying SAN or shared disk fails, no amount of
  cluster nodes saves you. (This is why FCI is often combined with an AG
  spanning separate FCIs for full protection — a "cluster of clusters.")
- **Instance-level, not database-level, protection.** Every database on
  that instance — user and system databases alike — moves together,
  automatically, with zero extra configuration per database.

## When a DBA actually chooses FCI over AGs

FCI is chosen over Availability Groups when:

- **Whole-instance protection is genuinely simpler to reason about** than
  managing dozens of individual databases across AGs — one failover event
  covers everything on the instance, system databases included (AGs
  cannot protect `master`, `model`, or `msdb`).
- **Shared storage (a SAN) already exists** in the environment — FCI
  doesn't need per-node storage duplication, since it doesn't duplicate
  storage at all.
- **Standard Edition licensing** is a constraint — FCI (2-node) has
  historically been available on SQL Server Standard Edition, while full
  Availability Groups have required Enterprise Edition (Basic
  Availability Groups on Standard are more limited).

## Key terms

| Term | Meaning |
|---|---|
| Failover Cluster Instance (FCI) | A SQL Server instance clustered via WSFC, using shared storage, where the whole instance fails over as one unit |
| Windows Server Failover Clustering (WSFC) | The underlying Windows clustering technology both FCIs and AGs are built on |
| Shared storage | A single disk/SAN visible to every cluster node; only one node actively uses it at a time |
| Cluster of clusters | Combining FCI (shared-storage HA within a site) with an AG spanning FCIs (for cross-site DR) |

## Check yourself

You're ready for Lesson 86 when you can explain, without looking: what is
the actual unit that fails over in an FCI versus an AG, why can't an FCI
offer readable secondaries, and why does the shared storage itself become
the most important single point of failure to protect?
