# Script — Configuring a MongoDB Replica Set

## Segment 1 (title)

Lesson 23 covered why a replica set exists. This lesson covers the real mechanics of standing one up — the sequence is the same kind of work as configuring a SQL Server Always On availability group, even though the commands are different.

## Segment 2 (code: starting each node)

Each member starts as an ordinary mongod process with a --replSet flag naming the set it will belong to, and its own data directory. At this stage every node is standalone and doesn't yet know about the others.

## Segment 3 (code: initiate and add)

From mongosh, rs.initiate() creates the replica set configuration starting with one member, which becomes primary. Additional nodes join with rs.add(), called against the primary, and go through initial sync before tailing the oplog. rs.status() confirms each member's health.

## Segment 4 (outro)

That status check matters — rs.add() returning success doesn't mean the member is caught up yet. Next up: sharding fundamentals, and how to choose a shard key that won't create hotspots.
