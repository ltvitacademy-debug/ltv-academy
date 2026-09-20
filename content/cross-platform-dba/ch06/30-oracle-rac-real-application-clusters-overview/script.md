# Script — Oracle RAC: Real Application Clusters Overview

## Segment 1 (title)

Data Guard keeps separate databases in sync. Oracle RAC solves a different problem: multiple instances running against one shared database at the same time — and the honest comparison isn't a SQL Server FCI, it's much closer to a scale-out, active-active cluster.

## Segment 2 (code: one database, multiple instances)

In a RAC configuration, two or more instances, each on their own server with their own memory, mount and open the same single database on shared storage, almost always ASM. There's no primary and no standby here — every instance can read and write the same data files simultaneously.

## Segment 3 (steps: active-active vs active-passive)

A SQL Server Failover Cluster Instance is active-passive: one node runs it, the rest sit idle until a failover. RAC is active-active: every instance processes transactions concurrently, all the time. Cache Fusion is what makes that safe, shipping cached data blocks directly between instances' memory over a dedicated interconnect so nobody reads a stale copy.

## Segment 4 (code: Grid Infrastructure)

RAC runs on top of Oracle Grid Infrastructure — Clusterware for membership and resources, ASM for shared storage, the OCR and a voting disk for cluster decisions. Because every instance is active, RAC delivers scalability and availability together: add a node for more capacity, and losing one node doesn't stop the rest.

## Segment 5 (outro)

RAC and Data Guard both stay inside Oracle-to-Oracle replication. Next up: Oracle GoldenGate, a separate product built for logical and cross-platform replication.
