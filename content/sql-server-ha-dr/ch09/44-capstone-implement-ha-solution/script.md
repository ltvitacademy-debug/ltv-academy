# Script — Capstone: Implement the HA Solution

## Segment 1 (title)

Time to build AG_Bellhaven itself: endpoints, the availability group, three replicas with their
commit and failover modes, and the listener that keeps the application's connection string
constant no matter who's primary.

## Segment 2 (code: creating the AG)

Every instance gets a mirroring endpoint first, then CREATE AVAILABILITY GROUP defines all three
replicas at once — SQLPRD01 and SQLPRD02 as synchronous, automatic-failover partners, and SQLDR01
as asynchronous with manual failover, because 175 miles of distance makes synchronous commit
impractical there.

## Segment 3 (steps: joining, seeding, and the listener)

The secondaries join the AG and get automatic seeding permission, so SQL Server streams the
initial data instead of a manual restore. Then the listener, BHFS-AGL, gets created with an IP on
each Columbus subnet — from this point forward, nothing at Bellhaven ever connects to a server
name again, only to the listener.

## Segment 4 (outro)

AG_Bellhaven is live: synchronous HA locally, asynchronous DR remotely, one listener hiding all of
it from the applications. Up next: putting it to the test with a real, planned failover.
