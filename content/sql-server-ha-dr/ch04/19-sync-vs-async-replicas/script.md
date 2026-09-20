# Script — Synchronous vs. Asynchronous Replicas

## Segment 1 (title)

The last lesson set synchronous commit mode on both replicas without explaining what that actually means. This lesson makes it explicit, because sync versus async is the single biggest factor in what an AG promises about data loss versus performance.

## Segment 2 (steps: what commit actually means in each mode)

In synchronous commit, the primary waits for the secondary to harden the log record before telling the client the write succeeded — zero data loss, but added latency. In asynchronous commit, the primary tells the client "done" immediately, without waiting — fast writes, but possible data loss if the primary fails before the secondary catches up.

## Segment 3 (code: why this ties directly to failover mode)

Automatic failover mode can only be configured on a synchronous replica — SQL Server enforces that. Promoting an asynchronous secondary automatically could silently lose data with nobody confirming that's acceptable, so asynchronous replicas can only be failed over to manually.

## Segment 4 (outro)

A common real design uses both in one AG — synchronous nearby for automatic HA, asynchronous far away for DR. Next up: how the listener actually routes connections to whichever replica is primary.
