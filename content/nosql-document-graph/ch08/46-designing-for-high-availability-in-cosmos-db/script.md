# Script — Designing for High Availability in Cosmos DB

## Segment 1 (title)

This chapter has covered distribution, consistency, conflict resolution, and throughput separately — but a real HA design combines the right choices from each, deliberately matched to the workload, the same way SQL Server HA combines Always On, backup strategy, and recovery model.

## Segment 2 (steps: three pillars)

Distribution shaped by the failure you're planning for — single-region write with failover, or multi-region writes for lower latency. Consistency matched to what the workload needs — not the strongest available, the one it actually needs. Conflict resolution appropriate to the data — Last-Writer-Wins for telemetry, custom merge for anything a customer would notice losing.

## Segment 3 (code: putting it together)

None of these three is optional in isolation — they interact. Multi-region writes without a deliberate conflict strategy risks silent data loss. Strong consistency across distant regions undermines the latency benefit multi-region writes was supposed to buy.

## Segment 4 (outro)

A well-architected Cosmos DB deployment chooses distribution, consistency, and conflict resolution together, for the same workload. Next up, Chapter Nine: Cosmos DB security — keys, RBAC, and network isolation.
