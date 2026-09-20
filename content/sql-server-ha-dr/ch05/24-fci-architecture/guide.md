# FCI Architecture

Chapters 3 and 4 built up Always On Availability Groups as the modern, default answer to
SQL Server high availability. Failover Clustering — the technology AGs were actually built
on top of — is older, still widely deployed, and solves a related but distinct problem in a
fundamentally different way. This lesson is where you learn what a Failover Cluster
Instance actually is, structurally, before touching storage, quorum, or setup.

## What you'll learn

- Why an FCI protects the instance, not the database
- How an FCI's active/passive model actually works
- What role Windows Server Failover Clustering (WSFC) plays underneath it

## An FCI is instance-level, not database-level

This is the single most important distinction to hold onto through this entire chapter. An
**Availability Group** replicates individual **databases** between separate SQL Server
instances, each with its own storage. A **Failover Cluster Instance (FCI)** is different:
it's **one single SQL Server instance** — one set of system databases, one instance name,
one port — that can run on any of several cluster nodes, but only ever on one node at a
time. There's no replication of data happening at all, because there's only ever one copy
of the data files to begin with.

## Active/passive, not active/active

An FCI cluster is built from two or more Windows Server nodes joined into a **Windows
Server Failover Cluster (WSFC)**. At any given moment, exactly one node is "active" — it
owns the SQL Server resource group, has the shared storage mounted, and is the one
answering client connections on the instance's virtual network name. Every other node is
"passive": SQL Server is installed there too, but not running against the data, just
standing by. When the active node fails — hardware fault, OS crash, planned maintenance —
WSFC detects it and starts the SQL Server resource on a passive node instead. Clients
reconnect using the same virtual network name and IP; they don't know or care which
physical node is actually running the instance now.

## Shared storage is what makes this possible

Because there's only one copy of the data and log files, every node in the cluster has to
be able to see and mount the exact same storage — this is what "shared storage" means in
an FCI context, and it's the subject of the next lesson in full. For now, the key point is
architectural: the data files themselves never move or copy between nodes. What moves is
which node has that storage attached and is running SQL Server against it. This is also
precisely why an FCI's failover is fast compared to, say, restoring a database elsewhere —
there's no data transfer involved, only a resource handoff.

## Key terms

| Term | Meaning |
|---|---|
| Failover Cluster Instance (FCI) | A single SQL Server instance that runs on one of several cluster nodes at a time, on shared storage |
| WSFC | Windows Server Failover Clustering — the underlying OS feature that manages node membership and failover |
| Active node | The cluster node currently running the SQL Server resource and holding the shared storage |
| Passive node | A cluster node with SQL Server installed but not currently running the instance |
| Virtual network name (VNN) | The stable name/IP clients connect to, independent of which physical node is active |

## Check yourself

A colleague says "we run an FCI, so our databases are being replicated across three
nodes for safety." What's inaccurate about that statement, based on what an FCI actually
is?
