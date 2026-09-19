# Script — Monitoring, Testing & Troubleshooting HA/DR

## Segment 1 (title)

Every mechanism in this chapter can be configured correctly and still fail you during a real disaster, for reasons that only show up when a failover actually happens. You do not know your DR plan works until you've deliberately triggered a failover and watched it.

## Segment 2 (steps: what a real test verifies)

A real failover test checks four things: the failover completes within the expected RTO, the application actually reconnects, data loss matches the expected RPO and not more, and failing back to the original primary afterward is possible too.

## Segment 3 (code: monitoring replication health)

The signal to watch continuously is replication lag and health. sys.dm_hadr_database_replica_states shows synchronization state and how far a secondary is falling behind, before it becomes an outage instead of a routine fix.

## Segment 4 (outro)

That closes Chapter 14 — eight lessons matching the real exam's weight for this domain. Chapter 15, Real-World Azure DBA Project, is next: one continuous capstone scenario pulling together everything since Chapter 1, closing the loop by simulating a real disaster.
