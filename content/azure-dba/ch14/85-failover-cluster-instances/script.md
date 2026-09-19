# Script — Failover Cluster Instances

## Segment 1 (title)

A Failover Cluster Instance is built on the same Windows clustering technology as Availability Groups, but it solves HA at a completely different level — the entire SQL Server instance fails over as one unit, not per-database.

## Segment 2 (code: AG vs FCI)

An AG fails over a named group of databases, and each replica holds its own full copy. An FCI fails over the whole instance, and every node shares one copy on the same disk. Nothing physically moves in an FCI failover except which node owns that shared storage.

## Segment 3 (steps: why choose FCI)

A DBA reaches for FCI when whole-instance protection is simpler than managing many AGs, when shared storage already exists in the environment, or when Standard Edition licensing rules out full Availability Groups.

## Segment 4 (outro)

FCI protects the instance but the shared storage itself becomes the single point of failure that matters most — which is why it's often paired with an AG spanning separate FCIs. Next up: Active Geo-Replication, Azure SQL Database's own cross-region DR mechanism.
