# Script — FCI Architecture

## Segment 1 (title)

Failover Clustering is older than Availability Groups, still widely deployed, and solves a related but different problem. A Failover Cluster Instance protects the instance, not the database — and that distinction shapes everything else in this chapter.

## Segment 2 (code: instance-level, not database-level)

An Availability Group replicates individual databases between separate instances, each with its own storage. An FCI is one single SQL Server instance — one set of data and log files — that can run on any of several nodes, but only ever on one at a time. There's no replication happening, because there's only ever one copy of the data.

## Segment 3 (steps: how failover actually works)

At any moment, one node is active — it owns the shared storage and answers client connections. Every other node is passive, standing by with SQL Server installed but not running. When the active node fails, Windows Server Failover Clustering detects it and starts SQL Server on a passive node instead, using the same virtual network name clients already connect to.

## Segment 4 (outro)

Because there's only one copy of the data, every node has to be able to see the exact same storage — that's shared storage, and it's what makes fast failover possible without copying anything. Next up: what shared storage actually means in practice.
