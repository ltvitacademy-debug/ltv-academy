# Script — Creating an Availability Group

## Segment 1 (title)

Lesson 17 covered AG architecture. This lesson walks through the real high-level T-SQL flow for actually creating one — from prerequisites through the statements that turn a standalone database into an AG-protected one.

## Segment 2 (steps: before any T-SQL runs)

You enable the Always On Availability Groups feature on every instance first, which needs a service restart. Every instance has to already be a node in the same WSFC. Then each instance gets a database mirroring endpoint, and you take a full backup plus a log backup as the starting point.

## Segment 3 (code: the core T-SQL flow)

CREATE AVAILABILITY GROUP on the primary defines the database and each replica's endpoint and mode. On the secondary, you join the AG, restore the database WITH NORECOVERY so it stays ready for log records, then set the database's HADR availability group.

## Segment 4 (outro)

The order matters — the AG has to exist before a replica can join it, and the database has to stay in a restoring state, not fully online, before that join succeeds. Next up: what synchronous and asynchronous commit actually mean for each replica.
