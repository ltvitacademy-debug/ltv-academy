# Capstone: Simulate a Disaster Recovery

Lesson 45 tested the easy case: a healthy, synchronous pair failing over to each other with zero
data loss. This lesson tests the scenario Bellhaven actually built the DR leg for — total loss of
the Columbus site. Both SQLPRD01 and SQLPRD02 become unreachable at once, and SQLDR01, sitting
175 miles away in Indianapolis on asynchronous commit, is the only replica left standing. Chapter
8's DR planning applies directly here: this is a declared disaster, not a maintenance window.

## What you'll learn

- Why this scenario requires a forced failover, and what "forced" actually risks
- The real command and sequence for promoting the asynchronous DR replica
- How to measure exactly how much data was actually lost, against the 5-minute RPO

## The simulated scenario

Bellhaven's DR test, coordinated with the Director of IT and scheduled outside business hours,
simulates the Columbus campus going dark entirely — power, network, and both SQLPRD01 and
SQLPRD02 unreachable at the same instant. From SQLDR01's point of view, both other replicas simply
vanish. This is precisely the case Chapter 3 named as the reason a purely local HA technology
isn't enough: the failure isn't a component, it's the whole site.

## Why this failover has to be forced

SQLDR01 is `ASYNCHRONOUS_COMMIT`. By design, it can lag behind the primary by some amount — that's
the tradeoff that makes it survive real distance at all. With SQLPRD01 and SQLPRD02 gone, there is
no way to confirm SQLDR01 has every committed transaction, because the only replicas that could
confirm that are the ones that just disappeared. A normal `FAILOVER` refuses to run under these
conditions — SQL Server won't silently promote a replica that might be behind. Promoting it
anyway requires an explicit, deliberate acknowledgment of possible data loss:

```sql
-- Run on SQLDR01 — the only replica still reachable
ALTER AVAILABILITY GROUP AG_Bellhaven FORCE_FAILOVER_ALLOW_DATA_LOSS;
```

This single command is the entire point of the `MANUAL` failover mode chosen back in Lesson 44: a
human at Bellhaven has to be the one who decides the outage is real and severe enough to accept
whatever gap exists, rather than any automation making that call alone.

## Measuring what was actually lost

Before declaring the test complete, Bellhaven's runbook calls for measuring the real data-loss
window, not assuming it matched the 5-minute RPO target:

- Compare the last transaction visible in BellhavenOLTP on SQLDR01 against the last known
  transaction time recorded on SQLPRD01 before it went dark (from application logs or the last
  successful log backup timestamp from Lesson 43's job history)
- The gap between those two timestamps is the real, measured data loss for this specific test —
  in a healthy, low-latency async replica this is typically seconds, well inside the 5-minute
  target, but it must be measured, not assumed

## Reconfiguring around the surviving replica

Once SQLDR01 is primary, the application layer still needs to reach it. Because BHFS-AGL's
listener IPs live on the Columbus subnets that are now gone, Bellhaven's DR runbook (built in
Lesson 47) includes repointing DNS or adding an Indianapolis-subnet listener IP so applications at
the (now-restored) office, or a temporary work location, can reach SQLDR01. When Columbus comes
back online, SQLPRD01 and SQLPRD02 rejoin AG_Bellhaven as new secondaries — not automatically, since
the forced failover broke the original quorum relationship — requiring the same join and seeding
steps from Lesson 44 run again, this time with SQLDR01 as the new primary.

## Key terms

| Term | Meaning |
|---|---|
| `FORCE_FAILOVER_ALLOW_DATA_LOSS` | Explicit command required to promote an asynchronous replica when the primary can't be confirmed caught up |
| Data-loss window | The real, measured gap between the last transaction on the old primary and what survived on the promoted replica |
| Declared disaster | A site-wide event severe enough to justify accepting possible data loss, per Chapter 8's DR planning |
| Rejoin | The process of bringing former primary/HA replicas back into the AG as new secondaries once a site recovers |

## Check yourself

Why does SQL Server refuse to run a plain `FAILOVER` (without the `FORCE_FAILOVER_ALLOW_DATA_LOSS`
clause) when both SQLPRD01 and SQLPRD02 are unreachable, even though SQLDR01 is still healthy and
running?
