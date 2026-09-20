# Script — Capstone: Simulate a Disaster Recovery

## Segment 1 (title)

Lesson 45 tested the easy case. This lesson tests what SQLDR01 actually exists for: total loss of
the Columbus site, both SQLPRD01 and SQLPRD02 gone at once, and only the asynchronous DR replica
left standing 175 miles away.

## Segment 2 (code: the forced failover)

Because SQLDR01 is asynchronous, nobody can confirm it has every committed transaction once the
other two replicas vanish — so SQL Server refuses a normal failover. Promoting it anyway requires
an explicit, forced command that acknowledges possible data loss, run on SQLDR01 itself.

## Segment 3 (steps: measuring the real gap and reconfiguring)

The runbook doesn't assume the 5-minute RPO held — it measures the actual gap between the last
transaction that survived and the last one recorded before Columbus went dark. Then applications
get repointed to reach SQLDR01, and once Columbus comes back, both old replicas rejoin as new
secondaries from scratch.

## Segment 4 (outro)

That's the DR leg, proven under a real simulated disaster, not just described on paper. Up next:
turning everything from this chapter into the actual runbook Bellhaven's team would use for real.
