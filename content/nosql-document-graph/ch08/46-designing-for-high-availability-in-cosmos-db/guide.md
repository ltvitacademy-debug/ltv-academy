# Designing for High Availability in Cosmos DB

This chapter has covered four pieces separately — global distribution, consistency levels,
conflict resolution, and throughput models — but a real high-availability design doesn't pick one
of them. It combines the right choices from each, deliberately matched to the workload, the same
way a SQL Server HA design combines Always On, backup strategy, and the right recovery model
rather than treating any one of them as the whole answer.

## What you'll learn

- Why HA in Cosmos DB is a combination of decisions, not a single setting
- How to match distribution, consistency, and conflict resolution to a real workload
- What multi-region writes with automatic failover actually buys you in terms of availability

## Pillar one: distribution shaped by the failure you're planning for

Multi-region distribution is the foundation — without it, a regional Azure outage takes your
database down with it. But *how* you distribute matters: single-region write with several read
regions and automatic failover protects against a regional outage while keeping the conflict-free
simplicity of one writer. Multi-region writes protect against the same outage while also cutting
write latency globally — but only makes sense once you've deliberately chosen a conflict
resolution strategy, not before.

## Pillar two: consistency matched to what the workload actually needs

The right consistency level isn't the strongest one available — it's the one the workload actually
needs. A financial ledger balance genuinely needs Strong or Bounded Staleness; a social media
timeline is usually fine with Session or even Eventual, and choosing Strong there would cost real
latency and availability for a guarantee nobody's relying on. HA design means picking the weakest
consistency level the workload can honestly tolerate — not the strongest one available, and not
by default either.

## Pillar three: conflict resolution appropriate to the data

If multi-region writes are enabled, the conflict resolution policy has to match what the data
actually represents. Last-Writer-Wins is fine for telemetry or a page-view counter where losing
the "losing" write silently is a non-event. A shopping cart, an inventory count, or a ledger entry
needs custom conflict resolution — merging conflicting writes rather than discarding one, because
silently dropping a customer's data is a real incident, not an acceptable tradeoff.

```json
{
  "region": ["East US", "West Europe", "Southeast Asia"],
  "multiRegionWrites": true,
  "defaultConsistency": "Session",
  "conflictResolutionPolicy": {
    "mode": "Custom",
    "conflictResolutionProcedure": "resolveConflict"
  }
}
```

## Putting it together

None of these three pillars is optional in isolation — they interact. Enabling multi-region writes
without a deliberate conflict resolution strategy leaves you exposed to silent data loss. Choosing
Strong consistency across distant regions undermines the latency benefit multi-region writes was
supposed to buy you. A genuinely well-architected Cosmos DB deployment is one where distribution,
consistency, and conflict resolution were chosen together, for the same workload, not configured
independently by whoever happened to set up each one.

## Key terms

| Term | Meaning |
|---|---|
| High availability (HA) design | Combining distribution, consistency, and conflict resolution choices to match a specific workload's real requirements |
| Automatic failover | Promoting the next-priority region to write region when the current write region fails |
| Workload-appropriate consistency | Choosing the weakest consistency level a workload can honestly tolerate, not the strongest available |
| Workload-appropriate conflict resolution | Matching LWW vs. custom resolution to whether silently dropping a write is acceptable for that data |

## Check yourself

A team enables multi-region writes for lower latency, leaves the conflict resolution policy at its
Last-Writer-Wins default, and stores customer shopping carts in the container. What did they get
wrong about combining these three HA pillars, and what should they have done instead?
