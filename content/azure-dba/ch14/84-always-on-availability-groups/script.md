# Script — Always On Availability Groups

## Segment 1 (title)

An Availability Group is a named group of databases that fail over together, as a single unit, to a secondary replica. It's a real on-prem and VM-hosted SQL Server HA mechanism — one primary accepting reads and writes, secondaries receiving changes continuously.

## Segment 2 (steps: sync vs async trade-off)

Every secondary runs synchronous or asynchronous. Synchronous means the primary waits for the secondary to confirm before committing — zero data loss, but added latency on every write. Asynchronous commits immediately with no latency penalty, but some data can be lost if the primary fails first.

## Segment 3 (code: CREATE AVAILABILITY GROUP)

Here's a real AG spanning three nodes — two synchronous replicas with automatic failover for local HA, and one asynchronous replica in a different region with manual failover for DR. One group, two jobs, each replica configured for the role it actually plays.

## Segment 4 (code: forcing a failover)

ALTER AVAILABILITY GROUP FAILOVER works cleanly against a synchronous replica, because synchronous commit already guarantees no data loss. FORCE_FAILOVER_ALLOW_DATA_LOSS exists specifically for the disaster case where a synchronous partner can't be reached at all.

## Segment 5 (outro)

Availability Groups fail over per-database-group, on shared-nothing storage. Next up: Failover Cluster Instances — a completely different mechanism where the whole instance fails over using shared storage instead.
