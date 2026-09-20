# Oracle RAC: Real Application Clusters Overview

Data Guard and its standby types solve availability by keeping *separate* databases in
sync. **Oracle RAC (Real Application Clusters)** solves a different problem entirely:
multiple instances running against one shared database at the same time. The honest
comparison isn't a SQL Server Failover Cluster Instance — it's much closer to a scale-out,
active-active cluster, and that difference is the whole point of this lesson.

## What you'll learn

- What RAC actually is: multiple instances, one database, shared storage
- Cache Fusion: how RAC keeps every instance's buffer cache coherent
- Why RAC is active-active, and why an FCI is not
- What RAC actually buys you: scalability and availability, together
- Grid Infrastructure, briefly: what runs underneath RAC

## Multiple instances, one database, shared storage

In a RAC configuration, two or more Oracle **instances** — each with its own memory
structures (SGA) and background processes, typically running on separate physical or
virtual servers — mount and open the **same single database** on shared storage, almost
always **Automatic Storage Management (ASM)**. This is structurally different from Data
Guard's model: there's no primary and no standby here, just multiple peer instances all
capable of reading and writing the same data files simultaneously.

## Cache Fusion: the mechanism that makes shared-everything work

The hard problem RAC solves is cache coherency: if instance A has a data block cached and
modified in its buffer cache, and instance B needs that same block, B can't just read a
stale copy from disk. **Cache Fusion** is the technology that ships that block directly
from instance A's memory to instance B's memory over a dedicated, high-speed private
network (the **interconnect**), keeping every instance's view of the data consistent
without constantly round-tripping to disk. This interconnect and Cache Fusion protocol are
what make true concurrent read/write access from multiple instances against the same rows
practical rather than a data-corruption risk.

## Active-active, genuinely — not an FCI with more nodes

This is the distinction worth being explicit about. A SQL Server **Failover Cluster
Instance (FCI)** is **active-passive**: the instance runs on exactly one node at a time,
other nodes sit idle on standby, and a failover moves the single running instance to a
different node using shared storage that only one node accesses at once. **RAC is
active-active**: every instance in the cluster can be processing transactions against the
shared database concurrently, all the time, not just during a failover. RAC isn't "an FCI
with Oracle branding" — it's a fundamentally different clustering model, closer in spirit
to a distributed, scale-out system than to a passive standby node waiting for its turn.

## What RAC actually buys you

Because every instance is active, RAC delivers two things together that a passive cluster
model can't: **scalability** — spread workload across instances, add a node to add
capacity — and **availability** — if one instance or its node fails, the surviving instances
keep serving the database without interruption, and Oracle's **Fast Application Notification
(FAN)** and **Transparent Application Failover (TAF)** help connected applications reroute
in-flight or new work to a surviving instance. That combination is why RAC gets chosen for
workloads where both raw capacity and continuous availability matter, though it comes with
real complexity and licensing cost that a DBA has to weigh against a simpler Data Guard
setup when only DR, not concurrent scale-out, is the actual requirement.

## Grid Infrastructure: what runs underneath

RAC depends on **Oracle Grid Infrastructure** — Oracle Clusterware (cluster membership,
node monitoring, resource management) plus ASM, together managing shared configuration
through the **Oracle Cluster Registry (OCR)** and a **voting disk** used for cluster
membership decisions. This is genuinely separate infrastructure from a single-instance
Oracle install, installed and patched on its own cycle, and it's worth knowing it exists
even at an overview level — RAC isn't just "Oracle software running on two boxes."

## Key terms

| Term | Meaning |
|---|---|
| Oracle RAC | Multiple Oracle instances mounting and opening one shared database concurrently |
| Cache Fusion | Technology shipping cached data blocks directly between instances' memory over the interconnect |
| Interconnect | Dedicated high-speed private network connecting RAC instances |
| Active-active | Every instance processes work concurrently, unlike an active-passive FCI |
| Grid Infrastructure | Oracle Clusterware + ASM, the cluster layer RAC runs on |

## Check yourself

Explain, in your own words, why calling RAC "Oracle's version of a SQL Server Failover
Cluster Instance" is a meaningfully inaccurate description, using the active-active vs.
active-passive distinction.
