# Script — Replica Sets: Architecture & Failover

## Segment 1 (title)

A SQL Server DBA already knows why replication exists — a single copy of your data is a single point of failure. MongoDB's answer is the replica set: a group of mongod instances holding the same data, with one elected primary and one or more secondaries.

## Segment 2 (code: the oplog)

Every write on the primary is recorded in the oplog, a capped collection secondaries continuously tail and replay. This is a genuine analog to a SQL Server transaction log, not just shared naming — both are an ordered, replayable record of every change. A secondary that falls outside the oplog window needs a full resync.

## Segment 3 (steps: election)

If the primary becomes unreachable, the remaining voting members hold an election. Replication state and configured priority determine the vote, and a member needs a majority to become primary. Failover typically completes within seconds, with no DBA manually promoting a secondary.

## Segment 4 (outro)

The tradeoff is real: during the election window there's no primary, and unreplicated writes can be rolled back. Next up: configuring a replica set yourself, from rs.initiate() through rs.add().
